user1 = User.create!({
	username: "MrSmith",
	password: "password"
})

user2 = User.create!({
	username: "MsJohnson",
	password: "password"
})

cr1 = Classroom.create!({width: 10, height: 8, name: "Room 101"})
cr2 = Classroom.create!({width: 10, height: 8, name: "Room 102"})
cr3 = Classroom.create!({width: 10, height: 8, name: "Room 103"})
cr4 = Classroom.create!({width: 10, height: 8, name: "Room 104"})

sec1 = user1.sections.create!({name: "9th Grade Bio", classroom_id: cr1.id})
sec2 = user1.sections.create!({name: "10th Grade Chemistry", classroom_id: cr2.id})
sec3 = user2.sections.create!({name: "Algebra", classroom_id: cr3.id})
sec4 = user2.sections.create!({name: "Pre Calc", classroom_id: cr4.id})

desk_positions = [
	[1, 1], [1, 2], [2, 1], [2, 2],
	[1, 4], [1, 5], [2, 4], [2, 5],
	[1, 7], [1, 8], [2, 7], [2, 8],
	[4, 3], [4, 4], [5, 3], [5, 4],
	[4, 6], [4, 7], [5, 6], [5, 7]
]

desk_positions_2 = [
	[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2],
	[1, 7], [1, 8], [2, 7], [2, 8], [3, 7], [3, 8],
	[5, 3], [5, 4], [6, 3], [6, 4],
	[5, 6], [5, 7], [6, 6], [6, 7]
]

[cr1, cr3].each do |classroom|
	desk_positions.each do |desk_pos|
		classroom.desks.create!({
				row: desk_pos[0],
				column: desk_pos[1]
			})
	end
end

[cr2, cr4].each do |classroom|
	desk_positions_2.each do |desk_pos|
		classroom.desks.create!({
				row: desk_pos[0],
				column: desk_pos[1]
			})
	end
end

[sec1, sec2, sec3, sec4].each do |sec|
	20.times do
		first_name = Faker::Name.first_name
		last_name  = Faker::Name.last_name
		gender = rand(2) == 1 ? "F" : "M"
		reading_level = rand(5) + 1
		math_level = rand(5) + 1
		sec.students.create!({
			first_name: first_name,
			last_name: last_name,
			gender: gender,
			reading_level: reading_level,
			math_level: math_level
			})
	end
end

[sec1, sec2, sec3, sec4].each do |section|
	seating_chart = section.seating_charts.create!({name: "Project Work"})
	desks = section.classroom.desks
	section.students.shuffle.each_with_index do |student, i|
		desk = desks[i]
		SeatAssignment.create!({
			student_id: student.id,
			seating_chart_id: seating_chart.id,
			desk_id: desk.id
			})
	end
	seating_chart.save!
end

[sec1, sec2, sec3, sec4].each do |section|
	seating_chart = section.seating_charts.create!({name: "Test-Taking"})
	desks = section.classroom.desks
	section.students.shuffle.each_with_index do |student, i|
		desk = desks[i]
		SeatAssignment.create!({
			student_id: student.id,
			seating_chart_id: seating_chart.id,
			desk_id: desk.id
			})
	end
	seating_chart.save!
end

[sec1, sec2, sec3, sec4].each do |section|
	seating_chart = section.seating_charts.create!({name: "Every Day"})
	desks = section.classroom.desks
	section.students.shuffle.each_with_index do |student, i|
		desk = desks[i]
		SeatAssignment.create!({
			student_id: student.id,
			seating_chart_id: seating_chart.id,
			desk_id: desk.id
			})
	end
	seating_chart.save!
end













