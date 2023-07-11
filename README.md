# Doodle for simple toolkit packages

- Like the vuetify or smth react hooks collection.
- Based on the rollup and custom pre-builder (see pkg-builder to details).
- See pkg-src to get the answer on how to write your code.

## Benefits 

- It builds to MJS, CJS and UMD.
- It builds type declarations (.d.ts) too.
- It supports external packages like a react/vue/smth (change rollup.config.js).
- It has a lightweight pre-builder which is easy to research and rework.
- It has a minimal overhead - most of the work will done by rollup. 

## How it works

- Remember: one file === one export.
- During the building it supports a ```PascalCaseObject``` naming like a class and ```camelCaseFunction```.

### Camel case

- input file: ```pkg-src/recase-it```
- export function (or object): ```export function recaseIt```
- import in another project: ```import { recaseIt } from 'pkg-name/recase-it'``` (or just from 'pkg-name')

### Pascale case

- input file: ```pkg-src/HelloWorld```
- export function (or object): ```export class HelloWorld```
- import in another project: ```import { HelloWorld } from 'pkg-name/HelloWorld'``` (or just from 'pkg-name')

### How to start

- git clone
- delete ./.git folder and reinit with your repository
- change ./LICENSE.md or delete it

- see ./pkg-cmd/build to details:

```ts
const package = PackageSource.create({
  version: GENERIC_PKG.version,
  name: GENERIC_PKG.name,
  repositoryOwner: 'REPOSITORY OWNER', // take an attention 1
  keywords: GENERIC_PKG.keywords,
  description: GENERIC_PKG.description,
  author: 'OWNER NAME <owner.email>', // take an attention 2
  license: 'MIT', // take an attention 3
});
```

- see ./pkg-build/package-source.js to more deep changes
- GENERIC_PKG is your root ./package.json - change it too (like a name, description, keywords, license, author)

## Commands
```json
{ 
  // wrapped commitizen command
  "commit": "git-cz",

  // just a linting (eslint based)
  "lint": "eslint ./",
  
  // just a testing (jest based)
  "test": "jest",
  "test:coverage": "jest --coverage",
  "test:watch": "jest --watch",
  
  // linting and testing commands (quality check)
  "qa": "run-s lint test",
  
  // drop out built artefacts 
  "cleanup": "rimraf dist && mkdir dist",
  
  // build pre-bundles
  "build:indexes": "node pkg-cmd/build.js",
  "build:types": "tsc --project ./tsconfig.build.json",
  "build:commonjs": "yarn babel --verbose --out-dir dist pkg-src -x .ts --ignore '**/*.d.ts','**/*.test.ts'",
  "build:mjs": "cross-env ESMODULES=true yarn build:commonjs --out-file-extension .mjs",

  // build pre-bundles from previous step
  "build:bundles": "rollup -c",
  
  // a full building pipeline
  "build": "run-s cleanup build:indexes build:types build:commonjs build:mjs build:bundles"
}
```