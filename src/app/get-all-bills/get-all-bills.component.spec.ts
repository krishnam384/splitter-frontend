import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllBillsComponent } from './get-all-bills.component';

describe('GetAllBillsComponent', () => {
  let component: GetAllBillsComponent;
  let fixture: ComponentFixture<GetAllBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
