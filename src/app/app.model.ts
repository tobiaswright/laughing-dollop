import { Timestamp } from "@angular/fire/firestore";

export interface Stats {
  totalCount: number,
  weeklyCount: number,
  lastMonday: Timestamp
}

export interface Job {
  url: string,
  title: string,
  source: string,
  notes: string,
  company: string,
  timestamp: Date,
  status: string
}