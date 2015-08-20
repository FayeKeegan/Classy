class Classroom < ActiveRecord::Base
	validates :width, :height, :name, :user_id, presence: true
	validates :user, presence: true
	
	has_many :desks, dependent: :destroy
	has_many :seat_assignments, through: :desks
	has_many :sections
	belongs_to :user

end
