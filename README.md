# Seating App

[Heroku link][heroku]

[heroku]: www.classy-classroom.com

## Minimum Viable Product

Classy is an app that helps teachers easily create and manage
seating charts for their classes through a simple graphical
interface. Teachers can easily visualize important student data to
and save multiple seating charts for the same sections and classroom
for later reference and use.

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create/Edit/Destroy Classrooms
- [ ] Create/Edit/Destroy Desks in Classrooms
- [ ] Create/Edit/Destroy Students
- [ ] Assign/Unassign Students to Sections
- [ ] Assign/Unassign Students to Desks (i.e., make seating charts)
- [ ] Create/Destroy Sections
- [ ] Highlight relevant student data (Reading Level, Math Level)
- [ ] Randomly Assign students to desks
- [ ] Fix Some Students, Randomly Assign the Rest
- [ ] Auto-Assign Students to Seats (randomly, and not-randomly)
- [ ] Fix Some Students and auto-assign the rest

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Seating Chart Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to create classes, 
create class rooms, create students for classrooms, and create seating charts
(i.e., assign students to desks). The goal is to make sure that core funcionality
is working properly, and that everything is pushed to heroku.

[Details][phase-one]

### Phase 2: Creating Classes and Classrooms (~1 days)
I will add API routes to serve class and classroom data as JSON, then add
Backbone models and collections that fetch data from these routes. By the end
of this phase, users will be able to create classes and classrooms (i.e.,
place desks in a room) all in the backbone app. 

[Details][phase-two]

### Phase 3: Creating Students, Seat Assignments and Seating Charts (~2 days)
I will add API routes to serve student, seat assignment, and seating chart
data as JSON, then addBackbone models and collections that fetch data from
these routes. By the end of this phase, users will be able to create classes,
classrooms, add students to the classes and assign them to desks. They will
be able to save their seating charts.

[Details][phase-three]

### Phase 4: Editing and Deleting Seating Charts (~1-2 days)
After completion of this phase, teachers will be able to edit and delete
their seating charts. Teachers will be to easily visualize important student
data (reading level, math level) while editing and viewing seating charts. 

[Details][phase-four]

### Phase 5: Auto-assignment / Shuffle (~2 days)
At the end of this phase teachers will be able to destroy and edit classrooms and
students. Seating chart creation will have better visual feedback so teachers
can more easily user the drag-and-drop interface. Teachers will be able to restart
their seating chart from scratch, and shuffle unassigned students to be seated
randomly. Student table will be sortable.

[Details][phase-five]

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

