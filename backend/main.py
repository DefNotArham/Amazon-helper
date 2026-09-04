import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from google import genai
from pydantic import BaseModel

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class RatingBreakdown(BaseModel):
    fiveStar: float | None
    fourStar: float | None
    threeStar: float | None
    twoStar: float | None
    oneStar: float | None


class Product(BaseModel):
    asin: str | None
    title: str | None
    price: float | None
    discount: str | None
    features: list[str | None]
    rating: float | None
    globalRatings: int | None
    ratingBreakdown: RatingBreakdown | None
    reviewSummary: str | None


class Review(BaseModel):
    rating: float | None
    title: str | None
    text: str | None


class AnalyzeRequest(BaseModel):
    product: Product
    reviews: list[Review]


@app.post("/analyze")
def analyzeProduct(data: AnalyzeRequest):
    print("PRODUCT:", data.product)
    print("REVIEWS:", data.reviews)

    return {
        "message": "Received product and reviews",
        "review_count": len(data.reviews),
    }
