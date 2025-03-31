import { Component,  inject,  OnInit } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { WeeklyCounterComponent } from "./dashboard/weekly-counter/weekly-counter.component";
import { JobsformComponent } from './jobs/jobsform/jobsform.component';
import { JobstableComponent } from './jobs/jobstable/jobstable.component';
import { DataService } from './data.service';
import { Auth,signInWithEmailAndPassword } from '@angular/fire/auth';
import { credentials } from '../environments/credentials'

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, WeeklyCounterComponent, JobsformComponent, JobstableComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'laughing-dollop';
  private data: DataService = inject(DataService);
  private auth = inject(Auth);

  ngOnInit(): void {
    signInWithEmailAndPassword(this.auth, credentials.email, credentials.pass)
    .then((userCredential) => {
      const user = userCredential.user;
      this.data.start();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

}
