Rails.application.routes.draw do
	root to: 'static_pages#root'
 
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
  	resources :seating_charts, only: [:index, :create, :show, :update, :destroy]
  	resources :sections
  	resources :students
    resources :classrooms
    resources :desks
  	resources :seat_assignments
  end

end
