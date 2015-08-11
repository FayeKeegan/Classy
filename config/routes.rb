Rails.application.routes.draw do
	root to: 'static_pages#root'
 
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
  	resources :seating_charts, only: [:index, :create, :show, :update, :destroy]
  	resources :subjects, only: [:create, :show, :update, :destroy]
  	# resources :sections, only: [:create, :show, :update, :destroy]
  	# resources :classrooms, only: [:create, :show, :update, :destroy]
  	# resources :desks, only: [:create, :show, :update, :destroy]
  	# resources :students, only: [:create, :show, :update, :destroy]
  	# resources :seat_assignments, only: [:create, :show, :update, :destroy]
  end

end
