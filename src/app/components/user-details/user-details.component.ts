import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { Role } from 'src/app/models/role-model';
import { User } from 'src/app/models/user';
import { RoleComponent } from '../role/role.component';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';
import { UserService } from 'src/app/sevices/user.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RoleComponent, RemoveButtonComponent, TranslateModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined = undefined;
  roles: Role[] | undefined = undefined;
  unusedRoles: Role[] | undefined = undefined;
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
    this.activatedRoute.data.pipe(take(1)).subscribe(({ user, roles }) => {
      this.user = user;
      this.roles = roles;
      this.updateUnusedRoles();
      if (this.user?.roles.find(role => role.role_name === "Admin")) {
        this.userIsAdmin = true;
      } else {
        this.userFormGroup.disable();
      }
      if (this.user) {
        this.userFormGroup.patchValue(this.user);
      }
    })
  }

  addRole() {
    console.log(this.userFormGroup);
    const selectedRoleId: string = this.addRoleFormGroup.value["addRole"];
    const roleToAdd = this.roles?.find(role => role._id === selectedRoleId);
    if (roleToAdd && this.user) {
      this.userFormGroup.controls["roles"].value.push(roleToAdd);
      this.updateUnusedRoles();
    }
  }

  removeRole(id: string) {
    if (this.user) {
      const roleToRemove = this.user.roles.find(role => role._id === id);
      if (roleToRemove) {
        this.user.roles.splice(this.user.roles.indexOf(roleToRemove), 1);
        console.log(roleToRemove);
        this.updateUnusedRoles();
      }
    }
  }

  updateUnusedRoles() {
    // Filtering out roles the user already has and also the admin role
    this.unusedRoles = this.roles?.filter(role =>
      !(this.user?.roles.some(userRole => userRole._id === role._id)) &&
      role.role_name !== "Admin");
  }

  updateUser() {
    if (this.user && this.user._id) {
      this.userService.updateUser(this.userFormGroup.value, this.user._id).subscribe(() => {
        this.router.navigateByUrl('/');
      });
    }
  }
}
