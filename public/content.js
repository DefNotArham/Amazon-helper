const isAmazonProduct = () => {
  const url = window.location.href;

  console.log("Current URL", url);
  console.log("Has /dp/:", url.includes("/dp/"));

  return url.includes("amazon.com/dp/");
};

console.log("Is product:", isAmazonProduct());
