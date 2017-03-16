import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControlDirective } from '@angular/forms';
import { RouterModule, Router, Routes, Route } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns'; 

import { AppComponent } from './app.component';
import { CarList } from './car/list/car-list.component';
import { CarEdit }  from './car/edit/car-edit.component';
import { CarCrudService } from './car/services/car-crud.service';

import { AsyncLocalStorageModule, AsyncLocalStorage } from 'angular-async-local-storage';

const routes = [
  {
    path: '',
    component: CarList
  },
  {
    path: 'create',
    component: CarEdit
  },
    {
    path: 'edit/:id',
    component: CarEdit
  }
];


@NgModule({
  declarations: [
    AppComponent, 
    CarEdit,
    CarList,  
  ],   
  imports: [ 
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    GridModule,
    DialogModule.forRoot(),
    DropDownsModule,
    AsyncLocalStorageModule,
    NgbModule.forRoot(),
  ],
  providers: [
    {
            deps: [AsyncLocalStorage],
            provide: CarCrudService,
            useFactory: (storage: AsyncLocalStorage) => () => new CarCrudService(storage)
        }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
