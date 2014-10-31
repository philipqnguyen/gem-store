class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :body, :stars, :author, :product_id, :created_at
end
