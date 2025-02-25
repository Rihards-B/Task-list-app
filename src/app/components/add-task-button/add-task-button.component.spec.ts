import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskButtonComponent } from './add-task-button.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';

describe('AddTaskButtonComponent', () => {
  let component: AddTaskButtonComponent;
  let fixture: ComponentFixture<AddTaskButtonComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskButtonComponent],
      providers: [provideHttpClient(withInterceptors([AuthInterceptor])), provideRouter(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTaskButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
