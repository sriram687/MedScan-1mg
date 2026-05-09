const express = require('express');
const protect = require('../middleware/authMiddleware');
const { extractMedicinesFromPrescriptionText } = require('../services/prescriptionExtractionService');

const router = express.Router();

// POST /api/prescriptions/extract
// Body: { text: string }
router.post('/extract', protect, async (req, res) => {
  try {
    const text = req.body?.text;
    if (!text || !String(text).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Missing prescription text'
      });
    }

    const result = await extractMedicinesFromPrescriptionText({ text });

    return res.json({
      success: true,
      data: {
        medicines: result.medicines
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to extract medicines',
      error: error?.message || 'Unknown error'
    });
  }
});

module.exports = router;
