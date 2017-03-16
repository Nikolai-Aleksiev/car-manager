import { TestBed, async } from '@angular/core/testing';

import { CarList } from './car-list.component';

describe('CarList', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CarList
      ],
    }).compileComponents();
  }));

  it('should create the car list component', async(() => {
    const fixture = TestBed.createComponent(CarList);
    const carList = fixture.debugElement.componentInstance;
    expect(carList).toBeTruthy();
  }));


});
