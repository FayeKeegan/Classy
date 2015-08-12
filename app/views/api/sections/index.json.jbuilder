json.array! @sections do |section|
	json.extract! section, :name, :id, :teacher_id
	json.seatingCharts section.seating_charts do |seating_chart|
	  json.id seating_chart.id
	  json.name seating_chart.name
	  json.section_id seating_chart.section_id
	end

end

