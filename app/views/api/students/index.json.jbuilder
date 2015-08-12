json.array! @students do |student|
  json.extract! student, :first_name, :last_name
end