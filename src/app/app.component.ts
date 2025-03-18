import { Component,  OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { WeeklyCounterComponent } from "./dashboard/weekly-counter/weekly-counter.component";
import { JobsformComponent } from './jobs/jobsform/jobsform.component';
import { JobstableComponent } from './jobs/jobstable/jobstable.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, WeeklyCounterComponent, JobsformComponent, JobstableComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'laughing-dollop';

}
