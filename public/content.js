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

  result.isProduct = true;
  result.asin = asin;

  console.log(result);
  return result;
};

console.log("Is product:", isAmazonProduct());
