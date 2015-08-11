# Schema Information
## User
* id
* username
* password_digest
* session_token
* Relationships
    * has many subjects
    * has many classrooms through subjects
    * has many seating charts through classrooms
    * has many sections through subjects
    * has many students through classrooms

## Subject
* name
* teacher_id
* relationships
    * has many sections
    * belongs to a teacher
    * has one classroom

## Classroom
* id
* width
* height
* subject_id

## Section
* id
* name
* subject_id
* Relationships
	* belongs to a subject
	* has many students

## Desk
* id
* row
* column
* classroom_id
* relationships
	* belongs to a classroom

## Student
* id
* name
* section_id
* reading_level
* math_level
* gender
* relationships
	* belongs to a section
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

## Seating Chart
* id
* name
* classroom_id
* relationships
	* belongs to a classroom


