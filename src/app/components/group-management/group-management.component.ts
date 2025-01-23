import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';
import { GroupService } from 'src/app/sevices/group.service';
import { MatDialog } from '@angular/material/dialog'
import { EditGroupComponent } from '../edit-group/edit-group.component';

@Component({
  selector: 'app-group-management',
  standalone: true,
  imports: [RemoveButtonComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './group-management.component.html',
  styleUrl: './group-management.component.scss'
})
export class GroupManagementComponent {
  groups = this.activatedRoute.snapshot.data["groups"];
  createGroupformGroup: FormGroup = this.formBuilder.group({
    groupName: ["", Validators.required],
  })

  constructor(private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {}

  createGroup() {
    const groupName = this.createGroupformGroup.value["groupName"];
    console.log(groupName);
    this.groupService.addGroup(groupName).subscribe();
    this.groups.push(groupName);
  }

  deleteGroup(groupName: string) {
    this.groupService.deleteGroup(groupName).subscribe();
    this.groups.splice(this.groups.indexOf(groupName), 1);
  }

  edit(groupName: string) {
    this.dialog.open(EditGroupComponent, { data: { groupName: groupName } });
    console.log(groupName);
  }
}