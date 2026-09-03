const url = window.location.href;
const hostname = window.location.hostname;

let product = {
  asin: undefined,
  title: undefined,
  price: {
    whole: undefined,
    fraction: undefined,
  },
  discount: undefined,
  features: [],
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

const getPrice = () => {
  const priceWhole = document
    .querySelector(".a-price-whole")
    ?.textContent?.trim();

  const priceFraction = document
    .querySelector(".a-price-fraction")
    ?.textContent?.trim();

  return { whole: priceWhole, fraction: priceFraction };
};

const getDiscount = () => {
  const discount = document.querySelector(".savingsPercentage");

  return discount?.textContent?.trim();
};

const getFeatures = () => {
  const featureSection = document.querySelector("#feature-bullets");

  if (!featureSection) return [];

  const list = featureSection.querySelector("ul");

  if (!list) return [];

  const features = list.querySelectorAll("li");

  return Array.from(features).map((feature) => feature.textContent?.trim());
};

const getProduct = () => {
  const isProduct = isAmazonProduct();

  if (!isProduct) return;

  const asin = getAsin();
  const title = getTitle();
  const price = getPrice();
  const discount = getDiscount();
  const features = getFeatures();

  product.asin = asin;
  product.title = title;
  product.price = price;
  product.discount = discount;
  product.features = features;

  console.log(product);
};

getProduct();
