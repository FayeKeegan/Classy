class Student < ActiveRecord::Base
	validates :first_name, :last_name, :gender, presence: true

	has_many :sectionings
	has_many :sections, through: :sectionings
	has_many :seat_assignments

	def assign_to!(desk, seating_chart)
		SeatAssignment.create!({
			student_id: self.id,
			seating_chart_id: seating_chart.id,
			desk_id: desk.id})
	end
end
