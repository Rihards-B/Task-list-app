import { Component, Input } from '@angular/core';
import { Task } from '../models/task';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task?: Task;
}
