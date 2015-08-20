json.extract! @classroom, :id, :name, :width, :height

json.seatingCharts @classroom.seating_charts do |seating_chart|
	json.extract! seating_chart, :id, :name
end

json.sections @classroom.sections do |section|
	json.extract! section, :id, :name, :teacher_id, :classroom_id
end

json.desks @classroom.desks do |desk|
	json.id desk.id
	json.row desk.row
	json.column desk.column
	json.seatAssignments desk.seat_assignments do |seat_assignment|
		json.extract! seat_assignment, :id, :seating_chart_id, :student_id, :desk_id
		json.student do 
			json.extract! seat_assignment.student, :id, :first_name, :last_name, :reading_level, :math_level, :gender
		end

		json.seatingChart do 
			json.extract! seat_assignment.seating_chart, :id, :name
		end
	end
end
