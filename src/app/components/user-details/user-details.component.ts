import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { RoleComponent } from '../role/role.component';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';
import { UserService } from 'src/app/sevices/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthStore } from 'src/app/store/auth/auth.store';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RoleComponent, RemoveButtonComponent, TranslateModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  updateUserSubscription = Subscription.EMPTY;

  authStore = inject(AuthStore);

  currentUser = this.authStore.currentUser();
  user: User = this.activatedRoute.snapshot.data["user"];
  roles: string[] = this.activatedRoute.snapshot.data["roles"];
  unusedGroups: string[] = [];
  groups: string[] = this.activatedRoute.snapshot.data["groups"];
  unusedRoles: string[] = [];
  userRoles: Subject<string[]> = new BehaviorSubject<string[]>([]);
  userIsAdmin: boolean = false;
  userFormGroup: FormGroup = this.formBuilder.group({
    firstName: [""],
    lastName: [""],
    username: [""],
    roles: [""],
    groups: [""]
  });
  addRoleFormGroup: FormGroup = this.formBuilder.group({
    addRole: [""]
  });
  addGroupFormGroup: FormGroup = this.formBuilder.group({
    addGroup: [""]
  });

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.updateUnusedRoles();
    this.updateUnusedGroups();
    if (this.currentUser && this.currentUser.roles.includes("Admin")) {
      this.userIsAdmin = true;
    } else {
      this.userFormGroup.disable();
    }

    if (this.user) {
      this.userFormGroup.patchValue(this.user);
    }

    if (!this.user && this.currentUser) {
      this.userFormGroup.patchValue(this.currentUser);
    }
  }

  ngOnDestroy(): void {
    this.updateUserSubscription.unsubscribe();
  }

  addRole() {
    const selectedRoleName: string = this.addRoleFormGroup.value["addRole"];
    const roleToAdd = this.roles?.find(role => role === selectedRoleName);
    if (roleToAdd && this.user) {
      this.userFormGroup.controls["roles"].value.push(roleToAdd);
      this.updateUnusedRoles();
      this.addRoleFormGroup.reset();
    }
  }

  addGroup() {
    const selectedGroupName: string = this.addGroupFormGroup.value["addGroup"];
    const groupToAdd = this.groups?.find(group => group === selectedGroupName);
    if (groupToAdd && this.user) {
      this.userFormGroup.controls["groups"].value.push(groupToAdd);
      this.updateUnusedGroups();
      this.addGroupFormGroup.reset();
    }
  }

  removeRole(name: string) {
    if (this.user) {
      const roleToRemove = this.user.roles.find(role => role === name);
      if (roleToRemove) {
        this.user.roles.splice(this.user.roles.indexOf(roleToRemove), 1);
        this.updateUnusedRoles();
      }
    }
  }

  removeGroup(name: string) {
    if (this.user) {
      const groupToRemove = this.user.groups.find(group => group === name);
      if (groupToRemove) {
        this.user.groups.splice(this.user.groups.indexOf(groupToRemove), 1);
        this.updateUnusedGroups();
      }
    }
  }

  updateUnusedRoles() {
    // Filtering out roles the user already has and also the admin role
    this.unusedRoles = this.roles?.filter(role =>
      !(this.user?.roles.some(userRole => userRole === role)) &&
      role !== "Admin");
  }

  updateUnusedGroups() {
    this.unusedGroups = this.groups?.filter(group => !(this.user?.groups.some(userGroup => userGroup === group)));
  }

  updateUser() {
    if (this.user && this.user._id) {
      this.updateUserSubscription = this.userService.updateUser(this.userFormGroup.value, this.user._id).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
