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

  //db functions
  private deleteJobDoc(job: Job) {
    const jobDocRef = this.getDocumentReference( "jobs", job.id as string);
    deleteDoc(jobDocRef);
  }

  // Job Function
  public deleteJob(job: Job) {
    this.jobs.update( (currJobs)=>{
      return currJobs.filter((currJob)=>currJob.id != job.id)
    });  
    this.deleteJobDoc(job)
  }

  private setJobDoc(job: Job) {
    const jobDocRef = this.getDocumentReference( "jobs", job.id as string);
    setDoc(jobDocRef, job);
  }

  public async addJob(job: Job) {
    addDoc(collection(this.firestore, 'jobs'), job)
    .then((ref)=>{
      this.jobs.update( (currData)=>[...currData, {...job, id: ref.id}]);
    })
    let stats = this.getStats();
    let newState = {...stats(), weeklyCount: ++stats().weeklyCount, totalCount: ++stats().totalCount }
    this.setStats(newState);
    
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

  public getJobs() {
    return computed(() => {
      let jobs = this.jobs()
      jobs.sort( (a , b) => {
        //TODO: Fix type to be Timestamp instead on Date
        return (b.timestamp as unknown as Timestamp).seconds - (a.timestamp as unknown as Timestamp).seconds
      });
      return jobs;
    })   
  }

  public setStatus(selectedJob: Job) {
    this.jobs.update( (currJobs)=>{
      let idx = currJobs.findIndex((job)=>job.id === selectedJob.id);
      currJobs[idx] = selectedJob;
      return currJobs;
    });

    this.setJobDoc(selectedJob);
  }

//Stats
  public setStats(stats: Stats) {
    this.stats.set(stats);
    setDoc(this.statsDocRef, stats);
  }

  public getStats() {
    return computed(() => this.stats());
  }

  private async getStatsFromDB() {
    getDoc(this.statsDocRef)
    .then((result) => {
      this.stats.set(result.data() as Stats);
    })
  }
  
}
