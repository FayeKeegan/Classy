json.extract! @seating_chart, :id, :name

json.students @seating_chart.section.students do |student|
  json.id student.id
  json.first_name student.first_name
  json.last_name student.last_name
  json.reading_level student.reading_level
  json.math_level student.math_level
  json.gender student.gender
end

