import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonyDisplay } from './patrimony-display';

describe('PatrimonyDisplay', () => {
  let component: PatrimonyDisplay;
  let fixture: ComponentFixture<PatrimonyDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatrimonyDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatrimonyDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
