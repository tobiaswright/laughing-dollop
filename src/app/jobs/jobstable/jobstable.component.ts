import { Component, effect, inject, OnInit, Signal, signal, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';
import { Job } from '../../app.model';
import { Observable } from 'rxjs';
import { JobEntryComponent } from "./job-entry/job-entry.component";

@Component({
  selector: 'app-jobstable',
  standalone: true,
  imports: [JobEntryComponent],
  templateUrl: './jobstable.component.html',
  styleUrl: './jobstable.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class JobstableComponent implements OnInit {
  data = inject(DataService);
  jobs = this.data.getJobs(); 

  constructor() {}
  ngOnInit(): void {}
}
