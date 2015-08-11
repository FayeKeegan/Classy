class SessionsController < ApplicationController

	def new
		@user = User.new()
		render :new
	end

	def create
		@user = User.find_by_credentials(user_params[:username], user_params[:password])
		if @user
			login!(@user)
			render json: @user
		else
			redirect_to new_session_url
		end
	end

	def destroy
		logout!
		redirect_to new_session_url
	end

end
