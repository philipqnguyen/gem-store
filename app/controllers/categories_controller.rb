class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories, status: 200
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: 201, location: category_path(category)
    else
      render json: category.errors, status: 422
    end
  end

  def update
    category = Category.find(params[:id])
    if category.update_attributes(category_params)
      render json: category, status: 200, location: category_path(category)
    else
      render json: category.errors, status: 422
    end
  end

  def destroy
    category = Category.find(params[:id])
    category.destroy
    render nothing: true, status: 204
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
