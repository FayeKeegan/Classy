class Api::SectionsController < ApplicationController

	def index
			@sections = current_user.sections
			render :index
	end

	def new
		@section = Section.new
		render json: @section
	end


	def show
		@section = Section.find(params[:id])
		render :show
	end
end
