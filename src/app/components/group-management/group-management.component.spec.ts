import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagementComponent } from './group-management.component';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

describe('GroupManagementComponent', () => {
  let component: GroupManagementComponent;
  let fixture: ComponentFixture<GroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupManagementComponent, RouterModule.forRoot(routes)],
      providers: [provideHttpClient(withInterceptors([AuthInterceptor]))]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
