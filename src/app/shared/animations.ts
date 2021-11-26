import { animate, style, transition, trigger } from '@angular/animations';

 export function anim() {
     let trig =   trigger('fadeSlideInOut', [
        transition(':enter', [
          style({
            opacity: 0, transform: 'translateY(10px)'
          }),
          animate('500ms', style({opacity:0.4,  transform : 'translateY(0px)'}))
        ]),
        transition(':leave', [
          animate('500ms', style({opacity: 0, transform: 'translateY(10px)'}))
        ])
      ])

      return trig
}
