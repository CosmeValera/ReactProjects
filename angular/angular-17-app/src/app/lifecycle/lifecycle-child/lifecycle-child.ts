import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lifecycle-child',
  imports: [],
  template: `<p>Username: {{ lifecycleUsername }}</p>`,
})
export class LifecycleChild implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() lifecycleUsername = '';

  ngOnChanges(changes: SimpleChanges): void {
      console.log('ngOnChanges - input changed:', changes)
  }

  ngOnInit(): void {
    console.log('ngOnInit - component initialized, lifecycleUsername:', this.lifecycleUsername)
  }

  ngAfterViewInit(): void {
      console.log('ngAfterViewInit - DOM ready')
  }

  ngOnDestroy(): void {
      console.log('ngOnDestroy - component destroyed, cleanup here')
  }
}

// {
//     "lifecycleUsername": {
//         "previousValue": "lifecycle-cosmec",
//         "currentValue": "lifecycle-cosme",
//         "firstChange": false
//     }
// }