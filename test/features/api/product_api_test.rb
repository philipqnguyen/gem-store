require 'test_helper'

class ProductApi < ActionDispatch::IntegrationTest
  describe 'Product API' do
    it 'should connect and get a list' do
      get '/products'
      answer = JSON.parse(response.body, symbolize_names: true)

      response.status.must_equal 200
      response.content_type.must_equal Mime::JSON
      answer.size.must_equal Product.count
      answer[0][:name].must_equal 'Azurite'
      answer[1][:name].must_equal 'Diamond'
    end
  end

  it 'should create a new product' do
    post '/products', {
      name: 'Tahoe shell',
      description: 'Beautiful shell from Lake Tahoe',
      shine: 8,
      price: 150.55,
      rarity: 9,
      color: 'silver',
      faces: 500
      }.to_json,
      { 'Accept' => 'application/json',
        'Content-Type' => 'application/json'
      }

    response.status.must_equal 201
    response.content_type.must_equal Mime::JSON
    product = JSON.parse(response.body, symbolize_names: true)

    response.location.must_equal product_path(product[:id])
    product[:name].must_equal 'Tahoe shell'
    product[:description].must_equal 'Beautiful shell from Lake Tahoe'
    product[:shine].must_equal 8
    product[:price].must_equal 150.55
    product[:rarity].must_equal 9
    product[:color].must_equal 'silver'
    product[:faces].must_equal 500
  end

  it 'should delete a product' do
    delete "/products/#{products(:one).id}"

    response.status.must_equal 204
    Product.first.id.wont_equal products(:one).id
  end
end
  #   assert_equal 201, response.status
  #   assert_equal Mime::JSON, response.content_type
  #   book = json(response.body)[:book]
  #   assert_equal book_url(book[:id]), response.location

  #   assert_equal 'Pragmatic Programmer', book[:title]
  #   assert_equal 5, book[:rating].to_i
  #   assert_equal 'Dave Thomas', book[:author]
  #   assert_equal 1, book[:genre_id]
  #   assert_equal 'Excellent book for any programmer.', book[:review]
  #   assert_equal '12123', book[:amazon_id]
  # end

  # var gems = [{
  #   name: 'Azurite',
  #   description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
  #   shine: 8,
  #   price: 110.50,
  #   rarity: 7,
  #   color: '#CCC',
  #   faces: 14,
  #   images: [
  #     "images/gem-02.gif",
  #     "images/gem-05.gif",
  #     "images/gem-09.gif"
  #   ],
  #   reviews: [{
  #     stars: 5,
  #     body: "I love this gem!",
  #     author: "joe@example.org",
  #     createdOn: 1397490980837
  #   }, {
  #     stars: 1,
  #     body: "This gem sucks.",
  #     author: "tim@example.org",
  #     createdOn: 1397490980837
  #   }]
