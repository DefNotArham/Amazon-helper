const isAmazonProduct = () => {
  const url = window.location.href;
  const hostname = window.location.hostname;
  let result = {
    isProduct: false,
    asin: "",
  };

  if (hostname !== "www.amazon.com") {
    console.log("This is not an amazon url");
    return result;
  }

  if (!url.includes("/dp/")) return result;

  const parts = url.split("/dp/");
  const asin = parts[1].split("?")[0].split("/")[0];

  const isValidAsin = /^[A-Z0-9]{10}$/i.test(asin);

  if (!isValidAsin) return result;

  result.isProduct = true;
  result.asin = asin;

  console.log(result);
  return result;
};

const result = isAmazonProduct();

chrome.runtime.sendMessage({
  type: "PRODUCT_DETECTED",
  data: result,
});
