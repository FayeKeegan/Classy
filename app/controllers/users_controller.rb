class UsersController < ApplicationController
	def new
		@user = User.new
		render :new
	end

	def create 
		@user = User.new(user_params)
		if @user.save
			login!(@user)
			redirect_to "/"
		end
	end

end
