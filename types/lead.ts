// =========================
// Types
// =========================

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "detail_shared"
  | "interested"
  | "no_answer"
  | "busy"
  | "call_back_later"
  | "not_interested"
  | "follow_up"
  | "converted"
  | "rejected"
  | "lost";

export type LeadPriority = "low" | "medium" | "high";

export type FollowUpStatus = "pending" | "completed" | "missed";

export interface Note {
  text: string;
}

export interface FollowUp {
  date: string;
  type: string;
  channel: string;
  note: string;
  status: FollowUpStatus;
  completedAt?: string;
}

export interface LeadDetail {
  googleMapPinUrl?: string;      // long Google Maps URL (place/pin)
  googleMapShareLink?: string;   // short shareable link
}
export interface Lead {
  id: string;
  name: string;

  email?: string;

  mobiles: string[];

  whatsapp?: string;

  address?: string;

  owner?: string;

  city: string;

  status: LeadStatus;

  source: string;

  priority: LeadPriority;

  conversationChannel: string;

  details: LeadDetail;

  notes: Note[];

  followUps: FollowUp[];
}