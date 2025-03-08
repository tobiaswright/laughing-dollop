import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Stats } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore: Firestore = inject(Firestore);
  private statsDocRef = this.getDocumentReference( "jobStats", "i7SetdpGJsaeEmvF5z3W");

  constructor() {}

  private getJobStatsDoc() {
    return getDoc(this.statsDocRef);
  }

  private setJobStatsDoc(stats: Stats) {
    setDoc(this.statsDocRef, stats);
  }

  public setWeeklyTotalToZero(stats: Stats) {
    this.setJobStatsDoc(stats)
  }

  private getDocumentReference( collection: string, document: string) {
    return doc(this.firestore, collection, document)
  }

  public setCount(stats: Stats) {
    this.setJobStatsDoc(stats);
  }

  public getStats() {
    return this.getJobStatsDoc();
  }
}
