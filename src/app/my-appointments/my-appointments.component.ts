import {
  Component, OnInit,
  ViewChild,
  TemplateRef,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  addHours,
  isSameDay,
  isSameMonth,
  startOfDay,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { Treatment } from 'src/app/Entities/treatments';
import { PetService } from '../Services/pet.service';



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
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css'],
  styles: [
    `
      .my-custom-class span {
        color: #ff3d7f !important;
      }
    `
  ]
})
export class MyAppointmentsComponent implements OnInit {

  @ViewChild('modalContent')
  modalContent: TemplateRef<any> | undefined;
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  isLoaded: Boolean = false;

  treatments: Treatment[] = [];
  filteredTreatments: Treatment[] = [];

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

  constructor(private modal: NgbModal, private petService: PetService) { }

  ngOnInit(): void {
    this.getTreatments();
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
    // @ts-ignore: Object is possibly 'null'.
    let treatmentDate = new Date(treatment.date);
    this.events.push({
      // @ts-ignore: Object is possibly 'null'.
      title: " Treatment : " + treatment.type?.toString() + " , Pet : " + treatment.pet?.name + " , Owner : " + treatment.pet?.customer?.firstname + " " + treatment.pet?.customer?.lastname + " , At : " + treatmentDate.getHours() + " H " + treatmentDate.getMinutes(),
      // @ts-ignore: Object is possibly 'null'.
      start: new Date(treatment.date),

      color: colors.yellow,
      allDay: false,
      cssClass: 'day-color',
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  getTreatments() {
    this.petService.getAllTreatments().subscribe((response) => {
      this.treatments = response;
      this.treatments.forEach(element => {
        // @ts-ignore: Object is possibly 'null'.
        let date = new Date(element.date);
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0)
        date.setHours(0, 0, 0, 0)
        if (((date.getTime() - currentDate.getTime()) / (86400000 * 7)) === 0) {
          this.filteredTreatments.push(element)
        }
      })
      this.filteredTreatments.forEach(element => {
        this.addEvent(element);
      });
    })
  }
}
