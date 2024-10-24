import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { RoleComponent } from '../role/role.component';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';
import { UserService } from 'src/app/sevices/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RoleComponent, RemoveButtonComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  user: User = this.activatedRoute.snapshot.data["user"];
  roles: Role[] = this.activatedRoute.snapshot.data["roles"];
  unusedRoles: Role[] = [];
  userRoles: Subject<Role[]> = new BehaviorSubject<Role[]>([]);
  userIsAdmin: boolean = false;
  userFormGroup: FormGroup = this.formBuilder.group({
    firstName: [""],
    lastName: [""],
    username: [""],
    roles: [""]
  });
  addRoleFormGroup: FormGroup = this.formBuilder.group({
    addRole: [""]
  });

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}

  ngOnInit(): void {
    this.updateUnusedRoles();
    if (this.user?.roles.find(role => role.roleName === "Admin")) {
      this.userIsAdmin = true;
    } else {
      this.userFormGroup.disable();
    }
    if (this.user) {
      this.userFormGroup.patchValue(this.user);
    }
  }

  addRole() {
    const selectedRoleName: string = this.addRoleFormGroup.value["addRole"];
    const roleToAdd = this.roles?.find(role => role.roleName === selectedRoleName);
    if (roleToAdd && this.user) {
      this.userFormGroup.controls["roles"].value.push(roleToAdd);
      this.updateUnusedRoles();
      this.addRoleFormGroup.reset();
    }
  }

  removeRole(name: string) {
    if (this.user) {
      const roleToRemove = this.user.roles.find(role => role.roleName === name);
      if (roleToRemove) {
        this.user.roles.splice(this.user.roles.indexOf(roleToRemove), 1);
        this.updateUnusedRoles();
      }
    }
  }

  updateUnusedRoles() {
    // Filtering out roles the user already has and also the admin role
    this.unusedRoles = this.roles?.filter(role =>
      !(this.user?.roles.some(userRole => userRole.roleName === role.roleName)) &&
      role.roleName !== "Admin");
  }

  updateUser() {
    if (this.user && this.user._id) {
      this.userService.updateUser(this.userFormGroup.value, this.user._id).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
