# Schema Information
## Teacher
* id
* username
* password_digest
* session_token
* Relationships
    * has many classes
    * has many classrooms through classes
    * has many students through classes

## Class
* name
* teacher_id
* relationships
    * has many students
    * belongs to a teacher
    * has one classroom

## Classroom
* id
* width
* height
* class_id

## Desk
* id
* row
* column
* classroom_id## followings

## Student
* id
* class_id
* name
* reading level
* math level
* language background
* gender

## Seat Assignment
* id
* desk_id
* student_id
* seating_chart_id

## Seating Chart
* id
* name
* classroom_id

