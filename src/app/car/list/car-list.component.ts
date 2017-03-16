import { Observable } from 'rxjs/Rx';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { Car } from '../model/car-model';
import { CarCrudService } from '../services/car-crud.service';
import { Router } from '@angular/router';


@Component({
    templateUrl: './car-list.view.html'
})
export class CarList implements OnInit {

    @Input() public total: number = 12;

    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10,
    };


    private carCrudService: CarCrudService;

    constructor( @Inject(CarCrudService) carCrudServiceFactory: any,
        private router: Router, private dialogService: DialogService) {
        this.carCrudService = carCrudServiceFactory();
    }

    public ngOnInit(): void {
        this.view = this.carCrudService.map(data => process(data, this.gridState));
        this.total = this.carCrudService.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;
        this.total = this.carCrudService.read();
    }

    public add() {
        this.router.navigate(['/create']);
    }

    public edit({ dataItem }) {
        this.router.navigate(['/edit', dataItem.id]);
    }

    public delete({ dataItem }) {

        const dialog: DialogRef = this.dialogService.open({
            title: "Please confirm",
            content: "Are you sure?",
            actions: [
                { text: "No" },
                { text: "Yes", primary: true }
            ]
        });

        dialog.result.subscribe((answer: any) => {
            if (answer.text == 'Yes') {
                this.carCrudService.delete(dataItem.id);
            }
        });
    }

}
