# GraphiQL App

## Overview
The GraphiQL App is a web application that allows users to interact with both RESTful and GraphQL APIs. It provides a versatile API client where users can make API requests (GET, POST, etc.), view responses, and explore GraphQL documentation using a user-friendly interface.

## Features include:
- RESTful client with method selector, endpoint input, request body editor, and response viewer.
- GraphiQL client to interact with GraphQL APIs and explore schema definitions.
- User authentication with Firebase (email/password).
- History feature to store and revisit previous requests.
- Multi-language support (English and another language of your choice).
- Responsive and interactive UI with smooth animations.

# Technologies Used

## Backend & Frameworks
- **Next.js** (v14.2.5) for server-side rendering and routing.
- **Firebase** for authentication (email/password sign-in).
- **GraphQL** for API interaction.

## Frontend Libraries & UI
- **React** (v18) for UI components and state management.
- **Material UI** (`@mui/material`) for the design system and components.
- **React Redux** for global state management.
- **React Hook Form** for form handling.
- **Codemirror** for syntax highlighting in editors.

## Styling & Design
- **Tailwind CSS** for utility-first styling.
- **Sass** for pre-processing CSS.
- **Prettier** & **ESLint** for code formatting and linting.
- **PostCSS** for additional CSS optimizations.

## Internationalization (i18n)
- **i18next** and **next-i18next** for multi-language support.

## Testing & CI
- **Jest** and **React Testing Library** for unit and integration testing.
- **Husky** for git hooks (lint on pre-commit, test on pre-push).

## Other Tools
- **GraphiQL** for GraphQL API interaction and documentation.
- **Yup** for schema validation.
- **Redux Toolkit** for simplified Redux integration.
- **@trivago/prettier-plugin-sort-imports** for import organization.

## Deployment
You can access the deployed app here: [GraphiQL App](https://graphiql-app-nu-smoky.vercel.app/en)
