import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDisplay } from './loan-display';

describe('LoanDisplay', () => {
  let component: LoanDisplay;
  let fixture: ComponentFixture<LoanDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
