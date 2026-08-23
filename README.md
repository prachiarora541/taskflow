# TaskFlow

TaskFlow is a React productivity dashboard for turning a list of tasks into a visible workflow: **To do -> In progress -> Completed**. It is a frontend-only BTech project demonstrating React fundamentals, hooks, routing, localStorage, CSS Grid/Flexbox, and HTML5 drag and drop.

## Features

- Create, edit, view, and delete tasks
- Drag tasks across three Kanban stages
- Search, combine filters, and sort tasks
- Priority, category, due date, and tags
- Progress percentage, analytics, and category/priority charts
- Light and dark themes persisted in localStorage
- Separate login/signup pages with frontend validation and protected routes
- Global navigation, profile dropdown, editable profile, history-aware Back buttons, and mobile menu
- Frontend session management with inactivity expiry and automatic legacy-session migration
- Responsive mobile, tablet, and desktop layout

## Technologies

React, Vite, React Router, Lucide React, JavaScript ES6+, CSS, HTML5 Drag and Drop, and localStorage.

## Installation

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. Create an account at `/signup`, then use those credentials at `/login`. Authentication and sessions are intentionally frontend demos only: account data and a 30-minute inactivity session are stored in localStorage and are not secure. User activity refreshes the session, logout clears it, and expired sessions return to `/login`.

Production build:

```bash
npm run build
npm run preview
```

## Project structure

- `src/App.jsx` - routes, lifted task state, reusable UI components, and workflow logic
- `src/App.css` - responsive design system, themes, cards, animations, and layout
- `src/hooks/useLocalStorage.js` - reusable JSON persistence hook
- `src/index.css` - document-level reset and focus styles

## GitHub

```bash
git init
git add .
git commit -m "Build TaskFlow productivity dashboard"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/taskflow.git
git push -u origin main
```

## Vercel deployment

Import the repository into Vercel, keep the framework as Vite, and deploy. For browser routes on a static host, add a rewrite from `/(.*)` to `/index.html` in the Vercel project settings if direct navigation to a nested route needs support.

## Project report

### Title
TaskFlow: A React-Based Task Workflow Management Dashboard

### Abstract
TaskFlow is a browser-based task management application designed to help students organize academic, personal, and project responsibilities. Unlike a basic checklist, it represents work as a workflow that can be moved from To do to In progress and finally Completed. The application combines search, filters, priorities, analytics, themes, persistence, and responsive design in one interface.

### Introduction and problem statement
Students often keep tasks in disconnected notes and lose visibility into what is pending or actively being worked on. A plain checklist also does not communicate progress clearly. TaskFlow addresses this problem by providing a visual Kanban workflow that makes task state and completion progress immediately understandable.

### Objectives and proposed solution
The objectives are to create and manage tasks, make progress visible, support quick discovery with search and filters, and preserve data between sessions. React components and state manage the interface, HTML5 drag and drop changes status, and localStorage preserves tasks and theme preferences.

### Features
Task CRUD, drag and drop, status and priority filters, categories, tags, due dates, sorting, analytics, dark mode, protected demo routes, responsive layout, validation, and animated feedback.

### Requirements
Functional requirements include login, task creation, editing, deletion, movement, search, sorting, analytics, settings, and persistence. Non-functional requirements include usability, accessibility basics, responsive behavior, maintainable components, readable styling, and fast browser-only operation.

### System design
The user interacts with pages through React Router. Dashboard owns task state and lifts it above TaskColumn and TaskCard. Controlled form inputs send task data upward. Derived statistics and filtered lists are calculated with `useMemo`. `useLocalStorage` serializes state with `JSON.stringify` and restores it with `JSON.parse`.

### React concepts used
JSX, components, props, state, conditional rendering, list rendering, events, `useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, custom hooks, lifting state, controlled components, modules, and dynamic routes.

### Future scope and conclusion
Future versions could add a real backend, user accounts, calendar sync, reminders, collaboration, and cloud synchronization. TaskFlow demonstrates that a student-focused tool can remain understandable while still offering a realistic workflow and polished interaction model.

## Viva questions and short answers

1. **Why React?** React makes interactive interfaces from reusable components and updates only the necessary UI.
2. **What is JSX?** JSX is syntax that lets us write UI-like markup inside JavaScript.
3. **What are components?** Components are reusable JavaScript functions that return UI.
4. **Props vs state?** Props come from a parent; state belongs to a component and can change.
5. **What is useState?** It adds reactive state to a function component.
6. **What is useEffect?** It runs side effects such as persistence or data loading after render.
7. **Why useRef?** The form uses it to hold a DOM reference for focusing the title field.
8. **Why useMemo?** It caches derived statistics and filtered lists until their inputs change.
9. **Why useCallback?** It keeps task operation function references stable when passed to child components.
10. **What is a custom hook?** A reusable function containing hook-based logic, such as localStorage handling.
11. **What is prop drilling?** Passing props through components that do not directly need them.
12. **What is lifting state?** Moving shared state to the closest common parent.
13. **What are controlled components?** Form fields whose values are controlled by React state.
14. **What is localStorage?** Browser storage that persists string values across refreshes.
15. **What is JSON?** A text format used to represent structured data.
16. **What is React Router?** A library that maps URLs to React views without full page reloads.
17. **What is a dynamic route?** A route with a variable segment, such as `/tasks/:id`.
18. **What is a protected route?** A route that checks login state before rendering.
19. **How does drag and drop work?** The card writes its id to `dataTransfer`; the destination reads it and updates status.
20. **How does filtering work?** `filter()` creates a new array matching search and selected criteria.
21. **How does sorting work?** A copied derived array uses `sort()` based on date or priority.
22. **Why use Grid and Flexbox?** Grid handles two-dimensional page layouts; Flexbox aligns items in one direction.
23. **How are tasks stored?** React state is serialized to localStorage and restored when the app loads.
24. **Why should state not be mutated?** New arrays and objects let React detect changes predictably.
25. **What is responsive design?** Layout rules adapt to screen size using flexible units and media queries.
26. **What is event handling?** React functions respond to user actions such as clicks, input, drag, and drop.
27. **What is frontend authentication here?** A demo boolean in localStorage, not secure server authentication.

## Two-minute explanation

TaskFlow is my React-based task workflow application for managing study, project, and personal work. I created it because a normal checklist tells me what exists, but it does not show what I should work on right now. In TaskFlow, every task begins in To do, can be dragged into In progress, and then moved into Completed. This makes my workflow visible and also updates the progress percentage immediately.

The application includes a dashboard, search, combined filters, sorting, priorities, categories, tags, due dates, task details, analytics, settings, dark mode, and a responsive layout. I used React components such as TaskCard and TaskColumn so the interface is reusable. The Dashboard owns the shared task state, which demonstrates lifting state, while the add and edit form uses controlled inputs. I used useEffect for loading and saving, useMemo for derived statistics and filtering, useCallback for stable task handlers, and useRef for form focus.

Tasks start in an empty workspace and are saved in localStorage so they remain after refresh. React Router handles the pages and the protected dashboard route checks demo login state. I used CSS variables, Grid, Flexbox, media queries, transitions, and keyframe animations to make the interface responsive and polished. In the future I would add a backend, real authentication, reminders, calendar integration, and collaboration.
