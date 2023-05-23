import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstituteComponent } from './add-institute.component';

describe('AddInstituteComponent', () => {
  let component: AddInstituteComponent;
  let fixture: ComponentFixture<AddInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
