import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageItemsModal } from './manage-items-modal';

describe('ManageItemsModal', () => {
  let component: ManageItemsModal;
  let fixture: ComponentFixture<ManageItemsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageItemsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageItemsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
