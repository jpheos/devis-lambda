const launchChrome = require  ("@serverless-chrome/lambda");
const request = require  ("superagent");

module.exports.getChrome = async () => {
  console.log("je suis la 0000")
  const chrome = await launchChrome();

  console.log("je suis la1")
  console.log(chrome)

  const response = await request
    .get(`${chrome.url}/json/version`)
    .set("Content-Type", "application/json");

    console.log("je suis la 2")
    console.log(response)


  const endpoint = response.body.webSocketDebuggerUrl;

  console.log("je suis la 3")
  console.log(endpoint)

  return {
    endpoint,
    instance: chrome
  };
};
