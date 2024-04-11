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


---

## Deployment

Instructions on how to deploy the application on a live system, such as Heroku:

### Heroku Setup

1. **Install the Heroku CLI**: Ensure you have the Heroku Command Line Interface (CLI) installed on your system. You can download it from [Heroku's website](https://devcenter.heroku.com/articles/heroku-cli).

2. **Login to Heroku**: Open your terminal and log in to Heroku using the command `heroku login`. This opens your web browser to log in to your Heroku account.

### Create a Heroku App

- Execute `heroku create` to create a new app on Heroku. This command outputs the web URL for your application and a Git URL. Note down the web URL, as you'll need it to access your deployed application.

### Set Up Environment Variables

- Set any necessary environment variables on Heroku using the command `heroku config:set VAR_NAME=value`. For each environment variable required by your application, repeat this command with the appropriate `VAR_NAME` and `value`. For example:

```bash
heroku config:set REACT_APP_API_URL=https://your-api-url.com
```

### Configure Buildpacks

- Depending on your application's stack, you may need to specify one or more buildpacks. Heroku uses buildpacks to determine how to build and run your application.
  - For a **Node.js** application, set the Node.js buildpack:
```bash
heroku buildpacks:set heroku/nodejs
```
  - For applications that require **multiple languages** (e.g., a React frontend and a Python Flask backend), add buildpacks in the order they should be executed:
```bash
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
```

### Deploy Your Application

- **Deploy your application** by pushing your code to the Heroku remote. If your main branch is named `main`, use:
```bash
git push heroku main
```

Replace main with the name of your branch if using a different branch name.  
- Monitor the deployment process by viewing the logs with:
```bash
heroku logs --tail
```

### Access Your Deployed Application
- Once deployed, access your application through the web URL provided by Heroku. You can also open your app directly from the CLI with:
```bash
heroku open
```

### Additional Considerations
- Database Setup: If your application uses a database, make sure to provision and configure the appropriate add-on in Heroku.

- Custom Domain: Configure a custom domain via the Heroku dashboard or CLI if required.

- Performance and Scaling: Monitor your application's performance. Scale dynos as needed to handle the load efficiently.