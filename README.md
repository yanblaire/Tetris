
# GT-REACT-PYTHON-TEMPLATE

This project is a fullstack application with a **React frontend** and a **Python backend**, orchestrated using **Docker Compose**.

## Project Structure

```
├── README.md                # Main project documentation
├── docker-compose.yml       # Defines services for backend and client
├── azure-pipelines.yml      # Azure DevOps pipeline for CI/CD
├── .env                     # Root environment variables (shared between backend and client)
├── .gitignore               # Git ignore rules for the entire project
├── src
│   └── app
│       ├── backend
│       │   ├── __tests__            # Unit/Integration tests for backend
│       │   ├── README.md            # Backend-specific documentation
│       │   ├── .env                 # Backend-specific environment variables
│       │   ├── Dockerfile           # Docker setup for the backend
│       │   ├── .dockerignore        # Ignore files for backend Docker context
│       │   └── src                  # Source code for the backend
│       │   └── logs/                # Directory for logs, can be mounted to host
│       └── frontend
│           ├── __tests__            # Unit/Integration tests for frontend
│           ├── Dockerfile           # Docker setup for the frontend
│           ├── .env                 # Frontend-specific environment variables
│           ├── .dockerignore        # Ignore files for frontend Docker context
│           ├── src                  # Source code for the frontend
│           ├── public/              # Static files for the frontend
│           └── README.md            # Frontend-specific documentation
```

## Setup Instructions

### Prerequisites

To run this project, ensure you have the following installed:

- **Git** for cloning the repository: [Download Git](https://git-scm.com/downloads)
- **Docker** for container management: [Download Docker](https://www.docker.com/get-started)
- **Docker Compose** for orchestrating multi-container Docker applications: [Docker Compose installation](https://docs.docker.com/compose/install/)

### Downloading the Project

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/goodlandtech/GT-React-Javascript-Template.git
   ```

2. Navigate to the project directory:
   ```bash
   cd GT-React-Javascript-Template
   ```

### Setting up Environment Variables

- **Global `.env` file**: Create a `.env` file in the root directory for shared environment variables between the backend and frontend.
- **Backend `.env` file**: Create a `.env` file in the `src/app/backend` directory for backend-specific environment variables.
- **Frontend `.env` file**: Create a `.env` file in the `src/app/frontend` directory for frontend-specific environment variables.

### Building and Running the Project

1. **Build and run the services** using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

### Technologies Used

- **React** for the frontend
- **Python** (Flask or FastAPI) for the backend
- **Docker Compose** to manage containers

### Azure DevOps CI/CD

This project includes a CI/CD pipeline using **Azure Pipelines**. Configuration is in the `azure-pipelines.yml` file.

