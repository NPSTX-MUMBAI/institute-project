import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteInfoComponent } from './institute-info.component';

describe('InstituteInfoComponent', () => {
  let component: InstituteInfoComponent;
  let fixture: ComponentFixture<InstituteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
