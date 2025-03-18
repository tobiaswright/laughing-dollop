import { computed, inject, Injectable, signal } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { Job, Stats } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private firestore: Firestore = inject(Firestore);
  private statsDocRef = this.getDocumentReference( "jobStats", "i7SetdpGJsaeEmvF5z3W");
  private jobs = signal<Job[]>([]);
  
  constructor() {
    this.getJobsFromDB();
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

  public async addJob(job: Job) {
    addDoc(collection(this.firestore, 'jobs'), job)
    .then((ref)=>{
      console.log(job)
      this.jobs.update( (currData)=>[...currData, {...job, id: ref.id}]);
      console.log(ref.id, this.jobs())
    })
    // let result = await this.getStats();
    // let stats = result.data() as Stats;
    // let newState = {...stats, weeklyCount: ++stats.weeklyCount, totalCount: ++stats.totalCount }
    // this.setJobStatsDoc(newState);
    
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
      });;   
  }

  public getJobs() {
    return computed(() => this.jobs())   
  }

  public setCount(stats: Stats) {
    this.setJobStatsDoc(stats);
  }

  public async getStats() {
    return await getDoc(this.statsDocRef);
  }
}
