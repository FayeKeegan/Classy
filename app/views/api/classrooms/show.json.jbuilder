json.extract! @classroom, :id, :name, :width, :height

json.desks @classroom.desks do |desk|
	json.id desk.id
	json.row desk.row
	json.column desk.column
end
