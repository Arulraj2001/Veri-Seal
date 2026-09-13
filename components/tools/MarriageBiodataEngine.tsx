'use client';

import * as React from 'react';
import {
  Download,
  Share2,
  Printer,
  Sparkles,
  Upload,
  Trash2,
  Check,
  User,
  Heart,
  Briefcase,
  Home,
  Phone,
  Compass,
  Palette,
  Eye,
  RefreshCw,
  FileDown,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export type BiodataThemeId =
  | 'vedic'
  | 'royal'
  | 'south_indian'
  | 'modern'
  | 'islamic'
  | 'christian';

export type ReligiousSymbolId =
  | 'ganesha'
  | 'om'
  | 'swastik'
  | 'balaji'
  | 'shiva'
  | 'ek_onkar'
  | 'bismillah'
  | 'cross'
  | 'none';

export interface BiodataData {
  // Header
  title: string;
  symbol: ReligiousSymbolId;
  symbolCustomText?: string;
  theme: BiodataThemeId;

  // Personal
  fullName: string;
  gender: 'male' | 'female';
  dob: string;
  tob: string;
  pob: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  motherTongue: string;
  maritalStatus: string;
  diet: string;

  // Photo
  photoUrl: string | null;
  photoShape: 'oval' | 'rounded' | 'square' | 'none';

  // Astrology / Religion
  showAstrology: boolean;
  religion: string;
  caste: string;
  subCaste: string;
  gothram: string;
  rashi: string;
  nakshatra: string;
  manglik: string;
  horoscopeMatch: string;

  // Education & Career
  education: string;
  college: string;
  occupation: string;
  organization: string;
  annualIncome: string;
  workLocation: string;

  // Family Background
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brothers: string;
  sisters: string;
  familyType: string;
  familyValues: string;
  nativePlace: string;

  // Contact Details
  contactPerson: string;
  contactNumber: string;
  contactEmail: string;
  residentialAddress: string;
  aboutMe: string;
  partnerExpectations: string;
}

const INITIAL_BIODATA: BiodataData = {
  title: 'MARRIAGE BIO-DATA',
  symbol: 'ganesha',
  symbolCustomText: '॥ श्री गणेशाय नमः ॥',
  theme: 'vedic',

  fullName: 'Arjun R. Sharma',
  gender: 'male',
  dob: '15 August 1996',
  tob: '06:45 AM',
  pob: 'Jaipur, Rajasthan',
  height: "5' 11\" (180 cm)",
  weight: '72 kg',
  complexion: 'Fair',
  bloodGroup: 'B+ Positive',
  motherTongue: 'Hindi',
  maritalStatus: 'Never Married',
  diet: 'Vegetarian',

  photoUrl: null,
  photoShape: 'rounded',

  showAstrology: true,
  religion: 'Hindu',
  caste: 'Brahmin',
  subCaste: 'Gour',
  gothram: 'Kashyap',
  rashi: 'Simha (Leo)',
  nakshatra: 'Magha',
  manglik: 'Non-Manglik',
  horoscopeMatch: 'Kundali Available on Request',

  education: 'B.Tech in Computer Science (IIT Delhi)',
  college: 'Indian Institute of Technology, Delhi',
  occupation: 'Staff Software Engineer',
  organization: 'Google India',
  annualIncome: '₹ 42 LPA',
  workLocation: 'Bengaluru, Karnataka',

  fatherName: 'Dr. Ramesh Sharma',
  fatherOccupation: 'Senior Medical Specialist (Govt. Hospital)',
  motherName: 'Mrs. Sunita Sharma',
  motherOccupation: 'Professor of English Literature',
  brothers: '1 Younger Brother (Pursuing MBA at IIM-B)',
  sisters: 'None',
  familyType: 'Nuclear Family',
  familyValues: 'Moderate & Traditional',
  nativePlace: 'Jaipur, Rajasthan',

  contactPerson: 'Dr. Ramesh Sharma (Father)',
  contactNumber: '+91 98765 43210',
  contactEmail: 'sharma.family.jaipur@gmail.com',
  residentialAddress: 'Flat 402, Royal Palms Enclave, Vaishali Nagar, Jaipur - 302021',
  aboutMe: 'Passionate tech professional with deep cultural roots, fond of Indian classical music, weekend cycling, and travel.',
  partnerExpectations: 'Looking for an educated, understanding partner with traditional family values and a progressive outlook.',
};

const SAMPLE_PROFILES: Record<string, Partial<BiodataData>> = {
  hindu_groom: {
    ...INITIAL_BIODATA,
    symbol: 'ganesha',
    symbolCustomText: '॥ श्री गणेशाय नमः ॥',
    theme: 'vedic',
  },
  hindu_bride: {
    title: 'MARRIAGE BIO-DATA',
    symbol: 'balaji',
    symbolCustomText: '॥ ॐ नमो नारायणाय ॥',
    theme: 'royal',
    fullName: 'Priyanka S. Iyer',
    gender: 'female',
    dob: '22 October 1998',
    tob: '08:20 AM',
    pob: 'Chennai, Tamil Nadu',
    height: "5' 5\" (165 cm)",
    weight: '56 kg',
    complexion: 'Very Fair',
    bloodGroup: 'O+ Positive',
    motherTongue: 'Tamil',
    maritalStatus: 'Never Married',
    diet: 'Vegetarian',
    photoUrl: null,
    photoShape: 'oval',
    showAstrology: true,
    religion: 'Hindu',
    caste: 'Iyer (Vadama)',
    subCaste: 'Vadama',
    gothram: 'Bharadwaja',
    rashi: 'Kanya (Virgo)',
    nakshatra: 'Hastham',
    manglik: 'No Dosham',
    horoscopeMatch: 'Horoscope Matched',
    education: 'M.Arch (Master of Architecture, CEPT University)',
    college: 'CEPT University, Ahmedabad',
    occupation: 'Senior Urban Designer & Architect',
    organization: 'Foster + Partners (India)',
    annualIncome: '₹ 22 LPA',
    workLocation: 'Mumbai, Maharashtra',
    fatherName: 'Mr. S. Subramanian',
    fatherOccupation: 'Retired General Manager (Reserve Bank of India)',
    motherName: 'Mrs. Lakshmi Subramanian',
    motherOccupation: 'Carnatic Music Teacher & Homemaker',
    brothers: '1 Elder Brother (Married, VP at Barclays Singapore)',
    sisters: 'None',
    familyType: 'Upper Middle Class Nuclear',
    familyValues: 'Traditional & Cultured',
    nativePlace: 'Thanjavur, Tamil Nadu',
    contactPerson: 'Mr. S. Subramanian (Father)',
    contactNumber: '+91 94440 12345',
    contactEmail: 'subramanian.priyanka98@gmail.com',
    residentialAddress: 'No. 14, 4th Main Road, Gandhi Nagar, Adyar, Chennai - 600020',
    aboutMe: 'Trained Bharatanatyam dancer, avid architectural sketcher, and enthusiast of literature and heritage travel.',
    partnerExpectations: 'Seeking a caring, well-educated Tamil Brahmin professional who respects family warmth and shared aspirations.',
  },
  south_indian: {
    title: 'MATRIMONIAL BIO-DATA',
    symbol: 'om',
    symbolCustomText: '॥ ॐ ॥',
    theme: 'south_indian',
    fullName: 'Karthik Raja M.',
    gender: 'male',
    dob: '04 March 1995',
    tob: '10:15 AM',
    pob: 'Coimbatore, Tamil Nadu',
    height: "5' 10\" (178 cm)",
    weight: '70 kg',
    complexion: 'Wheatish',
    bloodGroup: 'A+ Positive',
    motherTongue: 'Tamil',
    maritalStatus: 'Never Married',
    diet: 'Non-Vegetarian',
    photoUrl: null,
    photoShape: 'rounded',
    showAstrology: true,
    religion: 'Hindu',
    caste: 'Kongu Vellalar',
    subCaste: 'Sengunthar',
    gothram: 'Villayan',
    rashi: 'Mesham (Aries)',
    nakshatra: 'Ashwini',
    manglik: 'No Chevvai Dosham',
    horoscopeMatch: 'Jathagam Available',
    education: 'B.E. Mechanical & M.S. (RWTH Aachen, Germany)',
    college: 'PSG College of Technology',
    occupation: 'Assistant Executive Engineer',
    organization: 'Tamil Nadu Generation & Distribution Corp (TANGEDCO)',
    annualIncome: '₹ 18 LPA + Govt Benefits',
    workLocation: 'Coimbatore, Tamil Nadu',
    fatherName: 'Mr. Muthuswamy K.',
    fatherOccupation: 'Agriculturist & Textile Entrepreneur',
    motherName: 'Mrs. Parvathi Muthuswamy',
    motherOccupation: 'Homemaker',
    brothers: 'None',
    sisters: '1 Younger Sister (Married, Settled in Bengaluru)',
    familyType: 'Joint Family with Strong Community Roots',
    familyValues: 'Traditional & Dignified',
    nativePlace: 'Pollachi, Coimbatore',
    contactPerson: 'Mr. Muthuswamy K. (Father)',
    contactNumber: '+91 98422 78901',
    contactEmail: 'muthuswamy.pollachi@gmail.com',
    residentialAddress: 'Green Fields Estate, Anaimalai Road, Pollachi - 642001',
    aboutMe: 'Balanced individual combining agricultural roots with modern engineering career, passionate about sustainable farming and badmition.',
    partnerExpectations: 'Looking for a warm, family-oriented partner from a respected background who appreciates mutual respect.',
  },
  islamic_nikah: {
    title: 'NIKAH MATRIMONIAL PROFILE',
    symbol: 'bismillah',
    symbolCustomText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    theme: 'islamic',
    fullName: 'Dr. Mohammed Farhan Baig',
    gender: 'male',
    dob: '12 November 1994',
    tob: '04:30 PM',
    pob: 'Hyderabad, Telangana',
    height: "5' 11\" (180 cm)",
    weight: '75 kg',
    complexion: 'Fair',
    bloodGroup: 'B+ Positive',
    motherTongue: 'Urdu',
    maritalStatus: 'Never Married',
    diet: 'Halal Non-Vegetarian',
    photoUrl: null,
    photoShape: 'square',
    showAstrology: false,
    religion: 'Islam (Sunni)',
    caste: 'Sheikh',
    subCaste: 'Siddiqui',
    gothram: '',
    rashi: '',
    nakshatra: '',
    manglik: '',
    horoscopeMatch: '',
    education: 'MBBS, MD in General Medicine (Osmania Medical College)',
    college: 'Osmania Medical College, Hyderabad',
    occupation: 'Consultant Physician & Intensivist',
    organization: 'Apollo Hospitals, Jubilee Hills',
    annualIncome: '₹ 32 LPA',
    workLocation: 'Hyderabad, Telangana',
    fatherName: 'Mirza Abdul Baig',
    fatherOccupation: 'Retired Chief Engineer (PWD Telangana)',
    motherName: 'Mrs. Farzana Begum',
    motherOccupation: 'Homemaker',
    brothers: '1 Elder Brother (Software Architect in Dubai)',
    sisters: '1 Younger Sister (Married to an Architect in UK)',
    familyType: 'Educated Decent Family',
    familyValues: 'Deeni, Practicing & Modern',
    nativePlace: 'Hyderabad, Telangana',
    contactPerson: 'Mirza Abdul Baig (Father)',
    contactNumber: '+91 98490 65432',
    contactEmail: 'baigfamily.hyd@gmail.com',
    residentialAddress: 'Plot No. 84, Road No. 12, Banjara Hills, Hyderabad - 500034',
    aboutMe: 'Practicing Muslim who performs 5 daily prayers, dedicated to healthcare service with interest in Islamic history and reading.',
    partnerExpectations: 'Seeking a pious, educated, Deen-conscious Sunni girl from a respected family who values mutual respect and Islamic values.',
  },
  christian_profile: {
    title: 'MARRIAGE BIO-DATA',
    symbol: 'cross',
    symbolCustomText: '† In God We Trust †',
    theme: 'christian',
    fullName: 'Kevin Joseph Mathew',
    gender: 'male',
    dob: '28 July 1996',
    tob: '02:15 PM',
    pob: 'Kochi, Kerala',
    height: "6' 0\" (183 cm)",
    weight: '76 kg',
    complexion: 'Fair',
    bloodGroup: 'O+ Positive',
    motherTongue: 'Malayalam & English',
    maritalStatus: 'Never Married',
    diet: 'Non-Vegetarian',
    photoUrl: null,
    photoShape: 'rounded',
    showAstrology: false,
    religion: 'Christian (Roman Catholic / Syrian Catholic)',
    caste: 'Syrian Catholic',
    subCaste: 'RCSC',
    gothram: '',
    rashi: '',
    nakshatra: '',
    manglik: '',
    horoscopeMatch: '',
    education: 'B.Tech & MBA in Finance (XLRI Jamshedpur)',
    college: 'XLRI Jamshedpur & NIT Calicut',
    occupation: 'Associate Director - Investment Banking',
    organization: 'JP Morgan Chase',
    annualIncome: '₹ 38 LPA',
    workLocation: 'Bengaluru / Kochi (Hybrid)',
    fatherName: 'Mr. Mathew Joseph K.',
    fatherOccupation: 'Executive Director (Retd. Federal Bank)',
    motherName: 'Mrs. Mary Mathew',
    motherOccupation: 'High School Principal (Retd.)',
    brothers: '1 Younger Brother (Pursuing MS in Ireland)',
    sisters: 'None',
    familyType: 'Reputed Syrian Catholic Family',
    familyValues: 'God-Fearing & Broad-Minded',
    nativePlace: 'Pala, Kottayam, Kerala',
    contactPerson: 'Mr. Mathew Joseph (Father)',
    contactNumber: '+91 94471 23456',
    contactEmail: 'mathew.family.pala@gmail.com',
    residentialAddress: 'Villa 12, Olive Greens, Kakkanad, Kochi - 682030',
    aboutMe: 'Active church parishioner, enjoys marathon running, acoustic guitar, and quality family time.',
    partnerExpectations: 'Looking for a Roman Catholic / Syrian Catholic girl who is educated, affectionate, and spiritually grounded.',
  },
};

export function MarriageBiodataEngine() {
  const [data, setData] = React.useState<BiodataData>(INITIAL_BIODATA);
  const [activeTab, setActiveTab] = React.useState<'personal' | 'astro' | 'career' | 'family' | 'contact' | 'photo' | 'style'>('personal');
  const [isExporting, setIsExporting] = React.useState(false);
  const [exportMessage, setExportMessage] = React.useState('');
  const [previewZoom, setPreviewZoom] = React.useState(1);

  // Hidden file input for photo upload
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const printRef = React.useRef<HTMLDivElement>(null);

  const updateField = <K extends keyof BiodataData>(field: K, value: BiodataData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        updateField('photoUrl', event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const loadPreset = (presetKey: string) => {
    const preset = SAMPLE_PROFILES[presetKey];
    if (preset) {
      setData((prev) => ({ ...prev, ...preset }));
    }
  };

  const resetToBlank = () => {
    setData({
      title: 'MARRIAGE BIO-DATA',
      symbol: 'none',
      symbolCustomText: '',
      theme: 'modern',
      fullName: '',
      gender: 'male',
      dob: '',
      tob: '',
      pob: '',
      height: '',
      weight: '',
      complexion: '',
      bloodGroup: '',
      motherTongue: '',
      maritalStatus: 'Never Married',
      diet: '',
      photoUrl: null,
      photoShape: 'none',
      showAstrology: false,
      religion: '',
      caste: '',
      subCaste: '',
      gothram: '',
      rashi: '',
      nakshatra: '',
      manglik: '',
      horoscopeMatch: '',
      education: '',
      college: '',
      occupation: '',
      organization: '',
      annualIncome: '',
      workLocation: '',
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      brothers: '',
      sisters: '',
      familyType: '',
      familyValues: '',
      nativePlace: '',
      contactPerson: '',
      contactNumber: '',
      contactEmail: '',
      residentialAddress: '',
      aboutMe: '',
      partnerExpectations: '',
    });
  };

  // Export high-res A4 PDF via html2canvas & jsPDF offscreen clone
  const exportA4Pdf = async () => {
    const sourceEl = printRef.current;
    if (!sourceEl) {
      alert('Biodata preview is not ready. Please try again.');
      return;
    }

    setIsExporting(true);
    setExportMessage('Generating high-resolution print PDF...');

    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      // Create an off-screen render clone with guaranteed 794px width (standard 210mm at 96 DPI)
      const exportClone = sourceEl.cloneNode(true) as HTMLElement;
      exportClone.style.width = '794px';
      exportClone.style.maxWidth = '794px';
      exportClone.style.minHeight = '1123px';
      exportClone.style.position = 'fixed';
      exportClone.style.left = '0px';
      exportClone.style.top = '0px';
      exportClone.style.zIndex = '-99999';
      exportClone.style.opacity = '1';
      exportClone.style.pointerEvents = 'none';
      exportClone.style.background = '#ffffff';
      exportClone.style.boxShadow = 'none';
      exportClone.style.margin = '0';
      exportClone.style.transform = 'none';
      document.body.appendChild(exportClone);

      await new Promise((resolve) => setTimeout(resolve, 200));

      const totalHeight = exportClone.scrollHeight;

      const canvas = await html2canvas(exportClone, {
        scale: 2.5, // 2.5x resolution gives ~240 DPI crisp output
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: totalHeight,
        windowWidth: 794,
        windowHeight: totalHeight,
        scrollX: 0,
        scrollY: 0,
      });

      document.body.removeChild(exportClone);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      const cleanFileName = (data.fullName.trim() || 'Marriage_Biodata')
        .replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`${cleanFileName}_Biodata.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Could not export PDF. Please try the WhatsApp Image export option.');
    } finally {
      setIsExporting(false);
      setExportMessage('');
    }
  };

  // Export high-res PNG for WhatsApp Matrimonial sharing
  const exportWhatsappImage = async () => {
    const sourceEl = printRef.current;
    if (!sourceEl) return;

    setIsExporting(true);
    setExportMessage('Preparing WhatsApp matrimonial image...');

    try {
      const { default: html2canvas } = await import('html2canvas');

      const exportClone = sourceEl.cloneNode(true) as HTMLElement;
      exportClone.style.width = '794px';
      exportClone.style.maxWidth = '794px';
      exportClone.style.minHeight = '1123px';
      exportClone.style.position = 'fixed';
      exportClone.style.left = '0px';
      exportClone.style.top = '0px';
      exportClone.style.zIndex = '-99999';
      exportClone.style.opacity = '1';
      exportClone.style.pointerEvents = 'none';
      exportClone.style.background = '#ffffff';
      exportClone.style.boxShadow = 'none';
      exportClone.style.margin = '0';
      exportClone.style.transform = 'none';
      document.body.appendChild(exportClone);

      await new Promise((resolve) => setTimeout(resolve, 200));

      const totalHeight = exportClone.scrollHeight;

      const canvas = await html2canvas(exportClone, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: totalHeight,
        windowWidth: 794,
        windowHeight: totalHeight,
      });

      document.body.removeChild(exportClone);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          const cleanFileName = (data.fullName.trim() || 'Marriage_Biodata')
            .replace(/[^a-zA-Z0-9_-]/g, '_');
          a.href = url;
          a.download = `${cleanFileName}_WhatsApp_Share.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 4000);
        },
        'image/jpeg',
        0.95
      );
    } catch (err) {
      console.error('Image export error:', err);
      alert('Could not export image. Please try again.');
    } finally {
      setIsExporting(false);
      setExportMessage('');
    }
  };

  const printBiodata = () => {
    window.print();
  };

  // Get theme styling classes & colors
  const getThemeConfig = () => {
    switch (data.theme) {
      case 'royal':
        return {
          pageBg: 'bg-amber-50/30',
          borderColor: 'border-[#B45309]',
          borderOuter: 'border-4 border-[#064E3B] p-2',
          borderInner: 'border-2 border-[#B45309] p-7 sm:p-8',
          headerBg: 'bg-[#064E3B] text-amber-300',
          titleColor: 'text-[#064E3B]',
          sectionHeaderBg: 'bg-emerald-900/10 border-b-2 border-[#B45309] text-[#064E3B]',
          accentText: 'text-[#B45309]',
          badgeBg: 'bg-[#B45309] text-white',
          labelText: 'text-[#064E3B]/80 font-semibold',
          valueText: 'text-stone-900 font-bold',
          divider: 'border-amber-200',
        };
      case 'south_indian':
        return {
          pageBg: 'bg-amber-50/20',
          borderColor: 'border-[#D97706]',
          borderOuter: 'border-4 border-[#831843] p-2',
          borderInner: 'border-2 border-dashed border-[#D97706] p-7 sm:p-8',
          headerBg: 'bg-[#831843] text-amber-200',
          titleColor: 'text-[#831843]',
          sectionHeaderBg: 'bg-[#831843]/10 border-b-2 border-[#831843] text-[#831843]',
          accentText: 'text-[#831843]',
          badgeBg: 'bg-[#831843] text-amber-100',
          labelText: 'text-[#831843]/80 font-semibold',
          valueText: 'text-stone-900 font-bold',
          divider: 'border-rose-100',
        };
      case 'modern':
        return {
          pageBg: 'bg-white',
          borderColor: 'border-slate-800',
          borderOuter: 'border border-slate-300 p-2',
          borderInner: 'border border-slate-200 p-7 sm:p-8',
          headerBg: 'bg-slate-900 text-white',
          titleColor: 'text-slate-900',
          sectionHeaderBg: 'bg-slate-100 border-l-4 border-slate-900 text-slate-900 pl-3',
          accentText: 'text-slate-700',
          badgeBg: 'bg-slate-900 text-white',
          labelText: 'text-slate-500 font-medium',
          valueText: 'text-slate-900 font-semibold',
          divider: 'border-slate-200',
        };
      case 'islamic':
        return {
          pageBg: 'bg-emerald-50/30',
          borderColor: 'border-[#047857]',
          borderOuter: 'border-4 border-[#065F46] p-2',
          borderInner: 'border-2 border-[#047857] p-7 sm:p-8',
          headerBg: 'bg-[#065F46] text-emerald-100',
          titleColor: 'text-[#065F46]',
          sectionHeaderBg: 'bg-emerald-800/10 border-b-2 border-[#047857] text-[#065F46]',
          accentText: 'text-[#047857]',
          badgeBg: 'bg-[#047857] text-white',
          labelText: 'text-[#065F46]/80 font-semibold',
          valueText: 'text-stone-900 font-bold',
          divider: 'border-emerald-200',
        };
      case 'christian':
        return {
          pageBg: 'bg-rose-50/20',
          borderColor: 'border-[#4C0519]',
          borderOuter: 'border-4 border-[#4C0519] p-2',
          borderInner: 'border border-[#4C0519]/40 p-7 sm:p-8',
          headerBg: 'bg-[#4C0519] text-rose-100',
          titleColor: 'text-[#4C0519]',
          sectionHeaderBg: 'bg-[#4C0519]/10 border-b-2 border-[#4C0519] text-[#4C0519]',
          accentText: 'text-[#4C0519]',
          badgeBg: 'bg-[#4C0519] text-white',
          labelText: 'text-[#4C0519]/80 font-semibold',
          valueText: 'text-stone-900 font-bold',
          divider: 'border-rose-100',
        };
      case 'vedic':
      default:
        return {
          pageBg: 'bg-amber-50/30',
          borderColor: 'border-[#B45309]',
          borderOuter: 'border-4 border-[#7F1D1D] p-2',
          borderInner: 'border-2 border-[#B45309] p-7 sm:p-8',
          headerBg: 'bg-[#7F1D1D] text-amber-200',
          titleColor: 'text-[#7F1D1D]',
          sectionHeaderBg: 'bg-[#7F1D1D]/10 border-b-2 border-[#B45309] text-[#7F1D1D]',
          accentText: 'text-[#B45309]',
          badgeBg: 'bg-[#7F1D1D] text-amber-100',
          labelText: 'text-[#7F1D1D]/80 font-semibold',
          valueText: 'text-stone-900 font-bold',
          divider: 'border-amber-200',
        };
    }
  };

  const themeStyle = getThemeConfig();

  // Render religious crest symbol
  const renderReligiousSymbol = () => {
    switch (data.symbol) {
      case 'ganesha':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-3xl font-serif text-[#B45309] select-none">卐 ॐ 卐</span>
            {data.symbolCustomText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-[#7F1D1D] tracking-wider">
                {data.symbolCustomText}
              </span>
            )}
          </div>
        );
      case 'om':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-4xl font-serif text-[#B45309] select-none">ॐ</span>
            {data.symbolCustomText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-[#7F1D1D] tracking-wider">
                {data.symbolCustomText}
              </span>
            )}
          </div>
        );
      case 'swastik':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-3xl font-serif text-[#B45309] select-none">卐</span>
            {data.symbolCustomText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-[#7F1D1D] tracking-wider">
                {data.symbolCustomText}
              </span>
            )}
          </div>
        );
      case 'balaji':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-2xl font-serif text-[#B45309] select-none">॥ श्री वेङ्कटेशाय नमः ॥</span>
            {data.symbolCustomText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-[#831843] tracking-wider">
                {data.symbolCustomText}
              </span>
            )}
          </div>
        );
      case 'shiva':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-2xl font-serif text-[#B45309] select-none">॥ ॐ नमः शिवाय ॥</span>
            {data.symbolCustomText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-[#064E3B] tracking-wider">
                {data.symbolCustomText}
              </span>
            )}
          </div>
        );
      case 'ek_onkar':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-3xl font-serif text-[#B45309] select-none">ੴ</span>
            {data.symbolCustomText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-[#7F1D1D] tracking-wider">
                {data.symbolCustomText}
              </span>
            )}
          </div>
        );
      case 'bismillah':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-2xl font-serif text-[#047857] select-none">☪</span>
            <span className="text-base sm:text-lg font-serif font-bold text-[#065F46] tracking-wide">
              {data.symbolCustomText || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'}
            </span>
          </div>
        );
      case 'cross':
        return (
          <div className="flex flex-col items-center justify-center space-y-1 mb-2">
            <span className="text-2xl font-serif text-[#4C0519] select-none">✝</span>
            {data.symbolCustomText && (
              <span className="text-xs sm:text-sm font-serif font-bold text-[#4C0519] tracking-wider">
                {data.symbolCustomText}
              </span>
            )}
          </div>
        );
      case 'none':
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Quick Template Presets Bar */}
      <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm font-bold text-text-main">
              Instant 1-Click Profile Presets:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => loadPreset('hindu_groom')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all"
            >
              Hindu Groom (Vedic)
            </button>
            <button
              onClick={() => loadPreset('hindu_bride')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 transition-all"
            >
              Hindu Bride (Royal)
            </button>
            <button
              onClick={() => loadPreset('south_indian')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-900 border border-fuchsia-200 transition-all"
            >
              South Indian Classic
            </button>
            <button
              onClick={() => loadPreset('islamic_nikah')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 transition-all"
            >
              Islamic Nikah
            </button>
            <button
              onClick={() => loadPreset('christian_profile')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 transition-all"
            >
              Christian Grace
            </button>
            <button
              onClick={resetToBlank}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-surface hover:bg-surface-darker text-text-main/80 border border-surface-darker transition-all flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Blank Form
            </button>
          </div>
        </div>

        {/* Action Buttons Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-surface-darker">
          <div className="flex items-center gap-2 text-xs text-text-main/70">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Free • No Watermark • Private in Browser RAM</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={exportWhatsappImage}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Share2 className="w-4 h-4" />
              WhatsApp Image (PNG)
            </button>
            <button
              onClick={exportA4Pdf}
              disabled={isExporting}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-primary hover:bg-primary-hover text-white shadow-md hover:shadow-primary/25 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              Download A4 PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Form Editor, Right Live A4 Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-surface rounded-2xl border border-surface-darker">
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'astro', label: 'Horoscope', icon: Compass },
              { id: 'career', label: 'Education & Job', icon: Briefcase },
              { id: 'family', label: 'Family', icon: Home },
              { id: 'contact', label: 'Contact', icon: Phone },
              { id: 'photo', label: 'Photo', icon: Eye },
              { id: 'style', label: 'Theme & Crest', icon: Palette },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-white text-primary shadow-sm border border-surface-darker'
                      : 'text-text-main/70 hover:text-text-main hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content Cards */}
          <div className="bg-white rounded-3xl border border-surface-darker shadow-card p-6 space-y-5">
            {/* TAB 1: Personal Details */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                  <h3 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Personal &amp; Physical Details
                  </h3>
                  <span className="text-[11px] text-text-main/60">Step 1 of 7</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Full Name of Applicant *
                    </label>
                    <input
                      type="text"
                      value={data.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      placeholder="e.g. Arjun R. Sharma"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">Gender</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={data.gender === 'male'}
                          onChange={() => updateField('gender', 'male')}
                          className="accent-primary"
                        />
                        <span>Male (Groom)</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          checked={data.gender === 'female'}
                          onChange={() => updateField('gender', 'female')}
                          className="accent-primary"
                        />
                        <span>Female (Bride)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Marital Status
                    </label>
                    <select
                      value={data.maritalStatus}
                      onChange={(e) => updateField('maritalStatus', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Never Married">Never Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Awaiting Divorce">Awaiting Divorce</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="text"
                      value={data.dob}
                      onChange={(e) => updateField('dob', e.target.value)}
                      placeholder="e.g. 15 August 1996"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Time of Birth
                    </label>
                    <input
                      type="text"
                      value={data.tob}
                      onChange={(e) => updateField('tob', e.target.value)}
                      placeholder="e.g. 06:45 AM"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Place of Birth
                    </label>
                    <input
                      type="text"
                      value={data.pob}
                      onChange={(e) => updateField('pob', e.target.value)}
                      placeholder="e.g. Jaipur, Rajasthan"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">Height</label>
                    <input
                      type="text"
                      value={data.height}
                      onChange={(e) => updateField('height', e.target.value)}
                      placeholder="e.g. 5' 11&quot; (180 cm)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Complexion / Skin Tone
                    </label>
                    <input
                      type="text"
                      value={data.complexion}
                      onChange={(e) => updateField('complexion', e.target.value)}
                      placeholder="e.g. Fair / Wheatish"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Blood Group
                    </label>
                    <input
                      type="text"
                      value={data.bloodGroup}
                      onChange={(e) => updateField('bloodGroup', e.target.value)}
                      placeholder="e.g. B+ Positive"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Mother Tongue
                    </label>
                    <input
                      type="text"
                      value={data.motherTongue}
                      onChange={(e) => updateField('motherTongue', e.target.value)}
                      placeholder="e.g. Hindi / Tamil / Telugu"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">Diet</label>
                    <input
                      type="text"
                      value={data.diet}
                      onChange={(e) => updateField('diet', e.target.value)}
                      placeholder="e.g. Vegetarian / Non-Vegetarian"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Horoscope & Astrology */}
            {activeTab === 'astro' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                  <h3 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                    <Compass className="w-4 h-4 text-primary" />
                    Religion &amp; Astrological Details
                  </h3>
                  <label className="flex items-center gap-2 text-xs font-bold text-primary cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.showAstrology}
                      onChange={(e) => updateField('showAstrology', e.target.checked)}
                      className="accent-primary"
                    />
                    <span>Include Astrology Section</span>
                  </label>
                </div>

                {data.showAstrology ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">
                        Religion
                      </label>
                      <input
                        type="text"
                        value={data.religion}
                        onChange={(e) => updateField('religion', e.target.value)}
                        placeholder="e.g. Hindu / Muslim / Christian / Sikh"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">Caste</label>
                      <input
                        type="text"
                        value={data.caste}
                        onChange={(e) => updateField('caste', e.target.value)}
                        placeholder="e.g. Brahmin / Kshatriya / Mudaliar"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">
                        Sub-Caste
                      </label>
                      <input
                        type="text"
                        value={data.subCaste}
                        onChange={(e) => updateField('subCaste', e.target.value)}
                        placeholder="e.g. Gour / Vadama / Deshastha"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">
                        Gotra / Gothram
                      </label>
                      <input
                        type="text"
                        value={data.gothram}
                        onChange={(e) => updateField('gothram', e.target.value)}
                        placeholder="e.g. Kashyap / Bharadwaja / Vatsa"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">
                        Rashi (Moon Sign)
                      </label>
                      <input
                        type="text"
                        value={data.rashi}
                        onChange={(e) => updateField('rashi', e.target.value)}
                        placeholder="e.g. Simha (Leo) / Kanya (Virgo)"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">
                        Nakshatra (Star)
                      </label>
                      <input
                        type="text"
                        value={data.nakshatra}
                        onChange={(e) => updateField('nakshatra', e.target.value)}
                        placeholder="e.g. Magha / Rohini / Hastham"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">
                        Manglik / Chevvai Dosham
                      </label>
                      <input
                        type="text"
                        value={data.manglik}
                        onChange={(e) => updateField('manglik', e.target.value)}
                        placeholder="e.g. Non-Manglik / Manglik / Don't Know"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-text-main mb-1">
                        Kundali / Horoscope Match
                      </label>
                      <input
                        type="text"
                        value={data.horoscopeMatch}
                        onChange={(e) => updateField('horoscopeMatch', e.target.value)}
                        placeholder="e.g. Available on Request / Must Match"
                        className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-surface border border-surface-darker text-center space-y-1">
                    <p className="text-xs font-bold text-text-main">
                      Astrology section is hidden.
                    </p>
                    <p className="text-[11px] text-text-main/60">
                      Enable the checkbox above if you wish to display Rashi, Nakshatra, and Gotra on your biodata.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Education & Career */}
            {activeTab === 'career' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                  <h3 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Education &amp; Professional Career
                  </h3>
                  <span className="text-[11px] text-text-main/60">Step 3 of 7</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Highest Education Qualification
                    </label>
                    <input
                      type="text"
                      value={data.education}
                      onChange={(e) => updateField('education', e.target.value)}
                      placeholder="e.g. B.Tech in Computer Science & MS"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      College / University Name
                    </label>
                    <input
                      type="text"
                      value={data.college}
                      onChange={(e) => updateField('college', e.target.value)}
                      placeholder="e.g. IIT Delhi / Anna University / BITS Pilani"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Current Designation / Job Title
                    </label>
                    <input
                      type="text"
                      value={data.occupation}
                      onChange={(e) => updateField('occupation', e.target.value)}
                      placeholder="e.g. Senior Software Engineer / Manager"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={data.organization}
                      onChange={(e) => updateField('organization', e.target.value)}
                      placeholder="e.g. Google India / TCS / Govt Dept"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Annual Income / CTC (Optional)
                    </label>
                    <input
                      type="text"
                      value={data.annualIncome}
                      onChange={(e) => updateField('annualIncome', e.target.value)}
                      placeholder="e.g. ₹ 25 LPA / Confidential"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Work Location (City, Country)
                    </label>
                    <input
                      type="text"
                      value={data.workLocation}
                      onChange={(e) => updateField('workLocation', e.target.value)}
                      placeholder="e.g. Bengaluru, Karnataka (or Hybrid)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Family Details */}
            {activeTab === 'family' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                  <h3 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                    <Home className="w-4 h-4 text-primary" />
                    Family Background &amp; Values
                  </h3>
                  <span className="text-[11px] text-text-main/60">Step 4 of 7</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Father&apos;s Name
                    </label>
                    <input
                      type="text"
                      value={data.fatherName}
                      onChange={(e) => updateField('fatherName', e.target.value)}
                      placeholder="e.g. Dr. Ramesh Sharma"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Father&apos;s Occupation
                    </label>
                    <input
                      type="text"
                      value={data.fatherOccupation}
                      onChange={(e) => updateField('fatherOccupation', e.target.value)}
                      placeholder="e.g. Senior Medical Officer / Business"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Mother&apos;s Name
                    </label>
                    <input
                      type="text"
                      value={data.motherName}
                      onChange={(e) => updateField('motherName', e.target.value)}
                      placeholder="e.g. Mrs. Sunita Sharma"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Mother&apos;s Occupation
                    </label>
                    <input
                      type="text"
                      value={data.motherOccupation}
                      onChange={(e) => updateField('motherOccupation', e.target.value)}
                      placeholder="e.g. Professor / Homemaker"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Brothers (Count &amp; Details)
                    </label>
                    <input
                      type="text"
                      value={data.brothers}
                      onChange={(e) => updateField('brothers', e.target.value)}
                      placeholder="e.g. 1 Younger Brother (Pursuing MBA)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Sisters (Count &amp; Details)
                    </label>
                    <input
                      type="text"
                      value={data.sisters}
                      onChange={(e) => updateField('sisters', e.target.value)}
                      placeholder="e.g. 1 Elder Sister (Married)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Family Type
                    </label>
                    <input
                      type="text"
                      value={data.familyType}
                      onChange={(e) => updateField('familyType', e.target.value)}
                      placeholder="e.g. Nuclear Family / Joint Family"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Family Values
                    </label>
                    <input
                      type="text"
                      value={data.familyValues}
                      onChange={(e) => updateField('familyValues', e.target.value)}
                      placeholder="e.g. Traditional / Moderate / Liberal"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Native Place / Ancestral Town
                    </label>
                    <input
                      type="text"
                      value={data.nativePlace}
                      onChange={(e) => updateField('nativePlace', e.target.value)}
                      placeholder="e.g. Jaipur, Rajasthan / Thanjavur, Tamil Nadu"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Contact & Address */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                  <h3 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Contact Information &amp; Address
                  </h3>
                  <span className="text-[11px] text-text-main/60">Step 5 of 7</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Primary Contact Person
                    </label>
                    <input
                      type="text"
                      value={data.contactPerson}
                      onChange={(e) => updateField('contactPerson', e.target.value)}
                      placeholder="e.g. Dr. Ramesh Sharma (Father)"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="text"
                      value={data.contactNumber}
                      onChange={(e) => updateField('contactNumber', e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={data.contactEmail}
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      placeholder="e.g. sharma.family.jaipur@gmail.com"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Residential Address
                    </label>
                    <textarea
                      rows={2}
                      value={data.residentialAddress}
                      onChange={(e) => updateField('residentialAddress', e.target.value)}
                      placeholder="e.g. Flat 402, Royal Palms, Vaishali Nagar, Jaipur - 302021"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      About Candidate (Brief Intro)
                    </label>
                    <textarea
                      rows={2}
                      value={data.aboutMe}
                      onChange={(e) => updateField('aboutMe', e.target.value)}
                      placeholder="Brief personal summary, lifestyle, and hobbies..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Partner Expectations (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={data.partnerExpectations}
                      onChange={(e) => updateField('partnerExpectations', e.target.value)}
                      placeholder="Qualities preferred in prospective partner..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: Photo Upload */}
            {activeTab === 'photo' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                  <h3 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary" />
                    Applicant Photograph
                  </h3>
                  <span className="text-[11px] text-text-main/60">Step 6 of 7</span>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-surface border border-surface-darker">
                    {data.photoUrl ? (
                      <div className="relative group shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={data.photoUrl}
                          alt="Applicant"
                          className={`w-28 h-36 object-cover border-2 border-primary shadow-sm ${
                            data.photoShape === 'oval'
                              ? 'rounded-full'
                              : data.photoShape === 'rounded'
                              ? 'rounded-2xl'
                              : 'rounded-none'
                          }`}
                        />
                        <button
                          onClick={() => updateField('photoUrl', null)}
                          className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition-all"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-28 h-36 border-2 border-dashed border-surface-darker rounded-2xl flex flex-col items-center justify-center p-3 text-center bg-white shrink-0">
                        <User className="w-8 h-8 text-text-main/30 mb-1" />
                        <span className="text-[10px] text-text-main/60 font-semibold">
                          No photo uploaded
                        </span>
                      </div>
                    )}

                    <div className="space-y-3 flex-1 text-center sm:text-left">
                      <div>
                        <p className="text-xs font-bold text-text-main">
                          Add Matrimonial Portrait Photograph
                        </p>
                        <p className="text-[11px] text-text-main/70 mt-0.5">
                          Passport style or professional portrait looks best. Images are kept 100% in your device RAM.
                        </p>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-white hover:bg-primary-hover shadow-sm transition-all flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose Photo</span>
                        </button>
                        {data.photoUrl && (
                          <button
                            onClick={() => updateField('photoUrl', null)}
                            className="px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-main mb-2">
                      Photo Frame Style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'rounded', label: 'Rounded Box' },
                        { id: 'oval', label: 'Classic Oval' },
                        { id: 'square', label: 'Clean Square' },
                        { id: 'none', label: 'No Photo' },
                      ].map((style) => (
                        <button
                          key={style.id}
                          onClick={() => updateField('photoShape', style.id as any)}
                          className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                            data.photoShape === style.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-surface-darker bg-surface/50 text-text-main hover:bg-surface'
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 7: Theme & Religious Crest */}
            {activeTab === 'style' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-surface-darker">
                  <h3 className="text-sm font-extrabold text-text-main flex items-center gap-2">
                    <Palette className="w-4 h-4 text-primary" />
                    Visual Theme &amp; Religious Crest
                  </h3>
                  <span className="text-[11px] text-text-main/60">Step 7 of 7</span>
                </div>

                {/* Cultural Themes */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-text-main">
                    Cultural Color Theme
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { id: 'vedic', label: 'Vedic Traditional', desc: 'Maroon & Gold', color: 'bg-red-800' },
                      { id: 'royal', label: 'Royal Gold & Emerald', desc: 'Emerald & Gold', color: 'bg-emerald-800' },
                      { id: 'south_indian', label: 'South Indian Classic', desc: 'Temple Ruby', color: 'bg-rose-900' },
                      { id: 'modern', label: 'Modern Minimalist', desc: 'Corporate Navy', color: 'bg-slate-900' },
                      { id: 'islamic', label: 'Islamic Nikah', desc: 'Emerald Arabesque', color: 'bg-emerald-700' },
                      { id: 'christian', label: 'Christian Elegance', desc: 'Burgundy Grace', color: 'bg-rose-950' },
                    ].map((th) => (
                      <button
                        key={th.id}
                        onClick={() => updateField('theme', th.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all relative ${
                          data.theme === th.id
                            ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                            : 'border-surface-darker bg-surface/50 hover:bg-surface'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-3.5 h-3.5 rounded-full ${th.color} shrink-0`} />
                          <span className="text-xs font-bold text-text-main truncate">
                            {th.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-text-main/60">{th.desc}</p>
                        {data.theme === th.id && (
                          <Check className="w-3.5 h-3.5 text-primary absolute top-2.5 right-2.5" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Religious Crest */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-text-main">
                    Header Auspicious Symbol / Crest
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'ganesha', label: 'Ganesha (श्री गणेशाय)', icon: '卐 ॐ 卐' },
                      { id: 'om', label: 'Om (ॐ)', icon: 'ॐ' },
                      { id: 'swastik', label: 'Swastika (卐)', icon: '卐' },
                      { id: 'balaji', label: 'Balaji (वेङ्कटेशाय)', icon: '॥ श्री ॥' },
                      { id: 'shiva', label: 'Shiva (नमः शिवाय)', icon: '॥ ॐ ॥' },
                      { id: 'ek_onkar', label: 'Ek Onkar (ੴ)', icon: 'ੴ' },
                      { id: 'bismillah', label: 'Bismillah (☪)', icon: '☪' },
                      { id: 'cross', label: 'Holy Cross (†)', icon: '✝' },
                      { id: 'none', label: 'None (Secular)', icon: '—' },
                    ].map((sym) => (
                      <button
                        key={sym.id}
                        onClick={() => updateField('symbol', sym.id as any)}
                        className={`p-2 rounded-xl border text-center transition-all ${
                          data.symbol === sym.id
                            ? 'border-primary bg-primary/10 text-primary font-bold'
                            : 'border-surface-darker bg-surface/50 text-text-main hover:bg-surface'
                        }`}
                      >
                        <div className="text-sm font-serif">{sym.icon}</div>
                        <div className="text-[10px] truncate mt-0.5">{sym.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Crest Text */}
                {data.symbol !== 'none' && (
                  <div>
                    <label className="block text-xs font-bold text-text-main mb-1">
                      Header Auspicious Mantram / Text
                    </label>
                    <input
                      type="text"
                      value={data.symbolCustomText || ''}
                      onChange={(e) => updateField('symbolCustomText', e.target.value)}
                      placeholder="e.g. ॥ श्री गणेशाय नमः ॥ or † In God We Trust †"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-surface-darker bg-surface/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live A4 Preview & Controls (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-4 sticky top-24">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-xs font-extrabold text-text-main uppercase tracking-wider">
                Live A4 Print Preview
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewZoom((z) => Math.max(0.7, z - 0.1))}
                className="w-6 h-6 rounded-lg bg-surface border border-surface-darker text-text-main flex items-center justify-center text-xs font-bold hover:bg-surface-darker"
                title="Zoom Out"
              >
                -
              </button>
              <span className="text-[11px] font-mono font-bold text-text-main/70">
                {Math.round(previewZoom * 100)}%
              </span>
              <button
                onClick={() => setPreviewZoom((z) => Math.min(1.3, z + 0.1))}
                className="w-6 h-6 rounded-lg bg-surface border border-surface-darker text-text-main flex items-center justify-center text-xs font-bold hover:bg-surface-darker"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={printBiodata}
                className="px-2.5 py-1 rounded-lg bg-surface border border-surface-darker text-[11px] font-bold text-text-main flex items-center gap-1 hover:bg-surface-darker transition-all ml-1"
                title="Direct Print"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Scalable Container for A4 Preview */}
          <div className="bg-surface-darker/40 p-2 sm:p-4 rounded-3xl border border-surface-darker overflow-auto max-h-[85vh] flex justify-center shadow-inner">
            <div
              style={{
                transform: `scale(${previewZoom})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full max-w-[595px]" // Standard A4 display ratio
            >
              {/* THE OFFICIAL A4 PRINTABLE DOCUMENT */}
              <div
                ref={printRef}
                id="marriage-biodata-print-sheet"
                className={`w-full ${themeStyle.pageBg} text-stone-900 shadow-2xl rounded-sm ${themeStyle.borderOuter} relative select-text`}
                style={{
                  minHeight: '842px', // standard A4 aspect
                  fontFamily: '"Georgia", "Times New Roman", serif',
                }}
              >
                <div className={`w-full h-full ${themeStyle.borderInner} space-y-5`}>
                  {/* Crest & Title Header */}
                  <div className="text-center space-y-1 pb-3 border-b-2 border-stone-300">
                    {renderReligiousSymbol()}
                    <h1
                      className={`text-xl sm:text-2xl font-extrabold uppercase tracking-widest ${themeStyle.titleColor}`}
                      style={{ letterSpacing: '0.15em' }}
                    >
                      {data.title || 'MARRIAGE BIO-DATA'}
                    </h1>
                  </div>

                  {/* Top Candidate Highlight Box (Photo + Key Overview) */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-3 border-b border-stone-200">
                    {data.photoUrl && data.photoShape !== 'none' && (
                      <div className="shrink-0 text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={data.photoUrl}
                          alt={data.fullName}
                          className={`w-28 h-36 object-cover border-2 shadow-sm ${themeStyle.borderColor} ${
                            data.photoShape === 'oval'
                              ? 'rounded-full'
                              : data.photoShape === 'rounded'
                              ? 'rounded-xl'
                              : 'rounded-none'
                          }`}
                        />
                      </div>
                    )}

                    <div className="flex-1 text-center sm:text-left space-y-1">
                      <h2 className="text-lg sm:text-xl font-bold text-stone-900">
                        {data.fullName || 'Candidate Full Name'}
                      </h2>
                      <p className={`text-xs sm:text-sm font-semibold ${themeStyle.accentText}`}>
                        {data.education || 'Education / Degree'}
                      </p>
                      <p className="text-xs text-stone-700">
                        {data.occupation ? `${data.occupation}` : 'Designation / Profession'}
                        {data.organization ? ` at ${data.organization}` : ''}
                      </p>
                      {data.workLocation && (
                        <p className="text-xs text-stone-600">
                          Location: <span className="font-semibold">{data.workLocation}</span>
                          {data.annualIncome ? ` • CTC: ${data.annualIncome}` : ''}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* SECTION 1: Personal Details */}
                  <div className="space-y-2">
                    <div className={`py-1 px-2.5 text-xs font-bold uppercase tracking-wider rounded ${themeStyle.sectionHeaderBg}`}>
                      Personal Profile
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Date of Birth:</span>
                        <span className={themeStyle.valueText}>{data.dob || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Time of Birth:</span>
                        <span className={themeStyle.valueText}>{data.tob || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Place of Birth:</span>
                        <span className={themeStyle.valueText}>{data.pob || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Height:</span>
                        <span className={themeStyle.valueText}>{data.height || '—'}</span>
                      </div>
                      {data.complexion && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Complexion:</span>
                          <span className={themeStyle.valueText}>{data.complexion}</span>
                        </div>
                      )}
                      {data.bloodGroup && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Blood Group:</span>
                          <span className={themeStyle.valueText}>{data.bloodGroup}</span>
                        </div>
                      )}
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Mother Tongue:</span>
                        <span className={themeStyle.valueText}>{data.motherTongue || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Marital Status:</span>
                        <span className={themeStyle.valueText}>{data.maritalStatus || 'Never Married'}</span>
                      </div>
                      {data.diet && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Diet:</span>
                          <span className={themeStyle.valueText}>{data.diet}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION 2: Astrological / Horoscope Details */}
                  {data.showAstrology && (
                    <div className="space-y-2">
                      <div className={`py-1 px-2.5 text-xs font-bold uppercase tracking-wider rounded ${themeStyle.sectionHeaderBg}`}>
                        Religious &amp; Horoscope Details
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Religion:</span>
                          <span className={themeStyle.valueText}>{data.religion || '—'}</span>
                        </div>
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Caste / Sub-Caste:</span>
                          <span className={themeStyle.valueText}>
                            {data.caste ? `${data.caste}${data.subCaste ? ` (${data.subCaste})` : ''}` : '—'}
                          </span>
                        </div>
                        {data.gothram && (
                          <div className="flex">
                            <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Gothram:</span>
                            <span className={themeStyle.valueText}>{data.gothram}</span>
                          </div>
                        )}
                        {data.rashi && (
                          <div className="flex">
                            <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Rashi:</span>
                            <span className={themeStyle.valueText}>{data.rashi}</span>
                          </div>
                        )}
                        {data.nakshatra && (
                          <div className="flex">
                            <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Nakshatra:</span>
                            <span className={themeStyle.valueText}>{data.nakshatra}</span>
                          </div>
                        )}
                        {data.manglik && (
                          <div className="flex">
                            <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Dosham / Manglik:</span>
                            <span className={themeStyle.valueText}>{data.manglik}</span>
                          </div>
                        )}
                        {data.horoscopeMatch && (
                          <div className="col-span-2 flex">
                            <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Horoscope:</span>
                            <span className={themeStyle.valueText}>{data.horoscopeMatch}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* SECTION 3: Education & Career */}
                  <div className="space-y-2">
                    <div className={`py-1 px-2.5 text-xs font-bold uppercase tracking-wider rounded ${themeStyle.sectionHeaderBg}`}>
                      Education &amp; Profession
                    </div>
                    <div className="grid grid-cols-1 gap-y-1.5 text-xs">
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Education:</span>
                        <span className={themeStyle.valueText}>
                          {data.education}
                          {data.college ? ` (${data.college})` : ''}
                        </span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Profession:</span>
                        <span className={themeStyle.valueText}>
                          {data.occupation || '—'}
                          {data.organization ? ` at ${data.organization}` : ''}
                        </span>
                      </div>
                      {data.annualIncome && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Annual Income:</span>
                          <span className={themeStyle.valueText}>{data.annualIncome}</span>
                        </div>
                      )}
                      {data.workLocation && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Work City:</span>
                          <span className={themeStyle.valueText}>{data.workLocation}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION 4: Family Details */}
                  <div className="space-y-2">
                    <div className={`py-1 px-2.5 text-xs font-bold uppercase tracking-wider rounded ${themeStyle.sectionHeaderBg}`}>
                      Family Background
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Father&apos;s Name:</span>
                        <span className={themeStyle.valueText}>{data.fatherName || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Occupation:</span>
                        <span className={themeStyle.valueText}>{data.fatherOccupation || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Mother&apos;s Name:</span>
                        <span className={themeStyle.valueText}>{data.motherName || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Occupation:</span>
                        <span className={themeStyle.valueText}>{data.motherOccupation || '—'}</span>
                      </div>
                      {data.brothers && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Brothers:</span>
                          <span className={themeStyle.valueText}>{data.brothers}</span>
                        </div>
                      )}
                      {data.sisters && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Sisters:</span>
                          <span className={themeStyle.valueText}>{data.sisters}</span>
                        </div>
                      )}
                      {data.familyType && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Family Type:</span>
                          <span className={themeStyle.valueText}>{data.familyType}</span>
                        </div>
                      )}
                      {data.nativePlace && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Native Place:</span>
                          <span className={themeStyle.valueText}>{data.nativePlace}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION 5: Contact Information */}
                  <div className="space-y-2">
                    <div className={`py-1 px-2.5 text-xs font-bold uppercase tracking-wider rounded ${themeStyle.sectionHeaderBg}`}>
                      Contact Details
                    </div>
                    <div className="grid grid-cols-1 gap-y-1.5 text-xs">
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Contact Person:</span>
                        <span className={themeStyle.valueText}>{data.contactPerson || '—'}</span>
                      </div>
                      <div className="flex">
                        <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Phone / WhatsApp:</span>
                        <span className={`font-bold text-stone-900 ${themeStyle.accentText}`}>
                          {data.contactNumber || '—'}
                        </span>
                      </div>
                      {data.contactEmail && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Email:</span>
                          <span className={themeStyle.valueText}>{data.contactEmail}</span>
                        </div>
                      )}
                      {data.residentialAddress && (
                        <div className="flex">
                          <span className={`w-32 shrink-0 ${themeStyle.labelText}`}>Address:</span>
                          <span className={themeStyle.valueText}>{data.residentialAddress}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION 6: Personal Note / Expectations (Optional) */}
                  {(data.aboutMe || data.partnerExpectations) && (
                    <div className="pt-2 border-t border-stone-200 text-xs space-y-1">
                      {data.aboutMe && (
                        <p className="text-stone-700 italic">
                          <span className="font-bold not-italic">About: </span>
                          {data.aboutMe}
                        </p>
                      )}
                      {data.partnerExpectations && (
                        <p className="text-stone-700 italic">
                          <span className="font-bold not-italic">Expectations: </span>
                          {data.partnerExpectations}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Export Status Notification */}
          {isExporting && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center gap-2 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>{exportMessage || 'Processing document in browser RAM...'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
