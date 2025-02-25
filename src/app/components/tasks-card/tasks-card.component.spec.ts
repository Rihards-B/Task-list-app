import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksCardComponent } from './tasks-card.component';
import { provideStore } from '@ngrx/store';
import { appStore } from 'src/app/store/app.store';
import { provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader } from 'src/app/sevices/translation.loader';
import { HttpClient } from '@angular/common/http';

describe('TasksCardComponent', () => {
  let component: TasksCardComponent;
  let fixture: ComponentFixture<TasksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksCardComponent, TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: TranslationLoader,
          deps: [HttpClient]
        }
      })],
      providers: [provideStore(appStore), provideRouter(routes)]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TasksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not create if not logged in', () => {
    const listElement = fixture.debugElement.children.find(el => el.name === "app-task-list");
    expect(listElement).toBeFalsy();
  })
});