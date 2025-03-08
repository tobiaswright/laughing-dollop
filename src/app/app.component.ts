import { Component,  OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { WeeklyCounterComponent } from "./dashboard/weekly-counter/weekly-counter.component";
import { JobsformComponent } from './jobs/jobsform/jobsform.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, WeeklyCounterComponent, JobsformComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'laughing-dollop';

}
