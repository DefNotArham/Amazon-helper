const url = window.location.href;
const hostname = window.location.hostname;

const isAmazonProduct = () => {
  if (hostname !== "www.amazon.com") {
    console.log("This is not an Amazon URL");
    return false;
  }

  if (!url.includes("/dp/")) return false;

  return true;
};

const getAsin = () => {
  const parts = url.split("/dp/");
  const asin = parts[1].split("?")[0].split("/")[0];

  const isValidAsin = /^[A-Z0-9]{10}$/i.test(asin);

  if (!isValidAsin) return undefined;

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

  if (!priceWhole || !priceFraction) return undefined;

  return Number(`${priceWhole}${priceFraction}`);
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

const getReviewSummary = () => {
  const summary = document.querySelector('[data-testid="overall-summary"]');

  if (!summary) return undefined;

  const text = summary.querySelector("span");

  return text?.textContent?.trim();
};

const getReviews = () => {
  const reviewElements = document.querySelectorAll('[data-hook="review"]');

  const reviews = Array.from(reviewElements)
    .slice(0, 50)
    .map((review) => {
      const ratingText = review
        .querySelector('[data-hook="review-star-rating"] .a-icon-alt')
        ?.textContent?.trim();

      const rating = ratingText ? Number(ratingText.split(" ")[0]) : undefined;

      const title = review
        .querySelector('[data-hook="reviewTitle"]')
        ?.textContent?.trim();

      const text = review
        .querySelector('[data-hook="reviewText"]')
        ?.textContent?.trim();

      return {
        rating,
        title,
        text,
      };
    });

  return reviews;
};

let product = {
  asin: undefined,
  title: undefined,
  price: undefined,
  discount: undefined,
  features: [],
  rating: undefined,
  reviewCount: undefined,
  ratingBreakdown: {
    fiveStar: undefined,
    fourStar: undefined,
    threeStar: undefined,
    twoStar: undefined,
    oneStar: undefined,
  },
  reviewSummary: undefined,
  reviews: [],
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
  const reviewSummary = getReviewSummary();

  product.asin = asin;
  product.title = title;
  product.price = price;
  product.discount = discount;
  product.features = features;
  product.rating = rating;
  product.reviewCount = reviewCount;
  product.ratingBreakdown = reviewBreakdown;
  product.reviewSummary = reviewSummary;

  console.log(product);
};

getProduct();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_PRODUCT") {
    getProduct();

    sendResponse(product);
  }
});
