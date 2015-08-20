class Classroom < ActiveRecord::Base
	validates :width, :height, :name, :user_id, presence: true
	validates :user, presence: true
	
	has_many :desks, dependent: :destroy
	belongs_to :user

end
