import { Component, inject, input } from '@angular/core';
import { Job } from '../../../app.model';
import { DataService } from '../../../data.service';

@Component({
  selector: 'tr[app-job-entry]',
  imports: [],
  templateUrl: './job-entry.component.html',
  styleUrl: './job-entry.component.css',
  standalone: true
})
export class JobEntryComponent {
  private data: DataService = inject(DataService);
  job = input.required<Job>();
  arr = ["applied","rejected","screening","interview","techinical","offer"]

  public setStatus() {
    let idx = this.arr.indexOf(this.job().status);
    if (idx === this.arr.length) {
      idx = 0;
    } else {
      idx++;
    }

    this.data.setStatus(this.job());
  }
}
