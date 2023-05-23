import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycInfoComponent } from './kyc-info.component';

describe('KycInfoComponent', () => {
  let component: KycInfoComponent;
  let fixture: ComponentFixture<KycInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
