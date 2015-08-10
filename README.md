# Flux-capacitr

[Heroku link][heroku]

[heroku]: //no_heroku_link_yet

## Minimum Viable Product

SeatingApp is an app that helps teachers quickly create seating charts
for their classes, through both a simple graphical interface and auto
generation of seating charts based on basic students data. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create Classes
- [ ] Create Classrooms
- [ ] Create Students in Classes
- [ ] Assign Students to Desks (i.e., make Seating Charts)
- [ ] Save Seating Charts
- [ ] Edit Seating Charts
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
Teachers will be able to edit, delete and manage their seating charts from
their MyCharts page.

[Details][phase-four]

### Phase 5: Auto-assignment / Shuffle (~2 days)
Implement Auto-Assignment of Students based on very simple algorithm, implement
randomized seat assgnment. Allow teacherst to manually assign certain student
to certain desks and then auto seat the rest.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Teachers can tweak Auto-assignment based on preferences
- [ ] Teachers can add photos of students
- [ ] Teachers can place desks at diagonals / not on the grid
- [ ] Teachers can input pairs of studetns who should and shouldnt sit together
- [ ] App can generate multiple seating charts and score them
- [ ] Teachers can create their own custom categories
- [ ] Multiple sessions/session management

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md

