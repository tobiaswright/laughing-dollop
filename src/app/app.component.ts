import { Component, inject, OnInit } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { HeaderComponent } from "./header/header.component";
import { WeeklyCounterComponent } from "./dashboard/weekly-counter/weekly-counter.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, WeeklyCounterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'laughing-dollop';



  ngOnInit(): void {

  }
}
