import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTodoModalComponent } from './admin-todo-modal.component';

describe('AdminTodoModalComponent', () => {
  let component: AdminTodoModalComponent;
  let fixture: ComponentFixture<AdminTodoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTodoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
