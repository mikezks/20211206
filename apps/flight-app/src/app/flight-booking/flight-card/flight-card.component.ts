/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';
import { of } from 'rxjs';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: Flight | undefined;
  @Input() selected: boolean | undefined;
  @Output() selectedChange = new EventEmitter<boolean>();

  myState$ = of('state');

  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private cdRef: ChangeDetectorRef) {

    /* this.cdRef.detectChanges();
    this.cdRef.markForCheck();
    this.cdRef.detach();
    this.cdRef.reattach();

    this.myState$.subscribe(
      state => {
        this.cdRef.markForCheck();
      }
    ); */
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  select() {
    this.selected = true;
    this.selectedChange.next(true);
  }

  deselect() {
    this.selected = false;
    this.selectedChange.next(false);
  }

  blink() {
    // Dirty Hack used to visualize the change detector
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
        this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
        //              ^----- DOM-Element
      });

      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = this.selected ? 'rgb(204, 197, 185)' : 'white';
      }, 1000);
    });

    return null;
  }
}
