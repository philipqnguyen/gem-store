class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :shine, :price, :rarity, :color, :faces, :category_id

  belongs_to :category
end
