const isAmazonProduct = () => {
  const url = window.location.href;

  return url.includes("amazon.com/dp/");
};

console.log(isAmazonProduct());
