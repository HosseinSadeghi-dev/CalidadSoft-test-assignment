# Test Assignment

This repository contains a project setup for developing and testing modern React applications using Vite, TypeScript, TailwindCSS, Cypress, and ESLint.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Development Workflow](#development-workflow)
- [License](#license)

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- npm or [yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/HosseinSadeghi-dev/CalidadSoft-test-assignment.git
   ```

2. Navigate to the project directory:

   ```bash
   cd test-assignment
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Available Scripts

### Development Server

Run the development server for live preview:

```bash
npm run dev
```

Access the application at [http://localhost:5173](http://localhost:5173).

### Build for Production

Generate a production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check for code quality issues:

```bash
npm run lint
```

### Run Unit Tests

Run Cypress component tests:

```bash
npm run test:unit
```

Open Cypress for interactive testing:

```bash
npm run test:unit:dev
```

### Cypress E2E Tests

Open Cypress for end-to-end testing:

```bash
npm run cypress
```

## Dependencies

### Core Dependencies

- `react`: ^18.0.0
- `react-dom`: ^18.0.0
- `axios`: ^1.7.9

### Development Dependencies

- `vite`: ^5.0.0
- `typescript`: ~5.6.2
- `tailwindcss`: ^3.4.17
- `cypress`: ^13.17.0
- `eslint` and plugins: ^9.18.0

## Development Workflow

1. Start the development server using `npm run dev`.
2. Make changes to your codebase; the application will auto-reload.
3. Run `npm run lint` before committing to ensure code quality.
4. Write and run tests using Cypress for reliable components.
5. Build and preview the application using `npm run build` and `npm run preview`.

## License

This project is private and does not include a license.

---

Feel free to contribute or suggest improvements!
