import { Component, inject } from '@angular/core';
import { DataService } from '../../data.service';
import { Stats } from '../../app.model';

@Component({
    selector: 'app-weekly-counter',
    standalone: true,
    templateUrl: './weekly-counter.component.html',
    styleUrl: './weekly-counter.component.css'
})
export class WeeklyCounterComponent {
  private data: DataService = inject(DataService);
  public stats: Stats = {} as Stats

  constructor() {
    this.data.getStats().then((data)=>{
      this.stats = data.data() as Stats;
      this.checkForWeeklyTotalReset();
    })
  }

  public advanceCounter(): void {
    let newState = {...this.stats, weeklyCount: ++this.stats.weeklyCount, totalCount: ++this.stats.totalCount }
    this.data.setCount(newState);
  }

  private checkForWeeklyTotalReset() {
    const today = new Date();
    const lastMonday = new Date(0);
    lastMonday.setUTCSeconds(this.stats.lastMonday.seconds);
    const nextSundayIdx = lastMonday.getDate()+6;
    const offset = lastMonday.getDate()+7;

    if ( nextSundayIdx < today.getDate()) {
      this.data.setWeeklyTotalToZero(offset, this.stats);
    }
  }
}