import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Job {
  url: string,
  title: string,
  source: string,
  notes: string,
  timestamp: Date,
  status: string
}

@Component({
  selector: 'app-jobsform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jobsform.component.html',
  styleUrl: './jobsform.component.css'
})
export class JobsformComponent {
  savedJobs: Job[] = [];

  jobDetails: Job = {
    url: '',
    title: '',
    source: '',
    notes: '',
    timestamp: new Date(),
    status: 'applied'
  }
  constructor() {}

  submitForm(jobForm: any) {
      // console.log(this.jobDetails)
      this.savedJobs.push(this.jobDetails);
      this.jobDetails = {} as Job
  }

}
