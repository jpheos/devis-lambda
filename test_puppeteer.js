const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
  await page.pdf({
    path: 'test.pdf',
    format: 'A4',
    footerTemplate: '<span class="pageNumber"></span>/<span class="totalPages"></span>',
    displayHeaderFooter: true,
    margin: {top: '5cm'},
    landscape: true,
    printBackground: true
  });

  await browser.close();
})();
