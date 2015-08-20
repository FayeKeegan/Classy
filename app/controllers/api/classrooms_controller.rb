class Api::ClassroomsController < ApplicationController

	def index
			@classrooms = current_user.classrooms.includes(:desks)
			render :index
	end

	def show
		@classroom = Classroom.includes(:seating_charts, desks: [:students, seat_assignments: [:seating_chart] ]).find(params[:id])
		if @classroom
			render :show
		else
			render json: "Classroom not found", status: 403
		end
	end
	def destroy
		@classroom = Classroom.find(params[:id])
		@classroom.destroy!
		render json: @classroom
	end

	def create
		@classroom = current_user.classrooms.new(classroom_params)
		if @classroom.save
			render json: @classroom
		else
			render json: @classroom.errors.full_messages, status: :unprocessable_entity
		end

	end


	def classroom_params
		params.require(:classroom).permit(:id, :width, :height, :name, :desk_ids)
	end

end
