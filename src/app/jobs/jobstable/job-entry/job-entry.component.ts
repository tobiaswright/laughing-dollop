import { Component, input } from '@angular/core';
import { Job } from '../../../app.model';

@Component({
  selector: 'tr[app-job-entry]',
  imports: [],
  templateUrl: './job-entry.component.html',
  styleUrl: './job-entry.component.css',
  standalone: true
})
export class JobEntryComponent {
  job = input.required<Job>();
}
