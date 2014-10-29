require 'test_helper'

class CategoryApi < ActionDispatch::IntegrationTest
  describe 'Product API' do
    it 'should connect and get a list of categories' do
      get '/categories'
      answer = JSON.parse(body, symbolize_names: true)

      response.status.must_equal 200
      response.content_type.must_equal Mime::JSON
      answer.size.must_equal Product.count
      answer[0][:name].must_equal 'gems'
      answer[1][:name].must_equal 'shells'
    end
  end
end
