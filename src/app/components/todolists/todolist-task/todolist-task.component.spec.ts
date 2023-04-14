import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistTaskComponent } from './todolist-task.component';

describe('TodolistTaskComponent', () => {
  let component: TodolistTaskComponent;
  let fixture: ComponentFixture<TodolistTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodolistTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
