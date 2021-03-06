json.extract! @seating_chart, :id, :name

json.classroom do 
	json.extract! @seating_chart.section.classroom, :id, :name, :width, :height
end

json.section do 
	json.extract! @seating_chart.section, :id, :name
end

json.seatAssignments @seating_chart.seat_assignments do |seat_assignment|
	json.id seat_assignment.id
	json.desk_id seat_assignment.desk_id
	json.student_id seat_assignment.student_id
	json.student do 
		json.extract! seat_assignment.student, :id, :first_name, :last_name, :reading_level, :math_level
	end
	json.desk do 
		json.extract! seat_assignment.desk, :id, :row, :column
	end
end

json.desks @seating_chart.section.classroom.desks do |desk|
	json.id desk.id
	json.row desk.row
	json.column desk.column
end

json.students @seating_chart.section.students do |student|
  json.id student.id
  json.first_name student.first_name
  json.last_name student.last_name
  json.reading_level student.reading_level
  json.math_level student.math_level
  json.gender student.gender
end




