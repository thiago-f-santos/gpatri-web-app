import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoleModal } from './edit-role-modal';

describe('EditRoleModal', () => {
  let component: EditRoleModal;
  let fixture: ComponentFixture<EditRoleModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRoleModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoleModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
