# cmpt-276 BGC Coursys
GitLab link: https://csil-git1.cs.surrey.sfu.ca/mla283/cmpt-276-bgcoursys


## Abstract:

BGC Engineering is seeking to streamline and modernize their employee-training system. The BGC Coursys system will replace the old system of manual mail-lists, reminders, and Excel spreadsheets. There are two types of users: attendees (employees) and organizers (BGC-internal course organizers and those who coordinate with external sources). Organizers will be able to create and schedule course offerings and create groups of attendees. Attendees will be able to search courses and create “tags” that indicate what areas they seek training in. All users can sign up for courses and indicate “Interested” status on specific courses. All users will be able to view a calendar of courses, where they can filter by courses or interest tags and can export the calendar for use elsewhere. Courses will have an attendance limit; registration will be tracked in real-time, so once that limit is reached attendees will be put on a wait-list or given future priority enrollment for another iteration of the course. Notifications will be sent out to attendees for RSVP (confirming attendance) and when their wait-list status changes. If time/effort permits, the BGC Coursys system will be integrated with BGC Engineering’s internal SharePoint service.

## Current Process: 

BGC has a group of 20+ employees organizing and setting up the employee training events. Currently the company has an excel file on SharePoint to communicate between the organizers, and to keep track of all the event schedules and details. The organizers would look at the excel file, determine the next upcoming event, and manually send out email invites to employees. Seating for the events are first come, first serve and the organizers keep track of the number of people signed up in the excel file on SharePoint. Once all the spots are filled, they respond back to the emails confirming if each individual was registered or not registered in the course. There are currently no processes set up to track employees' interest in the courses. 

## Improvements:

By implementing this system, it will reduce the time needed to track employee interests and attendance. The process of keeping track of people will be less prone to human error, such as people forgetting who registered. Moreover, this system can be scaled to handle other categories of recurring events (such as employee fun events).

## User Stories

### Login

Users must log in to see events.

On the login screen, I should see an option to log in as an “Attendee” (regular user) or an “Organizer” (course organizer).

On the login screen, I should be able to enter a username/email and a bullet-protected password.

If login is unsuccessful, I should receive an alert saying that my credentials are incorrect. If login is successful, I should be directed to a landing page based on my user type. If I am not logged in, I should be redirected to the login screen when I try to access a protected (requires login) page

### Signup 
A page with the list of courses offered. Users should be able to view courses as a list or a calendar.
When a course is clicked on there should be a page with information about it and a sign up and interested button.
Upon clicking interested the user will be added to a list of interested people that is able to be viewed by the organizer. The system will remember that the user is interested for the future
If users are currently signed up or marked as interested, the sign up and interested buttons should be switched to unenroll and not interested respectively. Clicking on those buttons removes the user from the respective lists
Upon clicking the sign up button there are two cases. If the  course is full, the user gets alert and is asked if they would like to be added to a waitlist. If the course is not full, the user will get an alert to signify they have successfully signed up
On the course page there should be the ability to see how many users signed up for each course 

### Cancellation 

If a user who is signed up for a course is no longer interested, they have the ability to take themselves out of the course.
Users will be prompted to confirm before they cancel (drop) the course.
When a user cancels, a spot in the course will be opened and the number of participants will be updated in real time.
If there are users on the waitlist, the user in waitlist position #1 will be automatically registered into the course.
A confirmation will be sent to the user taken off the waitlist to alert them that they are now enrolled in the course.

### Reminders
If a user is registered in a course, then the system will send periodic reminders (such as by email) to remind them.
If a user is on the waitlist and is moved to regular registration, then the system will let them know that the change was made.
If the size of a class is changed by an organizer and the amount of registered users exceeds that of the new maximum attendance, then the users who signed up most recently will be moved onto the wait-list and notified accordingly.

### Tags
On the signup page, users can filter through courses by “tags” such as “Time Management”, “Leadership” etc.
Every course will have at least one associated tag. Attempting to create a new course (as an organizer) without a tag will show an error.

### Courses Overview

A list of all courses is displayed. Each entry contains a link to the course details page.

On the list of all courses, the number of registered attendees and the number of total seats is shown.

On the list of all courses, the number of interested participants is shown.

There is an option to filter by tags (select a tag, and only courses with that tag will be displayed).

### Course Details Page

The course title is clearly visible and near the top of the page.

Below the course title, users can view a short description of the course; the date/time where the course will be held; and the location of the course.

Below the course description/details, a list of all registered attendees names and their email addresses is shown.

Below the registered attendees, a list of all interested attendees names and their email addresses is shown.

Below the interested attendees, a list of all waitlisted (did not register as no space was available) attendees name and email addresses 
