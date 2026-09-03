const url = window.location.href;
const hostname = window.location.hostname;

let product = {};

const isAmazonProduct = () => {
  let result = false;

  if (hostname !== "www.amazon.com") {
    console.log("This is not an amazon url");
    return result;
  }

  if (!url.includes("/dp/")) return result;
};

const getAsin = () => {
  const parts = url.split("/dp/");
  const asin = parts[1].split("?")[0].split("/")[0];

  const isValidAsin = /^[A-Z0-9]{10}$/i.test(asin);

  if (!isValidAsin) return;

  return asin;
};

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "GET_PRODUCT") {
//     const result = isAmazonProduct();
//     sendResponse(result);
//   }
// });
