# dEKOR - Ecommerce

## ⭐ Star the Repository

If you find this project useful or interesting, please give it a star on GitHub! Your support is greatly appreciated.

## Overview

Welcome to the **dEKOR** repository! This project is built with [Next.js](https://nextjs.org/) and TypeScript. We have set up a continuous integration (CI) pipeline to ensure code quality and consistency. This README will guide you through setting up the project and contributing effectively.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)
4. [Code Quality and Linting](#code-quality-and-linting)
5. [Commit Guidelines](#commit-guidelines)
6. [Contributing](#contributing)
7. [CI/CD Pipeline](#cicd-pipeline)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (>= 20.x)
- Yarn (>= 1.x)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Ayodejioladimeji/dEKOR.git
    cd dEKOR
    ```

2. **Install dependencies:**

    ```bash
    yarn install
    ```

## Running the Project

1. **Start the development server:**

    ```bash
    yarn dev
    ```

2. **Build the project for production:**

    ```bash
    yarn build
    ```

3. **Run the production build:**

    ```bash
    yarn start
    ```

## Code Quality and Linting

We use ESLint and Prettier to maintain code quality and formatting. Husky is used to enforce commit message guidelines.

1. **Run ESLint to check for errors:**

    ```bash
    yarn lint
    ```

2. **Automatically fix fixable ESLint errors:**

    ```bash
    yarn lint:fix
    ```

3. **Run Prettier to format code:**

    ```bash
    yarn format
    ```

## Commit Guidelines

We follow specific commit message guidelines to ensure clear and concise commit history.

- Commit messages should be descriptive and meaningful.
- Each commit should relate to a single task or issue.

Husky will check your commit messages against our guidelines when you try to commit. Make sure your commit message follows the specified format.

## Contributing

We welcome contributions from everyone. To contribute:

1. **Fork the repository:**

    ```bash
    git fork https://github.com/Ayodejioladimeji/dEKOR.git
    ```

2. **Create a new branch:**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make your changes and commit them:**

    ```bash
    git commit -m "Your detailed commit message which should be more than 15 characters, It should start with Capital case and your commit message should end with Fullstop(.)"
    ```

4. **Push to your fork:**

    ```bash
    git push origin feature/your-feature-name
    ```

5. **Create a Pull Request (PR):**

    - Go to the original repository.
    - Click on the "New Pull Request" button.
    - Submit your PR to the Dev Branch.

## CI/CD Pipeline

Our CI/CD pipeline ensures code quality and consistency. The following checks are performed on every push and pull request:

- ESLint: Lints the code to ensure it follows our style guide.
- Prettier: Formats the code.
- Commit Lint: Ensures commit messages follow our guidelines.
- Commit Message Length: Ensures commit messages are more than 20 characters.

## Conclusion

Thank you for contributing to the **dEKOR Ecommerce** repository. If you have any questions or need further assistance, please feel free to reach out.

Happy coding!
