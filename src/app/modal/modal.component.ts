import { Component } from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  public isVisible = false;

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }
}
