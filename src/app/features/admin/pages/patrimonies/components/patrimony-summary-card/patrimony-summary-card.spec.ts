import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonySummaryCard } from './patrimony-summary-card';

describe('PatrimonySummaryCard', () => {
  let component: PatrimonySummaryCard;
  let fixture: ComponentFixture<PatrimonySummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrimonySummaryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatrimonySummaryCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
