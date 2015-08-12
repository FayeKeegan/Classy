class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
  	return nil if session[:session_token].nil?
  	User.find_by_session_token(session[:session_token])
  end

  def login!(user)
  	user.reset_session_token!
  	session[:session_token] = user.session_token
  end

  def logout!
  	current_user.reset_session_token!
  	session[:session_token] = nil
  end

  def logged_in
  	!!current_user
  end

  def require_logged_in
  	redirect_to new_session_url unless logged_in
  end

  def user_params
  	params.require(:user).permit(:username, :password)
  end


end
