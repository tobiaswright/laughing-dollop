import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { DataService } from '../../data.service';
import { Job } from '../../app.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jobstable',
  standalone: true,
  imports: [],
  templateUrl: './jobstable.component.html',
  styleUrl: './jobstable.component.css'
})
export class JobstableComponent implements OnInit {
  data = inject(DataService);
  jobs = this.data.getJobs(); 

  constructor() {}
  ngOnInit(): void {}
}
