class Api::DesksController < ApplicationController

	def create
		@desk = Desk.new(desk_params)
		if @desk.save
			render json: @desk
		else
			render json: @desk.errors.full_messages, status: :unprocessable_entity
		end
	end

	def destroy
		@desk = Desk.find(params[:id])
		if @desk.destroy
			render json: @desk
		else
			render json: @desk.errors.full_messages, status: :unprocessable_entity
		end
	end


	def desk_params
		params.require(:desk).permit(:row, :column, :classroom_id)
	end

end
