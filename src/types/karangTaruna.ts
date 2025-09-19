export interface Income {
  id: string;
  date: string;
  source: string;
  amount: number;
  notes: string;
}

export interface Expense {
  id: string;
  date: string;
  purpose: string;
  amount: number;
  notes: string;
}

export interface MemberCash {
  id: string;
  name: string;
  totalCash: number;
  meetings: Record<string, boolean>; // date -> paid status
}

export interface Activity {
  id: string;
  date: string;
  name: string;
  location: string;
  status: 'planned' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Meeting {
  id: string;
  date: string;
  time: string;
  place: string;
  agenda: string;
}

export interface KarangTarunaData {
  income: Income[];
  expenses: Expense[];
  memberCash: MemberCash[];
  activities: Activity[];
  meetings: Meeting[];
  settings: {
    feePerMeeting: number;
    organizationName: string;
  };
}