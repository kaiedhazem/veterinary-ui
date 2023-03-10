import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPetComponent } from './add-new-pet.component';

describe('AddNewPetComponent', () => {
  let component: AddNewPetComponent;
  let fixture: ComponentFixture<AddNewPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
