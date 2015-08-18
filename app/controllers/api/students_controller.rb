class Api::StudentsController < ApplicationController

	def index
		@students = current_user.students
		render json: @students
	end

	def create
		@student = Student.new(student_params)
		if @student.save
			render json: @student
		else
			render json: @student.errors.full_messages, status: :unprocessable_entity
		end
	end

	def show
		@student = Student.find(params[:id])
		render json: @student
	end

	def student_params
		params.require(:student).permit(:first_name, :last_name, :reading_level, :math_level, :gender)
	end



end
