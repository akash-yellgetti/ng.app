# NgAppProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


ng new ng-app-project --style=scss --routing=true

----------------------------------------------------
ng g m shared --module=app --routing=true
----------------------------------------------------

ng g m shared/modules/layout --module=app --routing=true
ng generate @angular/material:navigation shared/modules/layout/main
ng generate @angular/material:dashboard shared/modules/layout/dashboard
ng generate @angular/material:tree shared/modules/layout/sidenav

----------------------------------------------------

ng g m shared/modules/material --module=app

ng g s shared/core/services/common/subject/subject

ng g m shared/modules/auth --module=app --routing=true
ng g c shared/modules/auth/login
ng g c shared/modules/auth/register



ng g m shared/modules/admin --module=app --routing=true
ng g c shared/modules/admin/user
ng g c shared/modules/admin/rbac


ng g m shared/modules/FormBuilder --module=app --routing=true
ng g c shared/modules/form-builder/Form
ng g c shared/modules/form-builder/Field
ng g c shared/modules/form-builder/Builder




ng g m shared/modules/accounts --module=app --routing=true
ng g c shared/modules/accounts/ledger
ng g c shared/modules/accounts/voucher


ng g m shared/modules/communication --module=app --routing=true
ng g c shared/modules/communication/email

ng g m shared/modules/tracker --module=app --routing=true
ng g c shared/modules/tracker/visitor

ng g m shared/modules/material --module=app --routing=true



----------------------------------------------------

ng g c shared/components/datatable
ng g c shared/components/search

----------------------------------------------------

ng g m modules/pathology --module=app --routing=true
ng g m modules/market --module=app --routing=true

ng g c modules/market/components/index --module=market
ng g c modules/market/components/stock --module=market

ng g s modules/market/core/services/api/market/market --module=market
----------------------------------------------------