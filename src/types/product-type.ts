export type Product = {
  asin: string | undefined;
  title: string | undefined;
  price: number | undefined;
  discount: string | undefined;
  features: (string | undefined)[];
  rating: number | undefined;
  globalRatings: number | undefined;
  ratingBreakdown:
    | {
        fiveStar: number | undefined;
        fourStar: number | undefined;
        threeStar: number | undefined;
        twoStar: number | undefined;
        oneStar: number | undefined;
      }
    | undefined;
  reviewSummary: string | undefined;
};
