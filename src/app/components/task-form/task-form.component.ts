import { CommonModule, formatDate } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskFormValidationService } from 'src/app/sevices/taskFormValidation.service';
import { FormErrorComponent } from '../form-error/form-error.component';
import { EventEmitter } from '@angular/core';
import { taskStatus, taskType } from 'src/app/constants/taskConstants';
import { Task } from 'src/app/models/task.model';
import { UserService } from 'src/app/sevices/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { getTasks } from 'src/app/store/task/task.actions';
import { RemoveButtonComponent } from 'src/app/remove-button/remove-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormErrorComponent, ReactiveFormsModule, FormsModule, RouterModule, CommonModule, TranslateModule, RemoveButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  @Input() submitText: string = "Submit";
  @Input() task: Task | null = null;
  @Input() formType: string | null = null;

  @Output() formSubmitted = new EventEmitter<Task>();

  editing: boolean = false;
  taskTypes = Object.values(taskType).filter(value => typeof value === 'string');
  taskStatuses = Object.values(taskStatus).filter(value => typeof value === 'string');
  users$: Observable<User[]> = this.userService.getUsers();
  groups: string[] = this.activatedRoute.snapshot.data["groups"];
  unusedGroups: string[] = [];
  taskFormGroup: FormGroup = this.formBuilder.group({
    title: ["", [Validators.required, this.taskFormValidationService.uniqueTitle()]],
    description: [""],
    type: ["", Validators.required],
    status: ["incomplete", Validators.required],
    groups: [[]],
    createdOn: [formatDate(0, "yyyy-MM-dd", "en")],
    assignedTo: ["UNASSIGNED", Validators.required],
    _id: [null]
  });
  addGroupFormGroup: FormGroup = this.formBuilder.group({
    addGroup: [""]
  });

  constructor(private formBuilder: FormBuilder,
    private taskFormValidationService: TaskFormValidationService,
    private userService: UserService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute) {};

  ngOnInit(): void {
    this.store.dispatch(getTasks());
    if (this.task) {
      this.taskFormGroup.patchValue(this.task);
      this.updateUnusedGroups();
      this.taskFormGroup.controls["title"].setValidators([
        // Title can be the same as original task
        this.taskFormValidationService.uniqueTitle(this.task.title),
        Validators.required
      ])
      this.taskFormGroup.disable();
      this.addGroupFormGroup.disable();
    }
  }

  submit(taskFormGroup: FormGroup) {
    this.formSubmitted.emit(taskFormGroup.value);
  }

  enableEdit() {
    this.editing = true;
    this.taskFormGroup.enable();
    this.addGroupFormGroup.enable();
  }

  updateUnusedGroups() {
    const usedGroups: string[] = this.taskFormGroup.controls["groups"].value;
    this.unusedGroups = this.groups?.filter(group => !(usedGroups.some(taskGroup => taskGroup === group)));
  }

  addGroup() {
    this.taskFormGroup.controls["groups"].value.push(this.addGroupFormGroup.controls["addGroup"].value);
    this.addGroupFormGroup.reset();
    this.updateUnusedGroups();
  }

  removeGroup(groupName: string) {
    const groups = this.taskFormGroup.controls["groups"].value;
    const groupIndex: number = groups.indexOf(groupName);
    if (groupIndex !== -1) {
      groups.splice(groupIndex, 1);
      this.updateUnusedGroups();
    }
  }
}
