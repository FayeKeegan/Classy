class Api::SeatingChartsController < ApplicationController

	def index
			@seating_charts = current_user.seating_charts
			render json: @seating_charts
	end

end
