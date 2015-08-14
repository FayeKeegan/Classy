class Api::StudentsController < ApplicationController

	def index
		@students = current_user.students
		render json: @students
	end

	def show
		@student = Student.find(params[:id])
		render json: @student
	end


end
