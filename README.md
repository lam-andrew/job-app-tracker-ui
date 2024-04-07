# job-app-tracker-ui

The frontend UI for the job application status tracker, built with React. It provides a user-friendly interface for tracking job application statuses.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

- Node.js (v14.0.0 or higher recommended)
- npm

### Installation

1. **Clone the repository**:

```
git clone https://github.com/lam-andrew/job-app-tracker-ui.git
cd job-app-tracker-ui
```

2. **Install NPM packages**:

```
npm install
```

### Configuration

Create a `.env` file in the root of the frontend project and define the following environment variables:

- `REACT_APP_BACKEND_URL`: The URL of the backend API (e.g., `http://localhost:5000`).

Example:

```
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Running the Application

In the project directory, you can run:

- **`npm start`**: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will automatically reload if you make edits.

- **`npm test`**: Launches the test runner in the interactive watch mode.

- **`npm run build`**: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Built With

- [Create React App](https://github.com/facebook/create-react-app) - The web framework used
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js

---

## NOTES:
#### CORS Issues
- if the `.env` file has e.g. `REACT_APP_BACKEND_ENDPOINT=http://localhost:5000` instead of `REACT_APP_BACKEND_ENDPOINT=http://127.0.0.1:5000` it may cause a CORS error