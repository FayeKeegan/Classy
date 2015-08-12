class Api::SeatingChartsController < ApplicationController

	def index
			@seating_charts = current_user.seating_charts
			render :index
	end

end
