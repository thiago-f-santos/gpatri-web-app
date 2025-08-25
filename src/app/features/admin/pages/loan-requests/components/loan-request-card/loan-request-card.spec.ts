import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestCard } from './loan-request-card';

describe('LoanRequestCard', () => {
  let component: LoanRequestCard;
  let fixture: ComponentFixture<LoanRequestCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRequestCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRequestCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
