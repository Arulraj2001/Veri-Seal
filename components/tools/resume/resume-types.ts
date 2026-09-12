export type OperationalMode = 'resume' | 'cv' | 'biodata' | 'govt';

export type TemplateId =
  | 'ats_clean'
  | 'tech_modern'
  | 'executive_minimalist'
  | 'modern_two_column'
  | 'compact_one_page'
  | 'corporate_formal'
  | 'govt_psu_tabular'
  | 'traditional_biodata'
  | 'academic_cv'
  | 'creative_accent';

export type FontFamily = 'inter' | 'roboto' | 'merriweather' | 'outfit' | 'mono';

export type FontSizeScale = 'compact' | 'normal' | 'spacious';

export type LineSpacingScale = 'tight' | 'normal' | 'relaxed';

export interface WorkExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  employmentType: 'Full-time' | 'Contract' | 'Internship' | 'Freelance' | 'Remote';
  startDate: string; // e.g. "Jun 2022" or "2022-06"
  endDate: string;   // e.g. "Present" or "Aug 2024"
  isCurrent: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gradeOrCgpa: string;
  honors?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native / Bilingual' | 'Fluent' | 'Professional Working' | 'Intermediate' | 'Basic';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string[];
}

export interface CustomSection {
  id: string;
  heading: string;
  items: CustomSectionItem[];
}

export interface BioDataFields {
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | '';
  maritalStatus?: 'Single' | 'Married' | 'Unmarried' | '';
  nationality?: string;
  religion?: string;
  casteOrCommunity?: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  permanentAddress?: string;
  height?: string;
  bloodGroup?: string;
  declarationText?: string;
  declarationPlace?: string;
  declarationDate?: string;
}

export interface GovtPsuFields {
  category?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | '';
  domicileState?: string;
  languagesKnown?: string;
  serviceRecordNote?: string;
  totalExperienceYears?: string;
  disabilityStatus?: 'None' | 'PwBD (Yes)' | '';
}

export interface ResumeData {
  // Mode & Styling
  mode: OperationalMode;
  templateId: TemplateId;
  themeColor: string;
  fontFamily: FontFamily;
  fontSize: FontSizeScale;
  lineSpacing: LineSpacingScale;
  showPhoto: boolean;
  photoUrl: string;

  // Personal Contact Info
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  cityLocation: string;
  linkedInUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  summary: string;

  // Standard Sections
  experiences: WorkExperienceItem[];
  education: EducationItem[];
  skills: string[];
  skillCategories: {
    categoryName: string;
    skills: string[];
  }[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];

  // Specialized Bio-Data & Govt Fields
  biodata: BioDataFields;
  govt: GovtPsuFields;

  // Dynamic Custom Sections
  customSections: CustomSection[];
}

export interface AtsAuditCriterion {
  id: string;
  title: string;
  passed: boolean;
  weight: number;
  tip: string;
  fixAction?: string;
}

export interface AtsAuditResult {
  score: number; // 0 to 100
  grade: 'Needs Work' | 'Good' | 'Strong' | 'ATS Ready ★';
  criteria: AtsAuditCriterion[];
  matchedKeywords: string[];
  missingKeywords: string[];
  densityNotes: string;
}
