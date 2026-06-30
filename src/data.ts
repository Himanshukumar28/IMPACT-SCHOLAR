import { Scholarship, FAQItem, NewsItem, TrackingStatus } from './types';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "NSP-PM-001",
    name: "Post-Matric Scholarship Scheme for SC Students",
    ministry: "Ministry of Social Justice & Empowerment",
    description: "Financial assistance for scheduled caste students pursuing post-matriculation or post-secondary courses to reduce dropouts.",
    amount: "₹12,000 per annum + Tuition Fee reimbursement",
    deadline: "2026-10-31",
    eligibility: "SC students, Family income < ₹2.5 Lakhs per annum, Studying in recognized colleges.",
    category: "post-matric"
  },
  {
    id: "NSP-PR-002",
    name: "Pre-Matric Scholarship for Minorities",
    ministry: "Ministry of Minority Affairs",
    description: "Encouraging parents from minority communities to send their school-going children to school and prevent school dropout.",
    amount: "₹5,000 per annum",
    deadline: "2026-09-15",
    eligibility: "Muslim, Christian, Sikh, Buddhist, Jain, Parsi; Marks > 50%; Family income < ₹1 Lakh per annum.",
    category: "pre-matric"
  },
  {
    id: "NSP-MCM-003",
    name: "Merit-cum-Means Scholarship for Professional Courses",
    ministry: "Ministry of Minority Affairs",
    description: "Financial support for minority community students to pursue professional and technical graduation/post-graduation.",
    amount: "₹20,000 per annum + Course Fee waiver",
    deadline: "2026-10-15",
    eligibility: "Admission in professional/technical course, Family income < ₹2.5 Lakhs per annum.",
    category: "merit-cum-means"
  },
  {
    id: "NSP-HE-004",
    name: "Central Sector Scheme of Scholarship for College & University Students",
    ministry: "Department of Higher Education",
    description: "Support for meritorious students from poor families to meet part of their day-to-day expenses while pursuing higher studies.",
    amount: "₹10,000/₹20,000 per annum",
    deadline: "2026-11-30",
    eligibility: "Above 80th percentile in Class 12th, Regular course, Family income < ₹4.5 Lakhs per annum.",
    category: "special"
  },
  {
    id: "NSP-IS-005",
    name: "Ishand Uday Special Scholarship for North Eastern Region",
    ministry: "University Grants Commission (UGC)",
    description: "Promoting higher education and encouraging students in the North Eastern Region of India.",
    amount: "₹5,400 per month (General) / ₹7,800 per month (Technical)",
    deadline: "2026-10-30",
    eligibility: "Domicile of NER, Passed Class 12th, Family income < ₹4.5 Lakhs per annum.",
    category: "special"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is the difference between Aadhaar Linkage and Aadhaar Seeding?",
    answer: "Aadhaar Linkage is a bank-level process where your Aadhaar is saved for identity verification (KYC). Aadhaar Seeding is a central process where your bank maps your Aadhaar with the National Payments Corporation of India (NPCI) mapper. Government DBT (Direct Benefit Transfer) scholarships are sent via the Aadhaar Payment Bridge System (APBS) which ONLY delivers funds to your NPCI-seeded account, NOT just any linked account.",
    category: "DBT"
  },
  {
    id: "faq-2",
    question: "Can I have my Aadhaar seeded in multiple bank accounts?",
    answer: "No. While your Aadhaar can be linked (KYC) to multiple bank accounts, it can only be seeded (for DBT) in ONE bank account at any given time. If you submit a seeding form to a new bank, your mapping will be transferred from your old bank to the new one.",
    category: "NPCI"
  },
  {
    id: "faq-3",
    question: "How do I check my current NPCI mapper status?",
    answer: "You can check it online through the UIDAI resident portal under 'Check Aadhaar/Bank Linking Status' or use the NPCI Mapping module on our portal to run a secure query.",
    category: "NPCI"
  },
  {
    id: "faq-4",
    question: "Why did my scholarship transfer fail even though my Aadhaar is linked to my bank?",
    answer: "This is the most common issue. Your Aadhaar is likely linked to your bank for KYC, but either (1) the bank has not seeded it to the central NPCI database, or (2) the DBT flag is disabled on your account, or (3) your seeded account has been marked inactive due to zero-transaction lockouts.",
    category: "Aadhaar"
  },
  {
    id: "faq-5",
    question: "What steps should I take to enable DBT on my bank account?",
    answer: "1. Visit your bank branch in person. 2. Ask for the 'Aadhaar Seeding and DBT Consent Form'. 3. Fill out the form, checking the box that explicitly authorizes the bank to link your account to the NPCI mapper for DBT receipts. 4. Ensure the bank uploads your request on the NPCI portal, which typically updates in 48-72 hours.",
    category: "DBT"
  },
  {
    id: "faq-6",
    question: "Does checking my NPCI mapping status affect my credit score or bank balance?",
    answer: "No, NPCI mapping status queries are secure read-only requests. They only fetch the name of the bank and the active seeding status from the central mapper database to verify eligibility.",
    category: "General"
  }
];

export const NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "Over 24% of Student Scholarship Rejections Caused by NPCI De-seeding",
    date: "2026-06-15",
    source: "NPCI Audit Division",
    summary: "A joint report by the PFMS and Ministry of Finance reveals that nearly a quarter of scholarship transactions fail due to inactive Aadhaar seeding or students opening new accounts without transferring their DBT consent.",
    category: "Alert"
  },
  {
    id: "news-2",
    title: "New One-Click Aadhaar Seeding Mandate Issued to Nationalized Banks",
    date: "2026-05-28",
    source: "Reserve Bank of India",
    summary: "The RBI has directed all public sector and commercial banks to implement instant mobile-banking and net-banking options for Aadhaar seeding to facilitate easier DBT processing for student benefits.",
    category: "Update"
  },
  {
    id: "news-3",
    title: "National Scholarship Portal Integrates Real-time Seeding Check",
    date: "2026-04-10",
    source: "NSP Admin Board",
    summary: "Students can now verify their NPCI mapping directly while filing applications, reducing transaction rejections in the upcoming 2026 academic calendar.",
    category: "Update"
  },
  {
    id: "news-4",
    title: "DBT Direct Transfers Cross ₹3,400 Crore in Education Sector",
    date: "2026-03-01",
    source: "UIDAI Statistics Office",
    summary: "The Government of India successfully disbursed scholarship benefits to over 85 lakh students. Seeding compliance rates reached a record high of 92.4% following intensive nationwide college awareness campaigns.",
    category: "Stat"
  }
];

export const TRACKING_RECORDS: TrackingStatus[] = [
  {
    applicationId: "SCH-2026-88741",
    studentName: "Priyanjali Sharma",
    scholarshipName: "Post-Matric Scholarship Scheme for SC Students",
    amount: "₹12,000",
    currentStage: 3,
    stages: [
      { name: "Application Submitted", status: "completed", date: "2026-01-10", details: "Form checked and registered." },
      { name: "Institute Verification", status: "completed", date: "2026-01-28", details: "Verified by IIT Delhi Registrar." },
      { name: "State Board Verification", status: "completed", date: "2026-02-15", details: "Approved by Haryana Social Welfare Directorate." },
      { name: "PFMS Payment Processing", status: "completed", date: "2026-03-01", details: "Token generated: TKN-99201." },
      { name: "DBT Aadhaar Dispatch", status: "completed", date: "2026-03-05", details: "Funds successfully credited to SBI A/C ending in *4829 via APBS Central Link." }
    ]
  },
  {
    applicationId: "SCH-2026-44102",
    studentName: "Amit Kumar Patel",
    scholarshipName: "Merit-cum-Means Scholarship for Professional Courses",
    amount: "₹20,000",
    currentStage: 3,
    stages: [
      { name: "Application Submitted", status: "completed", date: "2026-02-05", details: "Form verified successfully." },
      { name: "Institute Verification", status: "completed", date: "2026-02-18", details: "Approved by NIT Calicut Administration." },
      { name: "State Board Verification", status: "completed", date: "2026-03-05", details: "Approved by Gujarat Higher Education Cell." },
      { name: "PFMS Payment Processing", status: "failed", date: "2026-03-12", details: "REJECTED BY PFMS: No Active Aadhaar Seeding in NPCI Central Database.", errorAlert: true, errorType: "AadhaarSeeded" },
      { name: "DBT Aadhaar Dispatch", status: "pending", details: "Awaiting Aadhaar seeding updates on NPCI mapping." }
    ]
  },
  {
    applicationId: "SCH-2026-10559",
    studentName: "Rachel D'Souza",
    scholarshipName: "Pre-Matric Scholarship for Minorities",
    amount: "₹5,000",
    currentStage: 2,
    stages: [
      { name: "Application Submitted", status: "completed", date: "2026-02-12" },
      { name: "Institute Verification", status: "completed", date: "2026-02-25" },
      { name: "State Board Verification", status: "pending", details: "Currently in queue at State Minorities Directorate. Anticipated resolution: 7 working days." },
      { name: "PFMS Payment Processing", status: "pending" },
      { name: "DBT Aadhaar Dispatch", status: "pending" }
    ]
  },
  {
    applicationId: "SCH-2026-77312",
    studentName: "Vikram Aditya",
    scholarshipName: "Central Sector Scheme for College Students",
    amount: "₹15,000",
    currentStage: 3,
    stages: [
      { name: "Application Submitted", status: "completed", date: "2026-01-15" },
      { name: "Institute Verification", status: "completed", date: "2026-02-02" },
      { name: "State Board Verification", status: "completed", date: "2026-02-20" },
      { name: "PFMS Payment Processing", status: "failed", date: "2026-02-28", details: "TRANSACTION FAILED: Multiple accounts linked but DBT/APBS Flag disabled by Bank Branch.", errorAlert: true, errorType: "AadhaarLinked" },
      { name: "DBT Aadhaar Dispatch", status: "pending" }
    ]
  }
];
