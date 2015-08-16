class Classroom < ActiveRecord::Base
	validates :width, :height, :name, presence: true
	
	has_many :desks

end
