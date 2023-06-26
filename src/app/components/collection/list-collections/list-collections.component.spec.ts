import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCollectionsComponent } from './list-collections.component';

describe('ListCollectionsComponent', () => {
  let component: ListCollectionsComponent;
  let fixture: ComponentFixture<ListCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCollectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
