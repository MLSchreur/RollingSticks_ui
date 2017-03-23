# Rollingsticks

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
Run `ng serve --open` for a dev server and to automatically open `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

#### Adding ng2-bootstrap
 
 - install `ng2-bootstrap` and `bootstrap`

 ```bash
   npm install ng2-bootstrap bootstrap --save
 ```
 
- open `src/app/app.module.ts` and add

```typescript
import { AlertModule } from 'ng2-bootstrap';
...

@NgModule({
   ...
   imports: [AlertModule.forRoot(), ... ],
    ... 
})
```

- open `.angular-cli.json` and insert a new entry into the styles array 

```json
      "styles": [
         "../node_modules/bootstrap/dist/css/bootstrap.min.css",
        "styles.css",
      ],
```

- open `src/app/app.component.html` and add
```
<alert type="success">hello</alert>
```