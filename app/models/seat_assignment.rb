class SeatAssignment < ActiveRecord::Base
	validates :student, :desk, :seating_chart, presence:true
	belongs_to :student
	belongs_to :desk
	belongs_to :seating_chart

end
