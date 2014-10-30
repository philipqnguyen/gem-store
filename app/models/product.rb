class Product < ActiveRecord::Base
  validates :name, :description, :shine, :price,
            :rarity, :color, :faces, presence: true
  validates :shine, :faces, :rarity, numericality: { only_integer: true }
  validates :price, numericality: true

  belongs_to :category
end
