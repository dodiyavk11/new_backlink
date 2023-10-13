const { parentPort, workerData } = require('worker_threads');
const puppeteer = require('puppeteer');
const path = require('path');
const Models = require("../models");
const ahrefs = require('ahrefs')({ token: '39e2a384240099a388dc58c63c17f7a7cc8db6a0' });

async function captureScreenshot(url, hash_id,domainId,type) {
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
     /* for ahref third party api to get domain rating etc... */

      // const query = ahrefs.newQuery().target(url).mode('domain').output('json').from('domain_rating');     
      const query = ahrefs.newQuery().target("ahrefs.com").mode('domain').output('json').from('domain_rating');     
      const result = await new Promise((resolve, reject) => {
          ahrefs.get(query, function(err, result) {
              if (err) {
                  reject(err);
              } else {
                  resolve(result);
              }
          });
      });
      if (result) {
        const domain_rating = result.domain.domain_rating;
        const domain_id = domainId;
        const addData = { domain_id,domain_rating };
        if(type === "user")
        {
          const addDataDomain = await Models.customerDomainData.create(addData);          
        }        
        else
        {
          const addDataDomain = await Models.publisherDomainData.create(addData);          
        }
      }
  } catch (error) {
    console.error('Screenshot capture error:', error);
    parentPort.postMessage('Screenshot capture failed.');
  }
}

const { url, hash_id, domainId,type } = workerData;
captureScreenshot(url, hash_id,domainId,type);
