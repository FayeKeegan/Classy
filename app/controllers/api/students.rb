json.array! @students do |student|
  json.extract! student, :id, :first_name, :last_name, :reading_level, :math_level, :gender
end