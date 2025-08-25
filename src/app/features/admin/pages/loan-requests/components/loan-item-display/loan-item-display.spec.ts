import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanItemDisplay } from './loan-item-display';

describe('LoanItemDisplay', () => {
  let component: LoanItemDisplay;
  let fixture: ComponentFixture<LoanItemDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanItemDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanItemDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
