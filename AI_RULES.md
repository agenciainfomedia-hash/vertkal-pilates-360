# AI Rules for Vertkal Pilates 360 Application

This document outlines the core technologies used in the Vertkal Pilates 360 application and provides clear guidelines for using specific libraries and frameworks.

## Tech Stack Description

The application is built using a modern web development stack, focusing on performance, maintainability, and a rich user experience.

*   **React**: A declarative, component-based JavaScript library for building dynamic user interfaces.
*   **TypeScript**: A superset of JavaScript that adds static typing, improving code quality, readability, and developer productivity.
*   **Tailwind CSS**: A utility-first CSS framework that enables rapid UI development with highly customizable designs directly in your markup.
*   **shadcn/ui**: A collection of beautifully designed, re-usable UI components built on top of Radix UI and styled with Tailwind CSS.
*   **Framer Motion**: A powerful and easy-to-use animation library for React, providing smooth and interactive UI transitions.
*   **Lucide React**: A comprehensive icon library offering a wide range of customizable vector icons.
*   **React Router**: A standard library for routing in React applications, enabling navigation between different views.
*   **Vite**: A next-generation frontend tooling that provides an extremely fast development experience with instant server start and hot module replacement.
*   **Capacitor**: A cross-platform native runtime that allows web applications to run seamlessly on iOS, Android, and desktop as native apps.

## Library Usage Rules

To maintain consistency and leverage the strengths of each library, please adhere to the following rules:

*   **Styling**: Always use **Tailwind CSS** for all styling. Prioritize utility classes for layout, spacing, colors, and responsiveness. Avoid writing custom CSS unless absolutely necessary.
*   **UI Components**:
    *   Utilize **shadcn/ui** components for common UI elements such as `Button`, `Card`, `Tabs`, `Progress`, `Input`, `Tooltip`, and `Badge`.
    *   If a shadcn component requires customization beyond what its props allow, create a new component that wraps or extends it. **Do not modify the original shadcn source files.**
*   **Icons**: Use **Lucide React** for all icons throughout the application.
*   **Animations**: Implement all UI animations and transitions using **Framer Motion**.
*   **Routing**: Use **React Router** for managing application navigation. All top-level routes should be defined within `src/App.tsx`.
*   **State Management**: For local component state, rely on React's built-in `useState` and `useEffect` hooks. Avoid introducing external state management libraries unless a clear need arises and is explicitly approved.
*   **Project Structure**:
    *   Application pages should be located in `src/pages/`.
    *   Reusable UI components should reside in `src/components/`.
    *   Utility functions, constants, and data definitions should be placed in `src/lib/`.
    *   **Always create a new file for every new component or hook**, no matter how small. Avoid adding new components to existing files.
*   **Responsiveness**: All designs must be responsive and adapt gracefully to various screen sizes, following a mobile-first approach.
*   **Error Handling**: Do not implement `try/catch` blocks for error handling unless specifically requested. Allow errors to bubble up for centralized debugging and reporting.
*   **Simplicity and Completeness**: Prioritize simple, elegant solutions. Avoid over-engineering. All code changes must be fully functional and complete; do not leave partial implementations or `TODO` comments.