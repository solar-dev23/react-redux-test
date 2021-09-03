# React Redux Test

## Coding Guidelines

- Airbnb Code Style: <https://github.com/airbnb/javascript>

## Used Libraries & Tools

### Styling

- CSS Modules

### Router

<https://reactrouter.com/>
Pages are defined within each feature

### Testing

#### react-testing-library

<https://testing-library.com/react>
<https://codesandbox.io/s/github/kentcdodds/react-testing-library-examples>

### VSC Extensions

- Prettier
- ESLint
- stylelint
- Debugger for Chrome

## Structure

### Generator

Run `yarn generate:component <name>` or `yarn generate:page <name>` to create scaffold structure for a new component. Use `-p src/features/<path>` to specify folder where the new component should be created.
Afterwards run `yarn lint:fix`, to have the files conform to our lint rules.

### Features

A feature is a self containing module (which should be easy to extract into a separate npm module). It should contain most of its dependencies, like:

- Ui Component
- State management (in case of redux all store definitions, actions and reducers)
- CSS Style
- Tests

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
