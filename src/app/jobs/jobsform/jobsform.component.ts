import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Job } from '../../app.model';
import { DataService } from '../../data.service';
import { Timestamp } from "@angular/fire/firestore";

@Component({
  selector: 'app-jobsform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './jobsform.component.html',
  styleUrl: './jobsform.component.css'
})

export class JobsformComponent {
  data = inject(DataService);

  jobDetails: Job = {
    id: null,
    url: '',
    title: '',
    source: '',
    notes: '',
    company: '',
    timestamp: Timestamp.fromDate(new Date()),
    status: 'applied'
  }
  constructor() {}

  onSubmitForm(form: NgForm) {
      let formData = {...this.jobDetails};
      this.data.addJob(formData);
      form.resetForm();
  }

}
