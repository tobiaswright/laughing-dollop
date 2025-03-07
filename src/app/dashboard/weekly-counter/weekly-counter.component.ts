import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';

interface Count {
  totalCount: number,
  weeklyCount: number,
  prevMonday: Timestamp
}

@Component({
    selector: 'app-weekly-counter',
    standalone: true,
    templateUrl: './weekly-counter.component.html',
    styleUrl: './weekly-counter.component.css'
})
export class WeeklyCounterComponent {
  private firestore: Firestore = inject(Firestore);
  public count: Count = {weeklyCount: 0,totalCount: 0, prevMonday: new Timestamp(0,0) }
  private statsDocRef = doc(this.firestore,"jobStats", "i7SetdpGJsaeEmvF5z3W");
  private prevMonday = new Date();

  constructor() {
    getDoc(this.statsDocRef)
    .then((stats)=>{
        this.count = stats.data() as Count;
        // https://stackoverflow.com/questions/35088088/javascript-for-getting-the-previous-monday/52750444#52750444
        this.prevMonday.setDate(this.prevMonday.getDate() - (this.prevMonday.getDay() + 6) % 7);
      }
    )
  }

  public advanceCounter(): void {
    if (this.resetWeeklyCounter()) {
      this.count.weeklyCount = 0;
      let newMonday = new Date();
      newMonday.setDate(this.prevMonday.getDate()+7);
      this.count.prevMonday = new Timestamp(newMonday.getTime()/1000,0);
    }
    this.count.weeklyCount++;
    this.count.totalCount++;
    setDoc(this.statsDocRef, this.count);
  }

  private resetWeeklyCounter(): boolean {
    const d = new Date();
    const nextSunday = new Date(this.prevMonday.getTime()/1000);
    nextSunday.setDate(this.prevMonday.getDate()+7);

    if ( nextSunday.getDate() > d.getDate()) {
      return false;
    }
    return true;
  }
}
