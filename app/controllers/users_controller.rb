class UsersController < ApplicationController
	def new
		@user = User.new
		render :new
	end

	def create 
		@user = User.new(user_params)
		debugger
		if @user.save
			login!(@user)
			redirect_to "/"
		else
			render json: @user.errors.full_messages
		end
	end

end
