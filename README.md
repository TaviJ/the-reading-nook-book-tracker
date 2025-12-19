# The Reading Nook Book Tracker
The Reading Nook is a full-stack book tracking application built with **Node.js, Express, MongoDB, and EJS**.
Users can create an account, manage a private bookshelf, and track their reading progress in a cozy, simple interface.
The app allows users to **add, edit, and delete books**, track **pages read**, assign **reading status**, **leave notes**, and optionally **rate books**.

<img width="1710" height="986" alt="Screenshot" src="file:///Users/millennia/Downloads/Screenshot%202025-12-19%20at%209.37.51%E2%80%AFAM.png" />

## Features
+ User authentication (sign up, sign in, sign out)
+ Private book collection per user
+ Add, edit, view, and delete books
+ Track pages read vs total pages
+ Reading status:
  + Not Started
  + In Progress
  + Completed
+ Optional book ratings (1–5)
+ Optional notes/reflections for each book
+ Delete confirmation page
+ Responsive layout using CSS Flexbox & Grid
+ Cozy, minimal styling

## How to use 
+ Sign up for an account or log in
+ Add a new book to your bookshelf
+ Update pages read to track progress
+ Add notes or reflections while reading
+ Edit or delete books as needed
+ Confirm deletion to prevent mistakes

## App Logic
### Authentication
+ Uses express-session to manage logged-in users
+ Passwords are securely hashed using bcrypt
+ Middleware protects book routes so only logged-in users can access them
### Book Ownership 
+ Users can only view or modify their own books
### CRUD Operation
+ Create: Add a new book
+ Read: View bookshelf and book details
+ Update: Edit book details and reading progress
+ Delete: Confirm deletion before removing a book

## Technologies Used 
+ Node.js
+ Express
+ Mongoose
+ EJS
+ HTML
+ CSS

## Future Improvments
+ Visual progress bars
+ Book cover images
+ Search and filter options
+ Reading goals
+ Mobile-first styling improvements
