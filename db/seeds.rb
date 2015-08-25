guest_login = User.find_by_username("MrSmith")
if(guest_login)
	guest_login.destroy!
end

user1 = User.create!({
	username: "MrSmith",
	password: "password"
})

cr1 = user1.classrooms.create!({width: 10, height: 8, name: "Room 101"})
cr2 = user1.classrooms.create!({width: 10, height: 8, name: "Room 102"})
cr3 = user1.classrooms.create!({width: 10, height: 8, name: "Room 103"})
space_class = user1.classrooms.create!({width: 10, height: 8, name: "Room 999"})
cr4 = user1.classrooms.create!({width: 10, height: 8, name: "Room 104"})
cr5 = user1.classrooms.create!({width: 10, height: 8, name: "Room 105"})
cr6 = user1.classrooms.create!({width: 10, height: 8, name: "Room 106"})

sec1 = user1.sections.create!({name: "9th Grade Bio", classroom_id: cr1.id})
sec2 = user1.sections.create!({name: "10th Grade Chemistry", classroom_id: cr2.id})
space_sec = user1.sections.create!({name: "Space Invasion", classroom_id: space_class.id})
sec3 = user1.sections.create!({name: "Algebra", classroom_id: cr3.id})
sec4 = user1.sections.create!({name: "Pre Calc", classroom_id: cr4.id})

desk_positions = [
	[1, 1], [1, 2], [2, 1], [2, 2],
	[1, 4], [1, 5], [2, 4], [2, 5],
	[1, 7], [1, 8], [2, 7], [2, 8],
	[4, 2], [4, 3], [5, 2], [5, 3],
	[4, 6], [4, 7], [5, 6], [5, 7]
]

desk_positions_2 = [
	[1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [3, 2],
	[1, 7], [1, 8], [2, 7], [2, 8], [3, 7], [3, 8],
	[5, 2], [5, 3], [6, 2], [6, 3],
	[5, 6], [5, 7], [6, 6], [6, 7]
]

space_positions = [[2, 3], [2, 4], [2, 5], [2, 6],
		[0, 1], [1, 2], [1, 7], [0, 8], [3, 2], [4, 1],
		[3, 7], [4, 8], [4, 2], [5, 3], [5, 6], [4, 7],
		[3, 4], [5, 4], [5, 5], [3, 5], [4, 4], [4, 5],
		[4, 6], [4, 3], [5, 2], [5, 7], [4, 0], [5, 0],
		[6, 0], [4, 9], [5, 9], [6, 9], [6, 7], [6, 2],
		[7, 3], [7, 6], [3, 1], [2, 2], [2, 7], [3, 8]]

space_positions.each do |space_pos|
	space_class.desks.create!({
			row: space_pos[0],
			column: space_pos[1]
		})
end


[cr1, cr3, cr6].each do |classroom|
	desk_positions.each do |desk_pos|
		classroom.desks.create!({
				row: desk_pos[0],
				column: desk_pos[1]
			})
	end
end

[cr2, cr4, cr5].each do |classroom|
	desk_positions_2.each do |desk_pos|
		classroom.desks.create!({
				row: desk_pos[0],
				column: desk_pos[1]
			})
	end
end

40.times do
	first_name = Faker::Name.first_name
	last_name  = Faker::Name.last_name
	gender = rand(2) == 1 ? "F" : "M"
	reading_level = rand(5) + 1
	math_level = rand(5) + 1
	space_sec.students.create!({
		first_name: first_name,
		last_name: last_name,
		gender: gender,
		reading_level: reading_level,
		math_level: math_level
		})
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

[sec1, sec4, space_sec].each do |section|
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

[sec2, sec3].each do |section|
	seating_chart = section.seating_charts.create!({name: "Friday Work"})
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


[sec1, sec2, sec3, sec4, space_sec].each do |section|
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

[sec1, sec2].each do |section|
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

[sec3, sec4, space_sec].each do |section|
	seating_chart = section.seating_charts.create!({name: "Pair Work"})
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














