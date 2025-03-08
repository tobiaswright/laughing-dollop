import { Timestamp } from "@angular/fire/firestore";

export interface Stats {
  totalCount: number,
  weeklyCount: number,
  lastMonday: Timestamp
}