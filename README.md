# Template for

commonjs + ts + eslint project

# Compatible Versions:

### Node

- v19.7.0

### Typescript

- 5.2.2

### ESLint

- 8.48.0

# Initialise project

```bash
npm init
```

# nodemon

- Watches files and restarts the server in case of changes.

## Install

```jsx
npm i nodemon
```

## nodemon.json

- Sample configuration

```json
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/**/node_modules"],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": ["test/fixtures/", "test/samples/"],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "ts,js,json"
}
```

# Typescript

## Install

```bash
npm install --save-dev typescript
```

## Install types

### Express

```bash
npm i --save-dev @types/express
```

### Node

```bash
npm i --save-dev @types/node
```

## tsconfig.json

### moduleDetection

- Will treat separate **js** files as separate modules. Without this it will raise errors like `const x already declared in other files`.

```bash
"moduleDetection": "force",
```

### esModuleInterop

- enabled interoperability of `commonjs` and `es6`.

```bash
"esModuleInterop": true,
```

### outDir

- `outDir` - The folder where compiled JavaScript gets saved, in this case, `dist`. This is a common folder name for this use case.\

```bash
"outDir": "./dist"
```

### include

- The TypeScript compiler will try to compile any TypeScript files ending in `.ts` it finds in the `src`.

```bash
"include": [
    "src/**/*"
  ]
```

### exclude

- Compiler will skip these files

```bash
"exclude": [
    "node_modules",
    "dist",
  ]
```

### declaration

- enable it if project is library project and we want to deliver types with our library

```bash
"declaration": true
```

## package.json

### Change main

```bash
"main": "dist/app.js",
```

### Add scripts

```json
"scripts": {
		"dev": "cross-env NODE_ENV=development nodemon src/app.ts",
		"prod": "cross-env NODE_ENV=production nodemon src/app.ts",
		"build": "tsc",
    "start": "tsc && node .",
		"tsc:setup": "tsc --init",
}
```

# ESLint

## Install

```bash
npm i eslint
```

## Install Types

### Typescript eslint parser

```bash
npm install --save-dev @typescript-eslint/parser
```

### Typescript eslint plugin

```bash
npm install --save-dev @typescript-eslint/eslint-plugin
```

### Typescript plugin for airbnb

```bash
npm install --save-dev eslint-config-airbnb-typescript
```

## Configure eslint

```bash
npm init @eslint/config
```

✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · YAML

## Add Scripts

- Add scripts in `package.json`

```json
"scripts": {
    "lint:setup": "npm init @eslint/config",
    "lint:check": "eslint .",
    "lint:fix": "eslint --fix .",
},
```

## Debug

- check logs in `output` ⇒ `Eslint`

## Changes in .eslintrc

- Add plugin `plugin:@typescript-eslint/recommended`

```yaml
extends:
  - airbnb-base
  - airbnb-typescript/base
  - plugin:security/recommended
  - plugin:import/recommended
  - plugin:@typescript-eslint/recommended
```

- Add parser `@typescript-eslint/parser`

```yaml
parser: "@typescript-eslint/parser"
```

- Add parser options

```yaml
parserOptions:
  ecmaVersion: latest
  project:
    - "./tsconfig.json"
    - "./tsconfig.eslint.json"
```

- Add plugin `@typescript-eslint`

```yaml
plugins:
  - "@typescript-eslint"
```

- Add `*.ts` to files

```yaml
- files:
    - "*.js"
    - "*.mjs"
    - "*.ts"
```

- Disable rule `import/no-import-module-exports`:
  - This rule doesn’t allow mixup of
  - `es6` style **imports** `import { Request, Response } from 'express'` with
  - `commonjs` style **exports** `module.exports = {getCatByIdHandler};`

```bash
import/no-import-module-exports: off
```

- Ignore `dist` folder

```bash
ignorePatterns:
  - dist
```

## tsconfig.eslint.json

- If files are excluded in `tsconfig.json` but included in `eslint.config`, we get error that files is excluded in one config and included in one config.
- We can create `tsconfig.eslint.json` config file for eslint

```bash
{
  "include": [
    "jest/setup/**/*",
    "**/__tests__/*",
    "**/__mocks__/*",
  ]
}
```

# Add pre-commit hook

- Adding this hook ensures that eslint or any other custom script runs before code commit.

## Install husky

- creates a pre-commit hook to run `npm run lint:check`

```bash
npm i -D husky
```

- Install config package
  - creates a `.husky` folder with `git pre-commit hook`

```bash
npx husky-init
```

- Configure `pre-commit` in `.husky` folder

```yaml
npm run lint:check
npm run lint:fix
# npx lint-staged
```

### Add Scripts

- Run this script after `npm i` to setup husky

```json
"scripts": {
    "prepare": "husky install"
  },
```

## Install lint-staged

- adds capability to run `npm run lint:check` only on staged files

```bash
npm i -D lint-staged
```

- create `.lintstagedrc.yml` for configuration

```yaml
"*":
  - npm run lint:check
  - npm run lint:fix
```

# Changes in code

- Typescript is interoperable with **commonjs,** because of property `esModuleInterop` enable in `tsconfig`
- But it is better to replace `require()` and `module.exports` with `es6 syntax`, because IntelliSense doesn’t work with Typescript.
- Change all common js `imports` and `exports` to **es6**, otherwise rule `@typescript-eslint/no-var-requires` will create build issues, unless we turn off this rule.
  - works with imports from `js` files but not from `ts` files
  - Don’t work means issues with TS intellisense and Eslint

## TS Files should have

- import

```bash
const { HTTPStatusCodes } = require('../../constants');

to

import { HTTPStatusCodes } from '../../constants';
```

- export

```bash
module.exports = {
  HTTPStatusCodes,
};

to

export { HTTPStatusCodes }
```

## JS Files can have

- import

```bash
const { HTTPStatusCodes } = require('../../constants');
```

- export

```bash
module.exports = {
  HTTPStatusCodes,
};
```

# Final Configuration

## nodemon.json

```bash
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/**/node_modules"],
  "verbose": true,
  "watch": ["src/"],
  "ext": "js,ts,json"
}
```

## package.json

```bash
{
  "name": "with-commonjs-ts-eslint",
  "version": "1.0.0",
  "description": "template project for express + nodejs + commonjs + ts + eslint",
  "main": "dist/app.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon src/app.ts",
    "prod": "cross-env NODE_ENV=production nodemon src/app.ts",
    "build": "tsc",
    "start": "tsc && node .",
    "tsc:setup": "tsc --init",
    "lint:setup": "npm init @eslint/config",
    "lint:check": "eslint .",
    "lint:fix": "eslint --fix .",
    "test": "jest",
    "prepare": "husky install"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [
    "express",
    "nodejs",
    "dotenv",
    "crossenv",
    "commonjs",
    "typescript",
    "eslint"
  ],
  "author": "deltacap019",
  "license": "ISC",
  "dependencies": {
    "axios": "1.5.0",
    "cross-env": "7.0.3",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "express-async-handler": "1.2.0",
    "joi": "17.10.1",
    "mongoose": "7.5.0",
    "node-cache": "5.1.2"
  },
  "devDependencies": {
    "@types/express": "4.17.17",
    "@types/node": "20.5.9",
    "@typescript-eslint/eslint-plugin": "6.6.0",
    "@typescript-eslint/parser": "6.6.0",
    "eslint": "8.48.0",
    "eslint-config-airbnb-base": "15.0.0",
    "eslint-config-airbnb-typescript": "17.1.0",
    "eslint-plugin-import": "2.28.1",
    "eslint-plugin-security": "1.7.1",
    "husky": "8.0.3",
    "lint-staged": "14.0.1",
    "nodemon": "3.0.1",
    "ts-node": "10.9.1",
    "typescript": "5.2.2"
  }
}
```

## tsconfig.json

```bash
{
  "compilerOptions": {
    "target": "es2016", /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    "moduleDetection": "force", /* Control what method is used to detect module-format JS files. */
    "module": "commonjs", /* Specify what module code is generated. */
    "rootDir": "./src", /* Specify the root folder within your source files. */
    "allowJs": true, /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    "checkJs": true, /* Enable error reporting in type-checked JavaScript files. */
    "outDir": "./dist", /* Specify an output folder for all emitted files. */
    "esModuleInterop": true, /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true, /* Ensure that casing is correct in imports. */
    "strict": true, /* Enable all strict type-checking options. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```

## husky pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint:check
npm run lint:fix
# npx lint-staged
```

# Template

```bash
npx degit "https://github.com/templates-deltacap019/with-commonjs-ts-eslint.git" "my_proj"
```
