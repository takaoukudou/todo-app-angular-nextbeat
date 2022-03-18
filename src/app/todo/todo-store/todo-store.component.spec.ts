import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoStoreComponent } from './todo-store.component';

describe('TodoStoreComponent', () => {
  let component: TodoStoreComponent;
  let fixture: ComponentFixture<TodoStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoStoreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
