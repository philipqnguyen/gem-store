class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :stars, :author, :product_id
end
