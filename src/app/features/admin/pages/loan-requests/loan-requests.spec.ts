import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequests } from './loan-requests';

describe('LoanRequests', () => {
  let component: LoanRequests;
  let fixture: ComponentFixture<LoanRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
