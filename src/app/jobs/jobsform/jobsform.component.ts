import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Job } from '../../app.model';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-jobsform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jobsform.component.html',
  styleUrl: './jobsform.component.css'
})

export class JobsformComponent {
  data = inject(DataService);
  savedJobs: Job[] = [];

  jobDetails: Job = {
    url: '',
    title: '',
    source: '',
    notes: '',
    company: '',
    timestamp: new Date(),
    status: 'applied'
  }
  constructor() {}

  submitForm() {
      this.data.addJob(this.jobDetails);
      this.savedJobs.push(this.jobDetails)
  }

}
