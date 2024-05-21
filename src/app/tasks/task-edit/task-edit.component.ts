import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {TaskService} from "../task.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import {TaskCommunicationService} from "../../core/services/task-communication.service";

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatCheckbox,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private taskCommunicationService: TaskCommunicationService,
  ) {
    this.taskForm = this.fb.group({
      id: [''],
      title: [''],
      completed: [false]
    })
  }

  ngOnInit(): void {
    console.log('TaskEditComponent data: ', this.data.id)
    if (this.data.id) {
      this.isEditMode = true;
      this.taskService.getTask(this.data.id).subscribe(task => {
        this.taskForm.patchValue(task)
      })
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      console.log('Update task: ', this.taskForm.value)
      this.taskService.updateTask(this.taskForm.value).subscribe(() => this.dialogRef.close(true))
      this.taskCommunicationService.notifyTaskUpdated();
    } else {
      console.log('Create task: ', this.taskForm.value)
      this.taskService.createTask(this.taskForm.value).subscribe(() => this.dialogRef.close(true))
      this.taskCommunicationService.notifyTaskUpdated();
    }
  }

  onCancel() {
    this.dialogRef.close()
  }
}
