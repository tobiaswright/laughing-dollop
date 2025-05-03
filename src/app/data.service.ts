import { computed, inject, Injectable, OnInit, signal } from '@angular/core';
import { doc, Firestore, getDoc, setDoc, addDoc, collection, getDocs, Timestamp, deleteDoc  } from '@angular/fire/firestore';
import { Job, Stats } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {
  private firestore: Firestore = inject(Firestore);
  private statsDocRef = this.getDocumentReference( "jobStats", "i7SetdpGJsaeEmvF5z3W");
  private stats = signal<Stats>({} as Stats);
  private jobs = signal<Job[]>([]);
  
  constructor() {}

  ngOnInit(): void {}

  public start() {
    this.getJobsFromDB();
    this.getStatsFromDB();
  }

  private getDocumentReference( collection: string, document: string) {
    return doc(this.firestore, collection, document)
  }

  // Job Function
  public deleteJob(job: Job) {
    const jobDocRef = this.getDocumentReference("jobs", job.id!);
    deleteDoc(jobDocRef);
    this.jobs.update( (currJobs)=>{
      return currJobs.filter((currJob)=>currJob.id != job.id)
    });
  }

  public addJob(job: Job) {
    addDoc(collection(this.firestore, 'jobs'), job)
    .then((ref)=>{
      this.jobs.update( (currData)=>[...currData, {...job, id: ref.id}]);
    })
    let stats = this.getStats();
    let newState = {...stats(), weeklyCount: ++stats().weeklyCount, totalCount: ++stats().totalCount }
    this.setStats(newState);
  }

  public updateJob(job: Job) {
    const jobDocRef = this.getDocumentReference("jobs", job.id!);
    setDoc(jobDocRef, job);
    this.jobs.update( (currJobs)=>{
      let idx = currJobs.findIndex((job)=>job.id === job.id);
      currJobs[idx] = job;
      return currJobs;
    });
  }

  public getJobs() {
    return computed(() => {
      let jobs = this.jobs()
      jobs.sort( (a , b) => {
        return (b.timestamp).seconds - (a.timestamp).seconds
      });
      return jobs;
    })   
  }

  private getJobsFromDB() {
    getDocs(collection(this.firestore, "jobs"))
    .then((result)=>{
        let results: Job[] = [];
        result.forEach((doc)=> {
          let d = {...doc.data(), id:doc.id} as Job;
          results.push(d);
        });      
        this.jobs.set(results);
      });
  }

//Stats
  public setStats(stats: Stats) {
    this.stats.set(stats);
    setDoc(this.statsDocRef, stats);
  }

  public getStats() {
    return computed(() => this.stats());
  }

  private getStatsFromDB() {
    getDoc(this.statsDocRef)
    .then((result) => {
      this.stats.set(result.data() as Stats);
    })
  }
  
}
