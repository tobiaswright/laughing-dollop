import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobsform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jobsform.component.html',
  styleUrl: './jobsform.component.css'
})
export class JobsformComponent {
  jobDetails = {
    url: '',
    title: ''
  }
  constructor() {}

  submitForm(jobForm: any) {
      console.log(this.jobDetails)
  }

}
