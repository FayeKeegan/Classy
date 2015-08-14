json.array! @classrooms do |classroom|
	json.id classroom.id
	json.width classroom.width
	json.height classroom.height
	json.desks classroom.desks do |desk|
		json.extract! desk, :id, :row, :column
	end
end