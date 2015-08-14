class Api::SeatAssignmentsController < ApplicationController

	def create
		@seat_assignment = SeatAssignment.new(seat_assignment_params)
		if @seat_assignment.save
			render json: @seat_assignment
		else
			render json: @seat_assignment.errors.full_messages
		end
	end

	def show
		@seat_assignment = SeatAssignment.find(params[:id])
		render json: @seat_assignment
	end


	def destroy
		@seat_assignment = SeatAssignment.find(params[:id])
		@seat_assignment.destroy
		render json: @seat_assignment
	end

	def seat_assignment_params
		params.require(:seat_assignment).permit(:desk_id, :student_id, :seating_chart_id)
	end


end
