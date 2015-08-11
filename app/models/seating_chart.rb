class SeatingChart < ActiveRecord::Base
	validates :name, presence: true
	validates :classroom, presence: true
	
	belongs_to :classroom

end
