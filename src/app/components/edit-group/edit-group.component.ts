import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GroupService } from 'src/app/sevices/group.service';
import { uniqueGroupName } from 'src/app/validators/uniqueGroupName.validator';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, ReactiveFormsModule, FormsModule, MatDialogActions, MatDialogClose, MatButtonModule, FormErrorComponent],
  templateUrl: './edit-group.component.html',
  styleUrl: './edit-group.component.scss'
})
export class EditGroupComponent {
  editGroupFormGroup: FormGroup = this.formBuilder.group({
    groupName: ["", { updateOn: 'blur', validators: [Validators.required, Validators.pattern('[a-zA-Z0-9_]*')], asyncValidators: [uniqueGroupName()] }],
  });

  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupService: GroupService) {}

  updateGroup() {
    const newGroupName = this.editGroupFormGroup.value["groupName"];
    this.groupService.updateGroup(this.data.groupName, newGroupName).subscribe();
  }
}
