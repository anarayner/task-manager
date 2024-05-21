import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {

  @Input() active: boolean | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.updateHighlight();
  }

  private updateHighlight(): void {
    if (this.active !== undefined) {
      if (this.active) {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'green');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
      }
    }
  }

}
