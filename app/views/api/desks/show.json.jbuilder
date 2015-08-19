json.extract! @desk, :id, :row, :column

json.seatAssignments @desk.seat_assignments do |seat_assignment|
	json.extract! seat_assignment, :id, :seating_chart_id, :student_id, :desk_id
	json.student do 
		json.extract! seat_assignment.student, :id, :first_name, :last_name, :reading_level, :math_level, :gender
	end

	json.seatingChart do 
		json.extract! seat_assignment.seating_chart, :id, :name
	end
end

