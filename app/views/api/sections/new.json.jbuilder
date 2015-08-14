json.extract! @section, :id, :name

json.classrooms @section.teacher.classrooms do |classroom|
	json.id classroom.id
	json.width classroom.width
	json.height classroom.height
	json.desks classroom.desks do |desk|
		json.extract! desk, :id, :row, :column
	end
end

json.students @section.teacher.students do |student|
  json.id student.id
  json.first_name student.first_name
  json.last_name student.last_name
  json.reading_level student.reading_level
  json.math_level student.math_level
  json.gender student.gender
end
