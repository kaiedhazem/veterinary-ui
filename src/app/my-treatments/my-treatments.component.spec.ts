import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTreatmentsComponent } from './my-treatments.component';

describe('MyTreatmentsComponent', () => {
  let component: MyTreatmentsComponent;
  let fixture: ComponentFixture<MyTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
