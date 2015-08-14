class Api::SectionsController < ApplicationController

	def index
			@sections = current_user.sections
			render :index
	end

	def new
		@section = current_user.sections.new
		render :new
	end

	def show
		@section = Section.find(params[:id])
		render :show
	end

	def section_params
		params.require(:section).permit(:name, :teacher_id, :classroom_id)
	end

end
