import { ResumeData } from './resume-types';

export const EMPTY_RESUME_DATA: ResumeData = {
  mode: 'resume',
  templateId: 'ats_clean',
  themeColor: '#1E3A8A', // Classic Deep Navy
  fontFamily: 'inter',
  fontSize: 'normal',
  lineSpacing: 'normal',
  showPhoto: false,
  photoUrl: '',

  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  cityLocation: '',
  linkedInUrl: '',
  githubUrl: '',
  portfolioUrl: '',
  summary: '',

  experiences: [],
  education: [],
  skills: [],
  skillCategories: [
    { categoryName: 'Languages & Core', skills: [] },
    { categoryName: 'Frameworks & Libraries', skills: [] },
    { categoryName: 'Cloud & Databases', skills: [] },
  ],
  projects: [],
  certifications: [],
  languages: [],

  biodata: {
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationality: 'Indian',
    religion: '',
    casteOrCommunity: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    permanentAddress: '',
    height: '',
    bloodGroup: '',
    declarationText:
      'I hereby declare that all information furnished above is true and authentic to the best of my knowledge.',
    declarationPlace: '',
    declarationDate: new Date().toISOString().split('T')[0],
  },
  govt: {
    category: 'General',
    domicileState: '',
    languagesKnown: 'English, Hindi',
    serviceRecordNote: '',
    totalExperienceYears: '0',
    disabilityStatus: 'None',
  },
  customSections: [],
};

export const TECH_LEAD_SAMPLE_DATA: ResumeData = {
  mode: 'resume',
  templateId: 'tech_modern',
  themeColor: '#0F172A', // Slate Dark
  fontFamily: 'inter',
  fontSize: 'normal',
  lineSpacing: 'normal',
  showPhoto: false,
  photoUrl: '',

  fullName: 'Karthik Ramanathan',
  jobTitle: 'Senior Full Stack Engineer & Cloud Architect',
  email: 'karthik.ramanathan@example.com',
  phone: '+91 98401 23456',
  cityLocation: 'Bengaluru, Karnataka',
  linkedInUrl: 'linkedin.com/in/karthik-ramanathan',
  githubUrl: 'github.com/karthik-ramanathan',
  portfolioUrl: 'karthikramanathan.dev',
  summary:
    'Full Stack Engineer with 6+ years of production experience architecting high-throughput microservices, sub-second Next.js web applications, and event-driven AWS serverless systems. Proven track record reducing cloud infrastructure expenditure by 38% while scaling to 1.2M daily active users.',

  experiences: [
    {
      id: 'exp-1',
      company: 'Sovereign FinTech Labs',
      role: 'Staff Software Engineer',
      location: 'Bengaluru, India (Hybrid)',
      employmentType: 'Full-time',
      startDate: 'Aug 2022',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Architected real-time payment reconciliation microservice in Go & Kafka processing ₹140 Cr monthly transaction volume with 99.995% uptime SLA.',
        'Engineered high-performance Next.js 14 web client with TanStack Query and server components, slashing Largest Contentful Paint (LCP) from 3.2s to 640ms.',
        'Spearheaded migration of 14 Docker containers to AWS EKS with Terraform, reducing AWS compute spending by $4,200 monthly.',
        'Mentored 8 mid-level and junior developers in test-driven development (TDD), achieving 94% unit test branch coverage across core repositories.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Zenith Health Systems',
      role: 'Senior Full Stack Developer',
      location: 'Hyderabad, India',
      employmentType: 'Full-time',
      startDate: 'Jan 2020',
      endDate: 'Jul 2022',
      isCurrent: false,
      bullets: [
        'Developed end-to-end HIPAA-compliant patient diagnostics portal using React, Node.js, and PostgreSQL, serving 280+ clinical hospitals nationwide.',
        'Implemented distributed Redis caching tier that trimmed average API response latency by 62% under peak morning OPD load.',
        'Integrated automated CI/CD deployment pipelines using GitHub Actions, enabling zero-downtime canary releases 3 times weekly.',
      ],
    },
  ],

  education: [
    {
      id: 'edu-1',
      institution: 'National Institute of Technology (NIT) Tiruchirappalli',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering',
      location: 'Tamil Nadu, India',
      startDate: '2015',
      endDate: '2019',
      gradeOrCgpa: '8.92 / 10.0 CGPA',
      honors: 'First Class with Distinction',
    },
  ],

  skills: [
    'TypeScript',
    'Next.js',
    'React',
    'Node.js',
    'Go (Golang)',
    'Python',
    'PostgreSQL',
    'Redis',
    'Kafka',
    'Docker',
    'Kubernetes',
    'AWS (Lambda, S3, EKS)',
    'Terraform',
    'Tailwind CSS',
    'GraphQL',
    'REST APIs',
    'CI/CD Pipelines',
  ],

  skillCategories: [
    {
      categoryName: 'Languages & Core',
      skills: ['TypeScript', 'JavaScript (ES6+)', 'Go (Golang)', 'Python', 'SQL'],
    },
    {
      categoryName: 'Frameworks & Frontend',
      skills: ['Next.js 14', 'React 18', 'Tailwind CSS', 'Redux Toolkit', 'TanStack Query'],
    },
    {
      categoryName: 'Backend & Cloud DevOps',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AWS', 'Terraform'],
    },
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'Kagazo Core: In-Browser Cryptographic PDF Verifier',
      liveUrl: 'https://kagazo.in',
      githubUrl: 'https://github.com/Arulraj2001/kagazo',
      technologies: ['TypeScript', 'Web Crypto API', 'Next.js', 'Tailwind CSS'],
      bullets: [
        'Engineered pure in-memory client-side PKI digital signature parser verifying X.509 certificates and SHA-256 digests in under 120ms with 0 byte server transmission.',
        'Surpassed 45,000 monthly active users across India with 100/100 Google Lighthouse Core Web Vitals score.',
      ],
    },
    {
      id: 'proj-2',
      title: 'DistriCache: High-Performance Distributed Memory Store',
      githubUrl: 'https://github.com/example/districache',
      technologies: ['Go', 'Raft Consensus', 'gRPC', 'Protobuf'],
      bullets: [
        'Created distributed key-value cache engine supporting Raft consensus protocol capable of handling 85,000 requests per second at sub-millisecond p99 latency.',
      ],
    },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional (SAP-C02)',
      issuer: 'Amazon Web Services',
      issueDate: 'Sep 2023',
      expiryDate: 'Sep 2026',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      issueDate: 'Mar 2022',
      expiryDate: 'Mar 2025',
    },
  ],

  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native / Bilingual' },
    { id: 'lang-2', language: 'Tamil', proficiency: 'Native / Bilingual' },
    { id: 'lang-3', language: 'Hindi', proficiency: 'Professional Working' },
  ],

  biodata: {
    nationality: 'Indian',
    declarationText: 'I hereby certify that all information provided is accurate and verifiable.',
    declarationDate: new Date().toISOString().split('T')[0],
  },
  govt: {
    category: 'General',
    domicileState: 'Karnataka',
    languagesKnown: 'English, Tamil, Hindi',
    totalExperienceYears: '6.5',
  },
  customSections: [],
};

export const FRESHER_CS_SAMPLE_DATA: ResumeData = {
  mode: 'resume',
  templateId: 'compact_one_page',
  themeColor: '#2563EB', // Royal Blue
  fontFamily: 'inter',
  fontSize: 'compact',
  lineSpacing: 'tight',
  showPhoto: false,
  photoUrl: '',

  fullName: 'Ananya Deshmukh',
  jobTitle: 'Software Development Engineer (SDE Fresher)',
  email: 'ananya.deshmukh@gmail.com',
  phone: '+91 91234 56789',
  cityLocation: 'Pune, Maharashtra',
  linkedInUrl: 'linkedin.com/in/ananya-deshmukh',
  githubUrl: 'github.com/ananya-code',
  portfolioUrl: 'ananyadeshmukh.vercel.app',
  summary:
    'Computer Engineering graduate with solid foundations in Data Structures, Algorithms, and Modern Web Systems. Solved 450+ problems on LeetCode (Rating 1840). Built 3 production-grade full-stack web applications with Next.js, PostgreSQL, and Node.js. Seeking entry-level SDE role.',

  experiences: [
    {
      id: 'exp-fresher-1',
      company: 'Cognitive Cloud Labs',
      role: 'Software Engineering Intern',
      location: 'Pune, India',
      employmentType: 'Internship',
      startDate: 'Jan 2024',
      endDate: 'Jun 2024',
      isCurrent: false,
      bullets: [
        'Built automated unit test suite using Jest and React Testing Library, boosting code coverage from 58% to 86%.',
        'Contributed to customer onboarding dashboard using React and Tailwind CSS, reducing form completion drop-off by 18%.',
        'Optimized PostgreSQL index queries for high-volume transactions, decreasing average query latency from 240ms to 45ms.',
      ],
    },
  ],

  education: [
    {
      id: 'edu-fresher-1',
      institution: 'Pune Institute of Computer Technology (PICT)',
      degree: 'B.E. in Computer Engineering',
      fieldOfStudy: 'Computer Science',
      location: 'Pune, Maharashtra',
      startDate: '2020',
      endDate: '2024',
      gradeOrCgpa: '9.14 / 10.0 CGPA',
      honors: 'Top 5% in Department',
    },
  ],

  skills: [
    'Java',
    'C++',
    'Python',
    'JavaScript',
    'TypeScript',
    'React',
    'Node.js',
    'Express',
    'PostgreSQL',
    'MongoDB',
    'Git',
    'Docker',
    'Data Structures & Algorithms',
    'OOPs',
    'DBMS',
    'Operating Systems',
  ],

  skillCategories: [
    {
      categoryName: 'Core Competencies',
      skills: ['Data Structures & Algorithms', 'Object Oriented Programming (OOP)', 'DBMS', 'Operating Systems'],
    },
    {
      categoryName: 'Languages & Web',
      skills: ['Java', 'C++', 'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    },
  ],

  projects: [
    {
      id: 'proj-f-1',
      title: 'EduTrack: Real-Time Exam Hall Ticket & Cutoff Engine',
      liveUrl: 'https://edutrack-app.vercel.app',
      githubUrl: 'https://github.com/ananya-code/edutrack',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
      bullets: [
        'Built full-stack educational score counseling engine used by 12,000+ engineering aspirants with sub-100ms response time.',
        'Integrated automated PDF hall ticket generation directly in browser memory without server disk load.',
      ],
    },
    {
      id: 'proj-f-2',
      title: 'SmartDocs: AI-Powered Resume & Markdown Parser',
      githubUrl: 'https://github.com/ananya-code/smartdocs',
      technologies: ['Python', 'FastAPI', 'spaCy', 'Docker'],
      bullets: [
        'Implemented NLP entity extraction pipeline parsing skills and experience with 92% semantic precision.',
      ],
    },
  ],

  certifications: [
    {
      id: 'cert-f-1',
      name: 'HackerRank Problem Solving (Advanced) & SQL Gold Badge',
      issuer: 'HackerRank',
      issueDate: '2023',
    },
  ],

  languages: [
    { id: 'lang-f-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-f-2', language: 'Marathi', proficiency: 'Native / Bilingual' },
    { id: 'lang-f-3', language: 'Hindi', proficiency: 'Fluent' },
  ],

  biodata: {
    nationality: 'Indian',
  },
  govt: {
    category: 'General',
  },
  customSections: [],
};

export const GOVT_PSU_SAMPLE_DATA: ResumeData = {
  mode: 'govt',
  templateId: 'govt_psu_tabular',
  themeColor: '#1E293B',
  fontFamily: 'roboto',
  fontSize: 'normal',
  lineSpacing: 'normal',
  showPhoto: true,
  photoUrl: '',

  fullName: 'Rajesh Kumar Verma',
  jobTitle: 'Applicant for Executive Engineer / PSU Officer Grade',
  email: 'rajesh.verma.gov@gmail.com',
  phone: '+91 94150 98765',
  cityLocation: 'Lucknow, Uttar Pradesh',
  linkedInUrl: '',
  githubUrl: '',
  portfolioUrl: '',
  summary:
    'Dedicated engineering professional with 4 years of proven field and managerial experience in public infrastructure, tendering compliance, quality assurance, and government procurement procedures. Seeking Executive Officer grade role.',

  experiences: [
    {
      id: 'exp-g-1',
      company: 'Uttar Pradesh State Bridge Corporation Ltd',
      role: 'Assistant Project Engineer (Civil)',
      location: 'Lucknow, UP',
      employmentType: 'Full-time',
      startDate: 'Jul 2021',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Supervised execution of 2 major 4-lane elevated corridor construction packages with a total project outlay of ₹82 Crore.',
        'Conducted rigorous quality control testing on cement concrete grades (M-40/M-50) and pre-stressed girder alignment in accordance with IRC / MoRTH standards.',
        'Prepared measurement book (MB) records, contractor RA bills, and statutory compliance files with zero audit objections.',
      ],
    },
  ],

  education: [
    {
      id: 'edu-g-1',
      institution: 'Madan Mohan Malaviya University of Technology (MMMUT)',
      degree: 'B.Tech in Civil Engineering',
      fieldOfStudy: 'Engineering',
      location: 'Gorakhpur, UP',
      startDate: '2016',
      endDate: '2020',
      gradeOrCgpa: '81.4%',
      honors: 'First Division with Honors',
    },
    {
      id: 'edu-g-2',
      institution: 'Government Intermediate College',
      degree: 'Class XII (UP Board)',
      fieldOfStudy: 'PCM & English',
      location: 'Lucknow, UP',
      startDate: '2014',
      endDate: '2015',
      gradeOrCgpa: '84.6%',
    },
  ],

  skills: [
    'AutoCAD Civil',
    'Structural Analysis',
    'Total Station Surveying',
    'MoRTH Specifications',
    'Geotechnical Soil Mechanics',
    'e-Tendering (GeM Portal)',
    'Bill of Quantities (BOQ)',
    'MS Project & Office',
  ],

  skillCategories: [],
  projects: [],
  certifications: [
    {
      id: 'cert-g-1',
      name: 'GATE Qualified in Civil Engineering (98.4 Percentile)',
      issuer: 'IIT Kharagpur / Ministry of Education',
      issueDate: '2020',
    },
  ],
  languages: [
    { id: 'lang-g-1', language: 'Hindi', proficiency: 'Native / Bilingual' },
    { id: 'lang-g-2', language: 'English', proficiency: 'Professional Working' },
  ],

  biodata: {
    dateOfBirth: '1998-05-14',
    gender: 'Male',
    maritalStatus: 'Single',
    nationality: 'Indian',
    fatherName: 'Shri Ramakant Verma',
    fatherOccupation: 'Retired Government Officer',
    motherName: 'Smt. Shanti Devi',
    permanentAddress: 'House No. 44-B, Sector 6, Indira Nagar, Lucknow, UP - 226016',
    declarationText:
      'I hereby solemnly declare that all statements made in this application are true, complete, and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect, my candidature will stand canceled.',
    declarationPlace: 'Lucknow',
    declarationDate: new Date().toISOString().split('T')[0],
  },

  govt: {
    category: 'OBC',
    domicileState: 'Uttar Pradesh',
    languagesKnown: 'Hindi, English',
    totalExperienceYears: '3.2',
    disabilityStatus: 'None',
  },

  customSections: [],
};

export const TRADITIONAL_BIODATA_SAMPLE_DATA: ResumeData = {
  mode: 'biodata',
  templateId: 'traditional_biodata',
  themeColor: '#7C2D12', // Warm Maroon / Indian Gold
  fontFamily: 'merriweather',
  fontSize: 'normal',
  lineSpacing: 'normal',
  showPhoto: true,
  photoUrl: '',

  fullName: 'Suresh Kumar Sharma',
  jobTitle: 'Senior Financial Analyst & Investment Consultant',
  email: 'suresh.sharma@example.com',
  phone: '+91 98200 11223',
  cityLocation: 'Mumbai, Maharashtra',
  linkedInUrl: '',
  githubUrl: '',
  portfolioUrl: '',
  summary:
    'Qualified Chartered Financial Analyst (CFA) with strong family values and professional track record in corporate debt restructuring and wealth advisory.',

  experiences: [
    {
      id: 'exp-b-1',
      company: 'Kotak Wealth Advisors',
      role: 'Senior Financial Consultant',
      location: 'Mumbai',
      employmentType: 'Full-time',
      startDate: '2021',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Managing high net-worth client portfolios exceeding ₹45 Crore with disciplined asset allocation.',
      ],
    },
  ],

  education: [
    {
      id: 'edu-b-1',
      institution: 'Narsee Monjee Institute of Management Studies (NMIMS)',
      degree: 'Master of Business Administration (MBA)',
      fieldOfStudy: 'Finance',
      location: 'Mumbai',
      startDate: '2019',
      endDate: '2021',
      gradeOrCgpa: '8.4 CGPA',
    },
    {
      id: 'edu-b-2',
      institution: 'Sydenham College of Commerce and Economics',
      degree: 'Bachelor of Commerce (B.Com)',
      fieldOfStudy: 'Accountancy & Audit',
      location: 'Mumbai',
      startDate: '2016',
      endDate: '2019',
      gradeOrCgpa: 'First Class',
    },
  ],

  skills: ['Financial Modeling', 'Wealth Management', 'Risk Assessment', 'Taxation Advisory'],
  skillCategories: [],
  projects: [],
  certifications: [
    {
      id: 'cert-b-1',
      name: 'CFA Charterholder (Level III Passed)',
      issuer: 'CFA Institute, USA',
      issueDate: '2022',
    },
  ],
  languages: [
    { id: 'lang-b-1', language: 'English', proficiency: 'Fluent' },
    { id: 'lang-b-2', language: 'Hindi', proficiency: 'Native / Bilingual' },
    { id: 'lang-b-3', language: 'Gujarati', proficiency: 'Fluent' },
  ],

  biodata: {
    dateOfBirth: '1997-11-20',
    gender: 'Male',
    maritalStatus: 'Unmarried',
    nationality: 'Indian',
    religion: 'Hindu',
    casteOrCommunity: 'Brahmin',
    height: "5' 10\" (178 cm)",
    bloodGroup: 'B+ Positive',
    fatherName: 'Shri Vinod Sharma',
    fatherOccupation: 'Senior Executive, Life Insurance Corporation (LIC)',
    motherName: 'Smt. Geeta Sharma',
    permanentAddress: 'B-304, Gokul Heights, Borivali West, Mumbai, Maharashtra - 400092',
    declarationText: 'I hereby declare that the particulars stated above are authentic and complete.',
    declarationPlace: 'Mumbai',
    declarationDate: new Date().toISOString().split('T')[0],
  },

  govt: {
    category: 'General',
  },
  customSections: [],
};
