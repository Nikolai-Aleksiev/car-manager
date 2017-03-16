import { Observable } from 'rxjs/Rx';

import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { Location } from '@angular/common';

import { Car } from '../model/car-model';

import { CarCrudService } from '../services/car-crud.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    styleUrls: ['./car-edit.styles.css'],
    templateUrl: './car-edit.view.html'
})
export class CarEdit implements OnInit {

    private carCrudService: CarCrudService;
    private editForm: FormGroup;
    private car: Car = new Car();
    @Input() public isNew: boolean = true;

    constructor(
        @Inject(CarCrudService) carCrudServiceFactory: any,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.carCrudService = carCrudServiceFactory();
    }

    ngOnInit(): void {

        this.InitializeForm();

        this.route.params.subscribe(params => {

            if ( params[ 'id' ] ) {

                this.carCrudService.getById(+params['id'])
                    .subscribe(car => {
                        if (car != undefined) {
                            this.car = car;
                            this.isNew = false;
                            this.InitializeForm();
                        }
                    });
            }
        });
    }

    private InitializeForm(): void {
        this.editForm = this.formBuilder.group({
            id: [this.car.id],
            brand: [this.car.brand, Validators.required],
            model: [this.car.model, Validators.required],
            description: [this.car.description],
            registration_number: [this.car.registration_number, Validators.required],
            fuelType: [this.car.fuelType, Validators.required],
            transmission: [this.car.transmission, Validators.required],
        });
    }

    private fuelTypes: Array<string> = ["Petrol", "Diesel", "Electric"];
    private transmissions: Array<string> = ["Manual", "Automatic", "Semi-Automatic"];

    public save(): void {
        this.car = this.editForm.value;

        if ( this.isNew ) {
            this.carCrudService.create(this.car).subscribe( () => this.location.back() );
        }
        else {
            this.carCrudService.update(this.car).subscribe( () => this.location.back() );
        }
        
    }

    public cancel(e): void {
        this.location.back();
    }
}
