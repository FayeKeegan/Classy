class Api::SectionsController < ApplicationController

	def index
			@sections = current_user.sections
			render :index
	end

	def new
		@section = current_user.sections.new
		render :new
	end

	def create
		@section = current_user.sections.new(section_params);
		if @section.save
			render json: @section
		else
			render json: @section.errors.full_messages
		end
		
	end

	def show
		@section = Section.find(params[:id])
		render :show
	end

	def section_params
		params[:section][:student_ids] ||= []
		params.require(:section).permit(:name, :teacher_id, :classroom_id, student_ids: [])
	end

end
