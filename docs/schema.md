# Schema Information
## User
* id
* username
* password_digest
* session_token
* Relationships
    * has many sections
    * has many classrooms through sections
    * has many students through sections
    * has many seating charts through sections

## Section
* id
* name
* classroom_id
* teacher_id
* Relationships
	* belongs to a teacher
	* belongs to a room
	* has many students through sectioning
	* has many seating_charts
	* has_many seat_assignments through seating_charts

## Sectioning
* id
* student_id
* section_id

## Seating Chart
* id
* name
* section_id
* relationships
	* belongs to a section
	* has many seat assignments
	* has one classroom

## Classroom
* id
* width
* height
* Relationships
	* has many desks

## Desk
* id
* row
* column
* classroom_id
* relationships
	* belongs to a classroom
	* has many seat assignments

## Student
* id
* name
* reading_level
* math_level
* gender
* relationships
	* has many sectionings
	* has many sections through sectioning
	* has many seat assignments


## Seat Assignment
* id
* desk_id
* student_id
* seating_chart_id
* relationships
	* belongs to a student
	* belongs to a desk
	* belongs to a seating chart

