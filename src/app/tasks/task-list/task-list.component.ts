import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Task, TaskService} from "../task.service";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTableModule} from '@angular/material/table';
import {AsyncPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import { Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {TaskEditComponent} from "../task-edit/task-edit.component";
import {TaskCommunicationService} from "../../core/services/task-communication.service";
import {ModalComponent} from "../../modal/modal.component";
import {HighlightDirective} from "../../core/directives/highlight.directive";
import {TaskTitlePipe} from "../../core/pipes/task-title.pipe";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    AsyncPipe,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    ModalComponent,
    HighlightDirective,
    TaskTitlePipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  filteredTasks: Observable<Task[]> | undefined;
  searchControl = new FormControl('')
  displayedColumns: string[] = ['id', 'title', 'completed', 'actions'];
  active = false;

  @ViewChild(ModalComponent) modal!: ModalComponent;


  constructor(
     private taskService: TaskService,
     private router: Router,
     public dialog: MatDialog,
     private taskCommunicationService: TaskCommunicationService,
  ) {}

    ngOnInit() {
      this.loadTasks()
      this.filteredTasks = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterTasks(value))
      );
      this.taskCommunicationService.taskUpdated$.subscribe(() => {
        console.log('Task updated')
        this.loadTasks()
      });
    }



    viewTask(taskId: number){
      console.log('Edit task with id: ', taskId)
      this.router.navigate(['/tasks', taskId])
    }

    editTask(taskId: number | null){
        const dialogRef = this.dialog.open(TaskEditComponent, {
          width: '250px',
          data: {id: taskId}
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.loadTasks()
          }
        })
    }

    loadTasks(){
      this.taskService.getTasks().pipe(
        catchError(error => {
          console.error('Error loading tasks:', error);
          // Возвращаем пустой массив задач в случае ошибки
          return of([]);
        })
      ).subscribe(tasks => {
        this.tasks = tasks
        console.log(this.tasks)
        this.filteredTasks = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterTasks(value))
        )
      })
    }

    filterTasks(value: string | null): Task[]{
     if (!value) {
       return this.tasks
     }
     const filterValue = value.toLowerCase()
     return this.tasks.filter(task => task.title.toLowerCase().includes(filterValue))
    }


  openModal(): void {
    this.modal.show();
  }

  closeModal(): void {
    this.modal.hide();
  }

  toggleActive(): void {
    this.active = !this.active;
  }
}
