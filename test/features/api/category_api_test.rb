require 'test_helper'

class CategoryApi < ActionDispatch::IntegrationTest
  describe 'Category API' do
    it 'should connect and get a list of categories' do
      get '/categories'
      answer = JSON.parse(response.body, symbolize_names: true)[:categories]

      response.status.must_equal 200
      response.content_type.must_equal Mime::JSON
      answer.size.must_equal Product.count
      answer[0][:name].must_equal 'shells'
      answer[1][:name].must_equal 'gems'
      answer[1][:products].size.must_equal 2
    end

    it 'should create a new category' do
      post '/categories', {
        name: 'Space rocks'
      }.to_json,
      {
        'Accept' => 'application/json',
        'Content-Type' => 'application/json'
      }

      answer = JSON.parse(response.body, symbolize_names: true)[:category]

      response.status.must_equal 201
      response.content_type.must_equal Mime::JSON

      answer[:name].must_equal 'Space rocks'
      Category.last.name.must_equal 'Space rocks'
    end

    it 'should delete an existing category' do
      delete "/categories/#{categories(:one).id}"

      response.status.must_equal 204
      Category.first.id.wont_equal categories(:one).id
    end

    it 'should update an existing category' do
      patch "/categories/#{2}", {
      name: 'banana'
      }.to_json,
      { 'Accept' => 'application/json',
        'Content-Type' => 'application/json'
      }

      answer = JSON.parse(response.body, symbolize_names: true)[:category]

      answer[:name].must_equal 'banana'
      Category.find(2).name.must_equal 'banana'
    end
  end
end
