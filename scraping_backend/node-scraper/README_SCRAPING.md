# MedScan Scraping (1mg)

This folder contains a Puppeteer scraper that populates the MongoDB `medicines` collection.

## Requirements

- Node.js
- A working MongoDB connection (`MONGO_URI`)
- A Chrome/Chromium binary available for Puppeteer
- Be aware sites may rate-limit or block scraping. Use delays and keep targets reasonable.

## Fixing Puppeteer "Could not find Chrome" (Linux)

Puppeteer needs a Chrome/Chromium binary. You have two options:

### Option A (recommended): Install Puppeteer-managed Chrome

From this folder (`scraping_backend/node-scraper/`):

```bash
npx puppeteer browsers install chrome
```

Then run:

```bash
node scraper.js
```

### Option B: Use system Chrome/Chromium

Install a browser via your distro and point the scraper to it:

```bash
sudo apt-get update
sudo apt-get install -y chromium || sudo apt-get install -y chromium-browser

export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
node scraper.js
```

If your path differs, find it with:

```bash
which google-chrome || which chromium || which chromium-browser
```

## Environment

Create `scraping_backend/node-scraper/.env` (or export vars in shell):

- `MONGO_URI=...`
- `MONGO_DB_NAME=prescription-medicine`

Optional controls:

- `SCRAPE_TARGET_PER_LETTER=12` (default 12)
- `SCRAPE_MAX_PAGES_PER_LETTER=40` (default 40)
- `SCRAPE_RESET_COLLECTION=true` (dangerous: clears `medicines` before scraping)

Browser control:

- `PUPPETEER_EXECUTABLE_PATH=/path/to/chrome` (optional)
	- Use a system-installed Chrome/Chromium instead of Puppeteer-managed downloads.
	- Examples: `/usr/bin/google-chrome`, `/usr/bin/chromium`, `/usr/bin/chromium-browser`

## Run

From repo root:

```bash
cd scraping_backend/node-scraper
npm install
node scraper.js
```

After scraping, restart backend + frontend to see updated results.
