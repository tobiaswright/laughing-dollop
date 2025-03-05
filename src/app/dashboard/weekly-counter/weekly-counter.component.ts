import { AsyncPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { collection, collectionData, Firestore, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Item {
  counter: number
}

@Component({
  selector: 'app-weekly-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './weekly-counter.component.html',
  styleUrl: './weekly-counter.component.css'
})
export class WeeklyCounterComponent {

    firestore: Firestore = inject(Firestore);  
    aCollection = collection(this.firestore,"colorTest");

  // q = query(this.aCollection);
  items = toSignal(collectionData(this.aCollection));


// firestore: Firestore = inject(Firestore);
// statsCollection = collection(this.firestore,"jobStats");
// teest$: Observable<any>;
// items = toSignal(this.teest);
counter = 0;

constructor() {
  // this.teest$ = collectionData<any>(this.statsCollection);
  // this.teest$ =  collectionData(statsCollection)
  // console.log(this.statsCollection)
  effect(()=>{
    console.log("allod", this.items());
  })
  
  // this.item$ = collectionData(statsCollection) as Observable<any>
  // this.item$
  // console.log(this.item$)

}

advanceCounter() {
  const currentCount = this.counter++;
  // this.statsCollection.
}
}
