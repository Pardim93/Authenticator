# Contributing Guidelines

## Architecture of the codebase

Natura Auth SDK is a monorepo built with `Yarn` and `Lerna`. All the categories of Natura Auth SDK live within the `packages` directory in the root. Each category inside packages has its own `src/` and `package.json`.

#### Packages inside Natura Auth SDK

- [core](./packages/core)

## Steps towards contributions

- To make changes with respect to a specific category, go into `packages/[category]`.
- Make changes to required file.
- Write unit tests
- Yarn build
- Run test suite
- Test in sample app using yarn linking
- Submit a PR

#### Build step:

```
$ yarn build --scope @natura-auth/core
```

#### Testing:

```
$ yarn run test --scope @natura-auth/core
$ yarn run test --scope @natura-auth/core
```

> Note: There is a commit hook that will run the tests prior to committing. Please make sure if you are going to provide a pull request to be sure you include unit tests with your functionality and that all tests pass.

#### Test in a local sample app

**Yarn Linking**

The best way to develop locally and test is to link the individual package you’re working on and run lerna in watch mode.

Run watch mode while editing (core for example):

```
$ npx lerna exec --scope @natura-auth/core yarn link
$ npx lerna exec --scope @natura-auth/core yarn build:esm:watch
```

Or run the whole library in watch mode if you are working on multiple packages

```
$ yarn build # Build the whole library
$ yarn link-all # Make all the packages available to link
$ yarn build:esm:watch # All packages are building ES6 modules in watch mode
```

In you sample project, you can now link specific packages

```
$ yarn link @natura-auth/core
```

These tests are only necessary if you’re looking to contribute a Pull Request. If you’re just playing locally you don’t need them. However if you’re contributing a Pull Request for anything other than bug fixes it would be best to validate that first because depending on the scope of the change.

#### Verdaccio

Verdaccio is a lightweight private npm proxy registry built in Node.js. Install [Verdaccio](https://verdaccio.org/docs/en/installation). You can setup veradaccio to publish packages locally to test the changes.

To publish in Verdaccio, start a verdaccio instance and then,

```
npm set registry http://localhost:4873/
yarn lerna publish --skip-git --force-publish
```

To publish a local version of a specific package,

```
cd packages/<category>
npm publish --registry http://localhost:4873 (http://localhost:4873/)
```

Once you are done with Verdaccio, you can reset to npm registry by doing,

```
npm set registry https://registry.npmjs.com/
```

## GIT

This project is configured with huksy hooks that requires commit to be written following commitlint conventional rules. These rules are used to auto-generate changelogs. To get the expected behavior, your commits should looks like:

```
chore: run tests on travis ci
```

```
fix(server): send cors headers
```

```
feat(blog): add comment section
```

Common types according to [commitlint-config-conventional (based on the the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum) can be:

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test

Take a look at [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) and follow the specified rules.
