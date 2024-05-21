import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskCommunicationService {

  private taskUpdateSubject = new Subject<void>();
  taskUpdated$ = this.taskUpdateSubject.asObservable();

  notifyTaskUpdated() {
    this.taskUpdateSubject.next();
  }
}
