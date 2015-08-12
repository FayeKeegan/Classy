class Classroom < ActiveRecord::Base
	validates :width, :height, presence: true
	
	has_many :desks

end
