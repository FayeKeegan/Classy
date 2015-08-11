user1 = User.create({
	username: "MrSmith",
	password: "Password"
})

user2 = User.create({
	username: "MsJohnson",
	password: "Password"
})

subj1 = user1.subjects.create({name: "9th Grade Bio"})
subj2 = user1.subjects.create({name: "10th Grade Chemisry"})


subj3 = user2.subjects.create({name: "Calculus"})
subj4 = user2.subjects.create({name: "Precalculus"})

cr1 = subj1.sections.create({width: 10, height: 10})
cr2 = subj2.sections.create({width: 10, height: 10})
cr3 = subj3.sections.create({width: 10, height: 10})
cr4 = subj4.sections.create({width: 10, height: 10})

sec1 = subj1.sections.create({name: "B Block"})
sec2 = subj2.sections.create({name: "D Block"})
sec3 = subj3.sections.create({name: "A Block"})
sec4 = subj4.sections.create({name: "F Block"})

[sec1, sec2, sec3, sec4].each do |sec|
	20.times do
		first_name = Faker::Name.first_name
		last_name  = Faker::Name.last_name
		gender = rand(2) == 1 ? "F" : "M"
		reading_level = rand(5) + 1
		math_level = rand(5) + 1
		sec.students.create({
			first_name: first_name,
			last_name: last_name,
			gender: gender,
			reading_level: reading_level,
			math_level: math_level
			})
	end
end

desk_positions = [
	[1, 1], [1, 2], [2, 1], [2, 2],
	[1, 4], [1, 5], [2, 4], [2, 5],
	[1, 7], [1, 8], [2, 7], [2, 7],
	[4, 3], [4, 4], [5, 3], [5, 4],
	[4, 6], [4, 7], [5, 6], [5, 7]
]

[cr1, cr2, cr3, cr4].each do |classroom|
	desk_positions.each do |desk_pos|
		classroom.desks.create({
				row: pos[0],
				col: pos[1]
			})
	end
end


sc1 = cr1.seating_charts.create({name: "Test Taking"})
sc2 = cr1.seating_charts.create({name: "Project Work"})
sc3 = cr2.seating_charts.create({name: "Project Work"})
sc4 = cr2.seating_charts.create({name: "Test Taking"})
sc5 = cr3.seating_charts.create({name: "Pair Work"})
sc6 = cr3.seating_charts.create({name: "Everyday"})
sc7 = cr4.seating_charts.create({name: "Everyday"})
sc8 = cr4.seating_charts.create({name: "Project Work"})







