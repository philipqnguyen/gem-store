class AddProductToReview < ActiveRecord::Migration
  def change
    add_reference :reviews, :product, index: true
  end
end
