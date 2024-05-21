import {Component, OnInit} from '@angular/core';
import {Task, TaskService} from '../task.service';
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {catchError, of} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    NgIf,
    MatButton
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTask()
  }

  getTask(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.taskService.getTask(id).pipe(
      catchError(error => {
        console.error('Error loading task:', error);
        this.snackBar.open('Error loading task. Please try again later.', 'Close', {
          duration: 5000
        });
        // Возвращаем undefined в случае ошибки
        return of(undefined);
      })
    ).subscribe(task => this.task = task)
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

}
