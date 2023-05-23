import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKycComponent } from './add-kyc.component';

describe('AddKycComponent', () => {
  let component: AddKycComponent;
  let fixture: ComponentFixture<AddKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
