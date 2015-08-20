class Classroom < ActiveRecord::Base
	validates :width, :height, :name, :user_id, presence: true
	validates :user, presence: true
	
	has_many :desks, dependent: :destroy
	has_many :seat_assignments, through: :desks
	has_many :sections, dependent: :destroy
	has_many :seating_charts, through: :sections
	belongs_to :user

end
