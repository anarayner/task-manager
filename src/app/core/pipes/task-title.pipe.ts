import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskTitle',
  standalone: true
})
export class TaskTitlePipe implements PipeTransform {
  transform(value: string): string {
    return `Task: ${value}`;
  }
}
