# Health Food Recipe Finder

## Overview

Health Food Recipe Finder is a React application that allows users to search for food ingredients, view recipe results, and manage a list of favourite items. The project focuses on demonstrating React fundamentals, modern hook usage, performance optimization, and clean component architecture.

This application integrates with a real external API and persists user data locally, closely reflecting real-world frontend development scenarios.

## Key Features

- Ingredient-based recipe search using an external API
- Add and remove recipes from a favourites list
- Persist favourites using browser localStorage
- Filter favourites in real time
- Light and dark theme support
- Responsive layout for different screen sizes
- Loading and empty-state handling

## React Concepts Demonstrated

### React Hooks

- useState for managing local component state
- useEffect for handling side effects and lifecycle behavior
- useReducer for predictable and scalable state updates
- useCallback to memoize functions and prevent unnecessary re-renders
- useMemo to optimize rendering of recipe lists

### Performance Optimization

- Memoized callbacks to avoid function recreation on re-render
- Memoized list rendering to improve performance
- Careful dependency management to satisfy React hook rules

## State Management

- Local UI state handled with useState
- Filtering logic managed with useReducer
- Persistent state stored and retrieved from localStorage
- Clear data flow via props and callbacks between components

## Application Structure

Diagram of the project structure:

src
│
├── components
│ ├── searches
│ ├── recipe-item
│ └── favourite-item
│
├── pages
│ └── home.jsx
│
├── App.js
├── index.js
└── styles

This structure separates pages from reusable UI components and keeps logic modular and maintainable.

## API Integration

- Data fetched from the Spoonacular API
- Asynchronous requests handled using async and await
- Loading, success, and error states handled explicitly
- API responses parsed and mapped to UI components

## Styling and Layout

- Layout built using CSS Flexbox
- Responsive behavior implemented with media queries
- Theme-based styling controlled through CSS classes
- Focus on spacing, readability, and clean UI design

## Testing Setup

- Project configured with React Testing Library
- Ready for component and integration testing
- Emphasis on testing rendered output and user behavior

## Technology Stack

React
JavaScript ES6+
CSS3
Fetch API
LocalStorage
React Testing Library

## Running the Project Locally

Clone the repository and install dependencies:

git clone https://github.com/SakSal-tech/health-food-app.git
cd health-food-app
npm install
npm start

## Learning Context

This project was built as part of guided learning using tutorials and documentation. While the original idea was not mine, the implementation reflects my understanding of React concepts, architectural decisions, and best practices.

The codebase demonstrates my ability to take instructional material and apply it independently, extend it, debug issues, and structure a complete working application.

## Author

I originally built it during a learning phase last year and later revisited it to improve structure, performance, and clarity. I like refining projects once I fully understand the concepts.

This project was built as part of guided learning using tutorials and documentation.
While the original idea was not mine, the implementation reflects my understanding
of React concepts, architectural decisions, and best practices.
