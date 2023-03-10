import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetCalendarComponent } from './pet-calendar.component';

describe('PetCalendarComponent', () => {
  let component: PetCalendarComponent;
  let fixture: ComponentFixture<PetCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
