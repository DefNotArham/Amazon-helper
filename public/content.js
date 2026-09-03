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
  rating: undefined,
  reviewCount: undefined,
  ratingBreakdown: {
    fiverStar: undefined,
    fourStar: undefined,
    threeStar: undefined,
    twoStar: undefined,
    oneStar: undefined,
  },
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

const getRating = () => {
  const rating = document.querySelector('[data-hook="rating-out-of-text"]');

  const text = rating?.textContent?.trim();

  if (!text) return undefined;

  return Number(text.split(" ")[0]);
};

const getReviewCount = () => {
  const reviewCount = document.querySelector(
    '[data-hook="total-review-count"]',
  );

  const text = reviewCount?.textContent?.trim();

  if (!text) return undefined;

  return Number(text.replace(/,/g, "").split(" ")[0]);
};

const getRatingBreakdown = () => {
  const histogram = document.querySelector("#histogramTable");

  if (!histogram) return undefined;

  const ratings = histogram.querySelectorAll('[role="progressbar"]');

  return {
    fiveStar: Number(ratings[0]?.getAttribute("aria-valuenow")),
    fourStar: Number(ratings[1]?.getAttribute("aria-valuenow")),
    threeStar: Number(ratings[2]?.getAttribute("aria-valuenow")),
    twoStar: Number(ratings[3]?.getAttribute("aria-valuenow")),
    oneStar: Number(ratings[4]?.getAttribute("aria-valuenow")),
  };
};

const getProduct = () => {
  const isProduct = isAmazonProduct();

  if (!isProduct) return;

  const asin = getAsin();
  const title = getTitle();
  const price = getPrice();
  const discount = getDiscount();
  const features = getFeatures();
  const rating = getRating();
  const reviewCount = getReviewCount();
  const reviewBreakdown = getRatingBreakdown();

  product.asin = asin;
  product.title = title;
  product.price = price;
  product.discount = discount;
  product.features = features;
  product.rating = rating;
  product.reviewCount = reviewCount;
  product.ratingBreakdown = reviewBreakdown;

  console.log(product);
};

getProduct();
