export const isAmazonProduct = (hostname, url) => {
  if (hostname !== "www.amazon.com") {
    console.log("This is not an amazon url");
    return false;
  }

  if (!url.includes("/dp/")) return false;

  return true;
};

export const getAsin = (url) => {
  const parts = url.split("/dp/");
  const asin = parts[1].split("?")[0].split("/")[0];

  const isValidAsin = /^[A-Z0-9]{10}$/i.test(asin);

  if (!isValidAsin) return;

  return asin;
};

export const getTitle = () => {
  const title = document.querySelector("#productTitle");

  return title?.textContent?.trim();
};

export const getPrice = () => {
  const priceWhole = document
    .querySelector(".a-price-whole")
    ?.textContent?.trim();

  const priceFraction = document
    .querySelector(".a-price-fraction")
    ?.textContent?.trim();

  if (!priceWhole || !priceFraction) return undefined;

  return Number(`${priceWhole}${priceFraction}`);
};

export const getDiscount = () => {
  const discount = document.querySelector(".savingsPercentage");

  return discount?.textContent?.trim();
};

export const getFeatures = () => {
  const featureSection = document.querySelector("#feature-bullets");

  if (!featureSection) return [];

  const list = featureSection.querySelector("ul");

  if (!list) return [];

  const features = list.querySelectorAll("li");

  return Array.from(features).map((feature) => feature.textContent?.trim());
};

export const getRating = () => {
  const rating = document.querySelector('[data-hook="rating-out-of-text"]');

  const text = rating?.textContent?.trim();

  if (!text) return undefined;

  return Number(text.split(" ")[0]);
};

export const getReviewCount = () => {
  const reviewCount = document.querySelector(
    '[data-hook="total-review-count"]',
  );

  const text = reviewCount?.textContent?.trim();

  if (!text) return undefined;

  return Number(text.replace(/,/g, "").split(" ")[0]);
};

export const getRatingBreakdown = () => {
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

export const getReviewSummary = () => {
  const summary = document.querySelector('[data-testid="overall-summary"]');

  if (!summary) return undefined;

  const text = summary.querySelector("span");

  return text?.textContent?.trim();
};
