import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetInformationComponent } from './pet-information.component';

describe('PetInformationComponent', () => {
  let component: PetInformationComponent;
  let fixture: ComponentFixture<PetInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
