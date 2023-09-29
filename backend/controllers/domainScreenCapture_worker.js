const { parentPort, workerData } = require('worker_threads');
const puppeteer = require('puppeteer');
const path = require('path');

async function captureScreenshot(url, hash_id) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'image') {
        request.abort();
      } else {
        request.continue();
      }
    });
    await page.goto('https://' + url, { timeout: 60000 });
    await page.screenshot({ path: path.join(__dirname, '..', 'assets', 'domain_img', `${hash_id}.png`), fullPage: false });
    await browser.close();
    parentPort.postMessage('Screenshot capture completed.');
  } catch (error) {
    console.error('Screenshot capture error:', error);
    parentPort.postMessage('Screenshot capture failed.');
  }
}

const { url, hash_id } = workerData;
captureScreenshot(url, hash_id);
