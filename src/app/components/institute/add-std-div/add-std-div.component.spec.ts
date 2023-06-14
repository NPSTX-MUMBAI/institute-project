import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStdDivComponent } from './add-std-div.component';

describe('AddStdDivComponent', () => {
  let component: AddStdDivComponent;
  let fixture: ComponentFixture<AddStdDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStdDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStdDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
