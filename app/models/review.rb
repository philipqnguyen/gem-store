class Review < ActiveRecord::Base
  validates :stars, presence: true
  validates :author, presence: true
  validates :body, presence: true

  belongs_to :products
end
