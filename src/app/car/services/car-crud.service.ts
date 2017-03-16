import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Car } from '../model/car-model';

@Injectable()
export class CarCrudService extends BehaviorSubject<any[]> {

    constructor(protected storage: AsyncLocalStorage) {
        super([]);
    }

    private data: any[] = [];

    public getById(id: number) {

        return this.storage.getItem('cars')
        .map(response => JSON.parse(response))
        .map(result => {
            return result.filter(x => x.id == id)[0];
        });
    }

    public read() {
        if (this.data.length) {
            super.next(this.data);
            return this.data.length;
        }

        this.fetch()
            .do(data => this.data = data)
            .subscribe(data => {
                super.next(data);
                return this.data.length;
            });
    }

    public create(item: any) {
        return this.storage.getItem('cars').flatMap(result => {

            let items: Array<any> = JSON.parse(result);

            let nextId = 1;

            if (items.length > 0) {
                nextId = items[items.length - 1].id + 1;
            }

            item.id = nextId;

            items.push(item);

            return this.persist(items);

        });
    }

    public update(item: any) {
        return this.storage.getItem('cars').flatMap(result => {

            let items: Array<any> = JSON.parse(result);

            items.forEach(function (currentItem, index) {
                if (currentItem.id == item.id) {
                    items[index] = item;
                }
            });

            return this.persist(items);

        });
    }

    public delete(id: number) {
         this.storage.getItem('cars').subscribe(result => {

            let items: Array<any> = JSON.parse(result);

            items.forEach(function (currentItem, index) {
                if (currentItem.id == id) {
                    items.splice(index, 1);
                }
            });

            this.persist(items).subscribe(() => this.read(), () => this.read());

        });
    }

    private persist(items) {

        this.data = [];

        return this.storage.setItem('cars', JSON.stringify(items));
    }

    private fetch(): Observable<any[]> {
        return this.storage.getItem('cars').map(response => JSON.parse(response));
    }
}
