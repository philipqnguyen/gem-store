require 'test_helper'

class ReviewsApi < ActionDispatch::IntegrationTest
  describe 'Reviews' do
    it 'should get a list of reviews for a product' do
      get "/products/#{products(:one).id}"

      answer = JSON.parse(response.body, symbolize_names: true)[:product]

      response.status.must_equal 200
      response.content_type.must_equal Mime::JSON

      answer[:reviews].size.must_equal(
        Product.find(products(:one).id).reviews.count)
      answer[:reviews][0][:body].must_equal 'Amazing'
      answer[:reviews][0][:author].must_equal 'good@good.com'
      answer[:reviews][0][:stars].must_equal 5
    end

    it 'should create a review' do
      post '/reviews', {
      body: 'I love this!',
      stars: 5,
      author: 'joe@joe.com',
      product_id: 2
      }.to_json,
      { 'Accept' => 'application/json',
        'Content-Type' => 'application/json'
      }

      review = JSON.parse(response.body, symbolize_names: true)[:review]

      response.status.must_equal 201
      response.content_type.must_equal Mime::JSON

      review[:body].must_equal 'I love this!'
      review[:stars].must_equal 5
      review[:author].must_equal 'joe@joe.com'

      Review.last.body.must_equal 'I love this!'
    end
  end
end
