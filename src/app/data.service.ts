import { computed, inject, Injectable, signal } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Job, Stats } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore: Firestore = inject(Firestore);
  private statsDocRef = this.getDocumentReference( "jobStats", "i7SetdpGJsaeEmvF5z3W");
  private stats = signal<Stats>({} as Stats);
  private jobs = signal<Job[]>([]);
  
  constructor() {
    this.getJobsFromDB();
    this.getStatsFromDB();
  }

  private setJobStatsDoc(stats: Stats) {
    this.stats.set(stats);
    setDoc(this.statsDocRef, stats);
  }

  public setWeeklyTotalToZero(stats: Stats) {
    this.setJobStatsDoc(stats)
  }

  private getDocumentReference( collection: string, document: string) {
    return doc(this.firestore, collection, document)
  }

  public async addJob(job: Job) {
    addDoc(collection(this.firestore, 'jobs'), job)
    .then((ref)=>{
      this.jobs.update( (currData)=>[...currData, {...job, id: ref.id}]);
    })
    let stats = this.getStats();
    let newState = {...stats(), weeklyCount: ++stats().weeklyCount, totalCount: ++stats().totalCount }
    this.setJobStatsDoc(newState);
    
  }

  private getJobsFromDB() {
    return getDocs(collection(this.firestore, "jobs"))
    .then((result)=>{
        let results: Job[] = [];
        result.forEach((doc)=> {
          let d = {...doc.data(), id:doc.id} as Job;
          results.push(d);
        });      
        this.jobs.set(results);
      });
  }

  public getJobs() {
    return computed(() => this.jobs())   
  }

  public setCount(stats: Stats) {
    this.setJobStatsDoc(stats);
  }

  private async getStatsFromDB() {
    getDoc(this.statsDocRef)
    .then((result) => {
      this.stats.set(result.data() as Stats);
    })
  }

  public getStats() {
    return computed(() => this.stats());
  }
}
