json.array! @sections do |section|
	json.extract! section, :name, :id, :teacher_id
end

