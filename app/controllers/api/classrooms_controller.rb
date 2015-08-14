class Api::ClassroomsController < ApplicationController

	def index
			@classrooms = current_user.classrooms
			render :index
	end

	def classroom_params
		params.require(:classroom).permit(:id, :width, :height)
	end

end
