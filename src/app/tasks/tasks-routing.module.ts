import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'new', component: TaskEditComponent },
  { path: ':id', component: TaskDetailComponent },
  { path: ':id/edit', component: TaskEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
