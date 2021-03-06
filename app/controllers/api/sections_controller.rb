class Api::SectionsController < ApplicationController
	before_action :require_logged_in
	
	def index
			@sections = current_user.sections.order(created_at: :desc)
			render :index
	end

	def new
		@section = current_user.sections.new
		render :new
	end

	def destroy
		@section = Section.find(params[:id])
		if @section.destroy
			render json: @section
		else
			render json: @section_params.errors.full_messages
		end

	end


	def create
		@section = current_user.sections.new(section_params)
		if @section.save
			render json: @section
		else
			render json: @section.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@section = Section.includes(:seating_charts).find(params[:id])
		render :show
	end

	def section_params
		params[:section][:student_ids] ||= []
		params.require(:section).permit(:name, :teacher_id, :classroom_id, student_ids: [])
	end

end
