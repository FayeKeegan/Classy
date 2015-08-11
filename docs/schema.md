# Schema Information
## Teacher
* id
* username
* password_digest
* session_token
* Relationships
    * has many classes
    * has many classrooms through classes
    * has many seating charts through classrooms
    * has many sections through classes
    * has many students through sections

## Class
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
* class_id

## Section
* id
* name
* class_id
* Relationships
	* belongs to a class
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
* section_id
* name
* reading level
* math level
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


