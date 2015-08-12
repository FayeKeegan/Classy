json.sections @sections do |section|
  json.extract! section, :name
  json.seatingCharts section.seating_charts do |seatingChart|
  	json.extract! seatingChart, :name
  end
end
