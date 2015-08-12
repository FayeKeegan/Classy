json.array! @seating_charts do |seatingChart|
  json.extract! seatingChart, :id, :section_id, :name
end