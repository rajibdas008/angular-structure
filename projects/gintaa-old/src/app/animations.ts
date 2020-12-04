import { trigger, transition, style, animate, query, state, keyframes, group } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('600ms', style({ opacity: 0 }))]
  )
]);

export const divState = trigger('divState', [
  state('normal', style({
    'background-color': 'red',
    transform: 'translateX(0)'
  })),
  state('highlighted', style({
    'background-color': 'blue',
    transform: 'translateX(100px)'
  })),
  transition('normal <=> highlighted', animate(300)),
  //transition('highlighted => normal', animate(800)),
]);

export const wildState = trigger('wildState', [
  state('normal', style({
    'background-color': 'red',
    transform: 'translateX(0) scale(1)'
  })),
  state('highlighted', style({
    'background-color': 'blue',
    transform: 'translateX(100px) scale(1)'
  })),
  state('shrunken', style({
    'background-color': 'green',
    transform: 'translateX(0) scale(0.5)'
  })),
  transition('normal => highlighted', animate(300)),
  transition('highlighted => normal', animate(800)),
  transition('shrunken <=> *', [
    style({
      'background-color': 'orange'
    }),
    animate(1000, style({
      borderRadius: '50px'
    })),
    animate(500)
  ])
]);

export const slideInOut = trigger('slideInOut', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(-100px)'
    }),
    animate(300)
  ]),
  transition('* => void', [    
    animate(300, style({
      transform: 'translateX(100px)',
      opacity: 0
    }))
  ]),
]);

export const slideInOutSmooth = trigger('slideInOutSmooth', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [    
    animate(1000, keyframes([
      style({
        transform: 'translateX(-100px)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'translateX(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateX(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateX(0)',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition('* => void', [ 
    group([
      animate(300, style({
        color: 'red'
      })),
      animate(800, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ]),
]);

export const slideUpDown = trigger('slideUpDown', [
  state('in', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateY(-100px)'
    }),
    animate(300)
  ]),
  transition('* => void', [    
    animate(300, style({
      transform: 'translateY(100px)',
      opacity: 0
    }))
  ]),
]);

export const slideUpDownSmooth = trigger('slideUpDownSmooth', [
  state('true, false', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('false <=> true, :enter', [    
    animate(1000, keyframes([
      style({
        transform: 'translateY(-100px)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'translateY(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateY(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateY(0)',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition(':leave', [ 
    // group([
    //   animate(300, style({
    //     color: 'red'
    //   })),
      animate(800, style({
        transform: 'translateY(100px)',
        opacity: 0
      }))
    //])
  ]),
]);