class Api::SeatingChartsController < ApplicationController

	def index
			@seating_charts = current_user.seating_charts
			render :index
	end

	def new
		@seating_chart = current_user.seating_charts.new()
		render json: @seating_chart
	end


	def create
		@seating_chart = SeatingChart.new(seating_chart_params)
		if @seating_chart.save
			render json: @seating_chart
		else
			render json: @seating_chart.errors.full_messages, status: :unprocessable_entity
		end
	end

	def destroy
		@seating_chart = SeatingChart
			.includes(:seat_assignments, section: [:students, classroom: [:desks]])
			.find(params[:id])
		@seating_chart.destroy!
		render json: @seating_chart
	end

	def show
		@seating_chart = SeatingChart.find(params[:id])
		render :show
	end

	def seating_chart_params
		params.require(:seating_chart).permit(:name, :section_id)
	end


end
