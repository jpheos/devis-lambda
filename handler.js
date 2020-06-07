const chromium = require('chrome-aws-lambda');

const generateResponseForData = (data, statusCode) => {
  return {
      statusCode: statusCode,
      headers: {
          "Content-Type" : "application/pdf",
          "Content-Disposition" : 'inline; filename="filename.pdf"'
      },
      isBase64Encoded: true,
      body: data,
  };
};



module.exports.hello = async event => {
  // const url = "https://www.w3.org/TR/css-print/"
  const url = event.queryStringParameters.url

  console.log("process.env.CHROME_PATH")
  console.log(process.env.CHROME_PATH)

  // console.log("je suis la")
  // console.log(event)
  // console.log(event.queryStringParameters.url)
  // return {toto: "titi"}

  const conf = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless
  }

  if (process.env.CHROME_PATH) {
    // conf.executablePath = await chromium.executablePath
  }

  const browser = await chromium.puppeteer.launch(conf);
  const page    = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});
  const pdf = await page.pdf({format: 'A4'});
  const pdfBase64 = await pdf.toString('base64');

  await browser.close();

  return generateResponseForData(pdfBase64, 200)
};












