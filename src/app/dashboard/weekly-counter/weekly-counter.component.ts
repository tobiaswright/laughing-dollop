import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Stats } from '../../app.model';
import { Timestamp } from '@angular/fire/firestore';

@Component({
    selector: 'app-weekly-counter',
    standalone: true,
    templateUrl: './weekly-counter.component.html',
    styleUrl: './weekly-counter.component.css'
})
export class WeeklyCounterComponent implements OnInit {
  private data: DataService = inject(DataService);
  public stats = this.data.getStats();
  public isLoaded = computed(()=>this.stats().lastMonday ? true : false)

  constructor() {
    effect(()=>{
      if(this.isLoaded()) {
        this.checkForWeeklyTotalReset();
      }
    })
  }

  ngOnInit(): void {}

  public advanceCounter(): void {
    let newState = {...this.stats(), weeklyCount: ++this.stats().weeklyCount, totalCount: ++this.stats().totalCount }
    this.data.setCount(newState);
  }

  // Weekly Total resets and runs from Monday to Sunday
  private checkForWeeklyTotalReset() {
    const today = new Date();
    const lastMonday = new Date(0);
    lastMonday.setUTCSeconds(this.stats().lastMonday.seconds);
    const thisSundayIdx = lastMonday.getDate()+6;
    const newMondayIdx = lastMonday.getDate()+7;

    if (thisSundayIdx < today.getDate()) {
      const setNewMonday = new Date();
      setNewMonday.setDate(newMondayIdx);
      const secondsFromEpoch = setNewMonday.getTime()/1000;
      const newMonday = new Timestamp(secondsFromEpoch,0);
  
      let newState = {...this.stats(), weeklyCount:0, lastMonday: newMonday}

      this.data.setWeeklyTotalToZero(newState);
    }
  };
}