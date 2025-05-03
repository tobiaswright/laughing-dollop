import { Component, inject, input, signal } from '@angular/core';
import { Job } from '../../../app.model';
import { DataService } from '../../../data.service';
import { JobCoverletterCreatorComponent } from "./job-coverletter-creator/job-coverletter-creator.component";

@Component({
  selector: 'tr[app-job-entry]',
  imports: [JobCoverletterCreatorComponent],
  templateUrl: './job-entry.component.html',
  styleUrl: './job-entry.component.css',
  standalone: true
})
export class JobEntryComponent {
  private data: DataService = inject(DataService);
  public job = input.required<Job>();
  arr = ["applied","rejected","screening","interview","techinical","offer"];

  public setStatus() {
    let idx = this.arr.indexOf(this.job().status);
    if (idx === this.arr.length-1) {
      idx = 0;
    } else {
      idx++;
    }

    const updatedJob = {...this.job(), status: this.arr[idx]}
    this.data.updateJob(updatedJob);
  }

  public delete(job: Job){
    this.data.deleteJob(job)
  }
}
