class Api::SectionsController < ApplicationController

	def index
			@sections = current_user.sections
			render :index
	end

end
