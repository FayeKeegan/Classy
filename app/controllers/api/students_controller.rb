class Api::StudentsController < ApplicationController

	def index
			@students = current_user.sections
			render :index
	end

end
