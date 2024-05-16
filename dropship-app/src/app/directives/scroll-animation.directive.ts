import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {

  constructor(private el:ElementRef, private renderer: Renderer2) { }

  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  
    // Adjust this value based on when you want the animation to trigger
    const triggerPosition = 200;
  
    if (scrollPosition > triggerPosition) {
      this.renderer.addClass(this.el.nativeElement, 'anime-srcl');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'anime-srcl');
    }
  }
  
    
     
    

}
