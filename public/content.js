import {
  getAsin,
  getTitle,
  getPrice,
  getDiscount,
  getFeatures,
  getRating,
  getReviewCount,
  getRatingBreakdown,
  getReviewSummary,
  isAmazonProduct,
} from "./utils/scrapingFunctions";

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
    fiveStar: undefined,
    fourStar: undefined,
    threeStar: undefined,
    twoStar: undefined,
    oneStar: undefined,
  },
  reviewSummary: undefined,
};

const getProduct = () => {
  const isProduct = isAmazonProduct(hostname, url);

  if (!isProduct) return;

  const asin = getAsin(url);
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
