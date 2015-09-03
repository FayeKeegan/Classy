# Classy

[Heroku link][heroku]

[heroku]: www.classy-classroom.com

## Minimum Viable Product

Classy is an app that helps teachers easily create and manage
seating charts for their classes through a simple graphical
interface. Teachers can easily visualize important student data to
and save multiple seating charts for the same sections and classroom
for later reference and use.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create sessions (log in)
- [X] Create/Edit/Destroy Classrooms
- [X] Create/Edit/Destroy Desks in Classrooms
- [X] Create/Edit/Destroy Students
- [X] Assign/Unassign Students to Sections
- [X] Assign/Unassign Students to Desks (i.e., make seating charts)
- [X] Create/Destroy Sections
- [X] Highlight relevant student data (Reading Level, Math Level)
- [X] Randomly Assign students to desks
- [X] Fix Some Students, Randomly Assign the Rest
- [X] Shuffle Students
- [X] Fix Some Students and Shuffle the rest

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Data Base Schema (~1-2 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. There will be rails models for classrooms, desks, seat assignments,
seating chart, section, secitoning, student and user. There will be rails
controllers for sessions and users.

[Details][phase-one]

### Phase 2: Viewing Classes and Classrooms (~1-2 days)
Database includes rich seed data, and teachers can view their sections, along with
the associated seating charts, and the seat assignmetns associated with those
seating charts. API routes serve section, class and classooom data. Backbone
models for sections, classes, classrooms and students are a created from the
nested JSON data parsed from the API routes. 

[Details][phase-two]

### Phase 3: Creating/Deleting/Editing Seating Charts (~1-2 day)
Create, Destroy and Update routes added to the Seating Chart, Section,
Seat Assignments controller. Users can use drag and drop interface
to edit existing seating charts and create new seating charts, either
through opening existing seating charts and dragging from the student
list, or by dragging students off desks and onto them in the edit view.
Additionally, basic visual improvements made to improve design of app.

[Details][phase-three]

### Phase 4: Creating Classrooms and Sections (~1-2 day)
Implement ability to create and destroy sections, and create, edit
and destroy classrooms. Add relevant forms for creation, and various
modals to warn users when destroying data that will trigger destruction
of dependent data. Implement simple classroom creation interface - users
are able to create new classrooms either in a small modal form, or 
through the larger classroom view.

[Details][phase-four]

### Phase 5: Create, Edit, Destroy, View Students, Classrooms Index (~1 days)
At the end of this phase teachers will be able to destroy and edit students.
Students will be in sortable index page, and users will be able to edit and edit
students from this index. There will also be a classrooms index, so teacher
can view a list of all of their classrooms, with previews.

[Details][phase-five]

### Phase 6: Improve Seating Chart Creation (~1 days)
Seating chart creation will have better visual feedback so teachers
can more easily use the drag-and-drop interface. Teachers will be able to restart
their seating chart from scratch using, shuffle unassigned students and color code
student draggables so teachers can quickly determine math and reading level
mix of various groups.


### Bonus Features (TBD)
- [ ] Seating charts can be auto-generated based on simple algorithm
- [ ] Teachers can auto-generate seating charts basec on custom rules
- [ ] Teachers can place desks at diagonals / not on the grid
- [ ] Teachers can create their own custom categories for students
- [ ] Multiple sessions/session management

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

