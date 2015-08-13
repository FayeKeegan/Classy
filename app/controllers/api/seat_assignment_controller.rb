class Api::SeatAssignmentController < ApplicationController

	def create
		seat_assignment = SeatAssignment.new(seat_assignment_params)
		if seat_assignment.save
			render json: @seat_assignment
		else
			render json: @seat_assignment.errors.full_messager
		end

	end

	def destroy
		@seat_assignment = SeatAssignment.find(params[:id])
		@seat_assignment.destroy
	end

	def seat_assignment_params
		params.require(:seat_assignment).permit(:section_id, :desk_id, :student_id)
	end

end
