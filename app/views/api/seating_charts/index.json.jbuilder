json.seatingCharts @seating_charts do |seatingChart|
  json.extract! seatingChart, :name
	json.extract! seatingChart, :section
end