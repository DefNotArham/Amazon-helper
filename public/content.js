const url = window.location.href;
const hostname = window.location.hostname;

let product = {
  asin: "",
  title: "",
};

const isAmazonProduct = () => {
  if (hostname !== "www.amazon.com") {
    console.log("This is not an amazon url");
    return false;
  }

  if (!url.includes("/dp/")) return false;

  return true;
};

const getAsin = () => {
  const parts = url.split("/dp/");
  const asin = parts[1].split("?")[0].split("/")[0];

  const isValidAsin = /^[A-Z0-9]{10}$/i.test(asin);

  if (!isValidAsin) return;

  return asin;
};

const getTitle = () => {
  const title = document.querySelector("#productTitle");

  return title?.textContent?.trim();
};

const getProduct = () => {
  const isProduct = isAmazonProduct();

  if (!isProduct) return;

  const asin = getAsin();
  const title = getTitle();

  product.asin = asin;
  product.title = title;

  console.log(product);
};

getProduct();

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === "GET_PRODUCT") {
//     const result = isAmazonProduct();
//     sendResponse(result);
//   }
// });
