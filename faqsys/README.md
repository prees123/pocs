# Trellis

```
  __________   ________   _______   __        __        __   _______
 |___    ___| |   __   | |   ____| |  |      |  |      |  | |   ____|
     |  |     |  |__|  | |  |__    |  |      |  |      |  | |  |____
     |  |     |   _   _| |   __|   |  |      |  |      |  | |____   |
     |  |     |  | \  \  |  |____  |  |____  |  |____  |  |  ____|  |
     |__|     |__|  \__\ |_______| |_______| |_______| |__| |_______|     (C)Stephanie.Tam
```


![Praxis](https://git.target.com/avatars/u/5724?s=200)

This app is built on [Praxis](https://praxis.target.com/). Praxis is Target's internally-developed kickstarter user interface.

## Setting Up trellis
Use the version of node specified in the `.nvmrc` file.

### Installing Packages

Install [Yarn](https://yarnpkg.com) for package management. Follow the [installation instructions](https://yarnpkg.com/en/docs/install) for your particular operating system.

Install dependencies:

```bash
yarn
```

## NPM Scripts

- `yarn start` Run app locally. Watches for file changes and reloads.
- `yarn test` Run unit tests.
- `yarn test:coverage` Run unit tests and prints test coverage.
- `yarn lint` Lint JavaScript code.
- `yarn build` Build the app in production mode: output optimized HTML, CSS, JS, and images to `build/`.
- `yarn generate` Generate a new component or container with tests, as defined in `generators/`.
- `yarn release` Increment the version, add a tag, and generate a `CHANGELOG.md` based on [commit messages](https://conventionalcommits.org/) using [standard-version](https://github.com/conventional-changelog/standard-version). This should only be performed on `master` that has the latest commits.
