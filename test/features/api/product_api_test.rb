require 'test_helper'

class ProductApi < ActionDispatch::IntegrationTest
  describe 'Product API' do
    it 'should connect and read a list' do
      get '/products'
      answer = JSON.parse(response.body, symbolize_names: true)[:products]

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
      faces: 500,
      category_id: 1
      }.to_json,
      { 'Accept' => 'application/json',
        'Content-Type' => 'application/json'
      }

    response.status.must_equal 201
    response.content_type.must_equal Mime::JSON
    product = JSON.parse(response.body, symbolize_names: true)[:product]

    response.location.must_equal product_path Product.last

    product[:name].must_equal 'Tahoe shell'
    product[:description].must_equal 'Beautiful shell from Lake Tahoe'
    product[:shine].must_equal 8
    product[:price].must_equal 150.55
    product[:rarity].must_equal 9
    product[:color].must_equal 'silver'
    product[:faces].must_equal 500
    product[:category_id].must_equal 1
    Product.last.category_id.must_equal 1
    Category.find(1).products.last.name.must_equal 'Tahoe shell'
  end

  it 'should delete a product' do
    delete "/products/#{products(:one).id}"

    response.status.must_equal 204
    Product.first.id.wont_equal products(:one).id
  end

  it 'should update a product' do
    patch "/products/#{products(:two).id}", {
      shine: 2
      }.to_json,
      { 'Accept' => 'application/json',
        'Content-Type' => 'application/json'
      }

    answer = JSON.parse(response.body, symbolize_names: true)[:product]

    response.status.must_equal 200

    answer[:name].must_equal 'Diamond'
    answer[:description].must_equal 'The rarest of them all'
    answer[:shine].must_equal 2
    answer[:price].must_equal 250.99
    answer[:rarity].must_equal 9
    answer[:color].must_equal '#CCC'
    answer[:faces].must_equal 20
  end

  it 'should not update a product with bad attributes' do
    patch "/products/#{products(:two).id}", {
      shine: "hello"
      }.to_json,
      { 'Accept' => 'application/json',
        'Content-Type' => 'application/json'
      }

    answer = JSON.parse(response.body, symbolize_names: true)[:product]
    response.status.must_equal 422
  end
end

