import { Timestamp } from "@angular/fire/firestore";

export interface Stats {
  totalCount: number,
  weeklyCount: number,
  lastMonday: Timestamp
}

export interface Job {
  id: string | null,
  url: string,
  title: string,
  source: string,
  notes: string,
  company: string,
  timestamp: Timestamp,
  status: string
  contact: string
  // status: 'applied' | 'rejected' | 'screening' | 'interview' | 'techinical' | 'offer'
}