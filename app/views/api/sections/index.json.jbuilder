json.array! @sections do |section|
	json.extract! section, :name, :id, :teacher_id, :updated_at, :created_at
	json.seatingCharts section.seating_charts do |seating_chart|
	  json.id seating_chart.id
	  json.name seating_chart.name
	  json.section_id seating_chart.section_id
	end
	if (section.classroom)
	  json.classroom do 
			json.extract! section.classroom, :height, :width, :name, :id
			json.desks section.classroom.desks do |desk|
				json.extract! desk, :row, :column, :id
			end
		end
		json.desks section.classroom.desks do |desk|
			json.extract! desk, :row, :column, :id
		end
	end 
end

