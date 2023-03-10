import {
  Component, OnInit,
  ViewChild,
  TemplateRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Pets} from "../../Entities/pets"
import { Treatment} from "../../Entities/treatments"

const colors: any = {
  red: {
    primary: 'red',
    secondary: 'red'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-pet-calendar',
  templateUrl: './pet-calendar.component.html',
  styleUrls: ['./pet-calendar.component.css'],
  styles: [
    `
      .my-custom-class span {
        color: #ff3d7f !important;
      }
    `
  ]
})
export class PetCalendarComponent implements OnInit, OnChanges {
  // @ts-ignore: Object is possibly 'null'.
  @Input() plannedTreatment: Treatment[]
  @ViewChild('modalContent')
  modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  isLoaded: Boolean = false;
  // modalData: {
  //   action: string;
  //   event: CalendarEvent;
  // };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) { }
  ngOnInit() {
    this.isLoaded = true;
  }


  ngOnChanges(changes: SimpleChanges) {

    if (changes.plannedTreatment) {
        this.addTreatmentsEvent();
    
    }
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(treatment: Treatment): void {
    this.events.push({
      // @ts-ignore: Object is possibly 'null'.
      title: treatment.type?.toString(),
      // @ts-ignore: Object is possibly 'null'.
      start: new Date(treatment.date),
      color: colors.red,
      allDay: true,
      cssClass: 'day-color',
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  addTreatmentsEvent() {
    this.plannedTreatment.forEach(element => {
      this.addEvent(element);
    });
  }
}