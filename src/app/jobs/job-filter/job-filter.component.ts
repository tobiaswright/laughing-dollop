import { Component, inject, signal } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-job-filter',
  imports: [],
  templateUrl: './job-filter.component.html',
  styleUrl: './job-filter.component.css'
})
export class JobFilterComponent {
  dataService = inject( DataService )
  filterQuery = signal<string>('');

  onFilterUpdate(str:string) {
    this.dataService.fllterByCompany(str)
  }
}
