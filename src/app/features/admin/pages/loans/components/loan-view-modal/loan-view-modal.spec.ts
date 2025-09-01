import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanViewModal } from './loan-view-modal';

describe('LoanViewModal', () => {
  let component: LoanViewModal;
  let fixture: ComponentFixture<LoanViewModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanViewModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanViewModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
