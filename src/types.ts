export interface Scholarship {
  id: string;
  name: string;
  ministry: string;
  description: string;
  amount: string;
  deadline: string;
  eligibility: string;
  category: 'pre-matric' | 'post-matric' | 'merit-cum-means' | 'special';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Aadhaar' | 'DBT' | 'NPCI' | 'General';
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  source: string;
  summary: string;
  category: 'Alert' | 'Update' | 'Stat';
}

export interface TrackingStatus {
  applicationId: string;
  studentName: string;
  scholarshipName: string;
  amount: string;
  stages: {
    name: string;
    status: 'completed' | 'pending' | 'failed';
    date?: string;
    details?: string;
    errorAlert?: boolean;
    errorType?: 'AadhaarSeeded' | 'AadhaarLinked' | 'BankValidation';
  }[];
  currentStage: number;
}
