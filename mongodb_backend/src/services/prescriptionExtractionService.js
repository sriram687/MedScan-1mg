const DEFAULT_MODEL = 'gemini-1.5-flash';

function normalizeMedicineQuery(input) {
  if (!input) return '';
  return String(input)
    .replace(/\b(tab(\.|let)?|cap(\.|sule)?|syp|syrup|inj(\.|ection)?|cream|oint(\.|ment)?|drops?|drop|mg|mcg|g|ml)\b/gi, ' ')
    .replace(/[^a-zA-Z0-9\s\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function safeJsonParse(maybeJsonText) {
  if (!maybeJsonText) return null;
  const text = String(maybeJsonText).trim();

  // Fast path
  try {
    return JSON.parse(text);
  } catch (_) {
    // continue
  }

  // Try to extract a JSON object/array embedded in extra text.
  const firstBrace = text.indexOf('{');
  const firstBracket = text.indexOf('[');
  const start =
    firstBrace === -1
      ? firstBracket
      : firstBracket === -1
        ? firstBrace
        : Math.min(firstBrace, firstBracket);

  if (start === -1) return null;

  const lastBrace = text.lastIndexOf('}');
  const lastBracket = text.lastIndexOf(']');
  const end = Math.max(lastBrace, lastBracket);
  if (end <= start) return null;

  const slice = text.slice(start, end + 1);
  try {
    return JSON.parse(slice);
  } catch (_) {
    return null;
  }
}

async function callGeminiExtract({ apiKey, model, text }) {
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const prompt =
    'You are extracting medicine information from noisy OCR text of an Indian doctor prescription.\n' +
    'Return ONLY valid JSON (no markdown, no commentary).\n\n' +
    'JSON schema:\n' +
    '{\n' +
    '  "medicines": [\n' +
    '    {\n' +
    '      "name": "string",\n' +
    '      "strength": "string | null",\n' +
    '      "form": "string | null",\n' +
    '      "frequency": "string | null",\n' +
    '      "duration": "string | null",\n' +
    '      "instructions": "string | null",\n' +
    '      "uses": "string | null",\n' +
    '      "confidence": number\n' +
    '    }\n' +
    '  ]\n' +
    '}\n\n' +
    'Rules:\n' +
    '- Include only medicines (brands or generics).\n' +
    '- Do not include lab tests, patient details, addresses, symptoms alone, or doctor details.\n' +
    '- If you are unsure, still include the best guess with lower confidence.\n' +
    '- Keep medicine name short (no dosage-only tokens).\n' +
    '- Maximum 12 medicines.\n\n' +
    'OCR_TEXT:\n' +
    text;

  const usedModel = model || DEFAULT_MODEL;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(usedModel)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 800
        }
      }),
      signal: controller.signal
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => '');
      throw new Error(`Gemini request failed (${resp.status}): ${errText.slice(0, 500)}`);
    }

    const data = await resp.json();
    const outText = data?.candidates?.[0]?.content?.parts?.map((p) => p?.text).filter(Boolean).join('\n') || '';
    const parsed = safeJsonParse(outText);

    if (!parsed || !Array.isArray(parsed.medicines)) {
      throw new Error('Gemini response was not valid JSON with medicines[]');
    }

    const medicines = parsed.medicines
      .filter((m) => m && typeof m.name === 'string' && m.name.trim())
      .slice(0, 12)
      .map((m) => {
        const name = String(m.name).trim();
        return {
          name,
          strength: m.strength ?? null,
          form: m.form ?? null,
          frequency: m.frequency ?? null,
          duration: m.duration ?? null,
          instructions: m.instructions ?? null,
          uses: m.uses ?? null,
          confidence: typeof m.confidence === 'number' ? m.confidence : 0.5,
          query: normalizeMedicineQuery(name)
        };
      })
      .filter((m) => m.query.length >= 2);

    return { medicines };
  } finally {
    clearTimeout(timeout);
  }
}

function heuristicExtract(text) {
  const lines = String(text || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const candidates = [];
  for (const line of lines) {
    // Skip obvious non-medicine lines
    if (/\b(dr\.|doctor|age\s*[:\-]|bp\b|diagnosis|advice|follow\s*up|date\b)\b/i.test(line)) continue;

    // Prefer lines containing dosage/form cues
    const hasCue = /(mg|mcg|ml|tab|cap|syrup|inj|ointment|cream|drops)/i.test(line);
    const rawName = hasCue ? line : line.replace(/[^a-zA-Z0-9\s\-]/g, ' ');
    const query = normalizeMedicineQuery(rawName);

    if (query && query.length >= 3) {
      candidates.push({
        name: query,
        strength: null,
        form: null,
        frequency: null,
        duration: null,
        instructions: null,
        uses: null,
        confidence: hasCue ? 0.4 : 0.2,
        query
      });
    }

    if (candidates.length >= 8) break;
  }

  // De-dupe by query
  const seen = new Set();
  const medicines = [];
  for (const c of candidates) {
    const key = c.query.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    medicines.push(c);
  }

  return { medicines };
}

async function extractMedicinesFromPrescriptionText({ text }) {
  const cleanText = String(text || '').trim();
  if (!cleanText) {
    return { medicines: [] };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;

  try {
    return await callGeminiExtract({ apiKey, model, text: cleanText });
  } catch (e) {
    // Fallback: never fail the entire flow just because AI failed
    return heuristicExtract(cleanText);
  }
}

module.exports = {
  extractMedicinesFromPrescriptionText
};
