class ReviewsController < ApplicationController
  def create
    review = Review.new(review_params)

    if review.save
      render json: review, status: 201, location: review_path(review)
    else
      render json: review.errors, status: 422
    end
  end

  private

  def review_params
    params.require(:review).permit(:body, :author, :stars, :product_id)
  end
end
