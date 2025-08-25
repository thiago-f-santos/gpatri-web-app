import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patrimonies } from './patrimonies';

describe('Patrimonies', () => {
  let component: Patrimonies;
  let fixture: ComponentFixture<Patrimonies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Patrimonies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Patrimonies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
