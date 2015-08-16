class Api::ClassroomsController < ApplicationController

	def index
			@classrooms = current_user.classrooms
			render :index
	end

	def create
		@classroom = Classroom.new(classroom_params)
		if @classroom.save
			render json: @classroom
		else
			render json: @classroom.errors.full_messages
		end

	end


	def classroom_params
		params.require(:classroom).permit(:id, :width, :height, :name, :desk_ids)
	end

end
