import { SupportedLanguage } from '@/types';

export interface TranslationDictionary {
  common: {
    brandSubtitle: string;
    contactSupport: string;
    quickNav: string;
    dragMe: string;
    minimize: string;
    expand: string;
    needHelp: string;
  };
  nav: {
    documents: string;
    howItWorks: string;
    security: string;
    faq: string;
    contact: string;
    blog: string;
    home: string;
    signIn: string;
    signUp: string;
    dashboard: string;
    adminPanel: string;
    logout: string;
    freeTools: string;
    homeCost: string;
    businessOs: string;
  };
  hero: {
    tag: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    badge1Label: string;
    badge1Subtext: string;
    badge2Label: string;
    badge2Subtext: string;
    badge3Label: string;
    badge3Subtext: string;
  };
  upload: {
    counterSuffix: string;
    trustTag: string;
    cardHeading: string;
    cardSubheading: string;
    liveEngine: string;
    uploadAnother: string;
    dropTitle: string;
    dropSubtitle: string;
    dropHint: string;
    browseBtn: string;
    releaseToUpload: string;
    releaseHint: string;
    selectPdfBtn: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    passwordHint: string;
    passwordCheckbox: string;
    passwordDecryptionTitle: string;
    inMemoryOnly: string;
    passwordRuleDetail: string;
    verifyBtn: string;
    verifyingBtn: string;
    cancelBtn: string;
    verifyingTitle: string;
    pkiEngineProgress: string;
    verifiedHeading: string;
    verifiedSubheading: string;
    signatureValid: string;
    ccaVerified: string;
    legallyValid: string;
    certDetailsHeading: string;
    docNameLabel: string;
    signerLabel: string;
    issuedByLabel: string;
    signedOnLabel: string;
    scopeLabel: string;
    hashLabel: string;
    inPlaceNote: string;
    downloadBtn: string;
    verifyAnother: string;
    validSeal: string;
    invalidSeal: string;
    unknownSeal: string;
    signerName: string;
    issuedBy: string;
    signedAt: string;
    certExpiry: string;
  };
  howItWorks: {
    badge: string;
    heading: string;
    subheading: string;
    step1Badge: string;
    step1Title: string;
    step1Desc: string;
    step2Badge: string;
    step2Title: string;
    step2Desc: string;
    step3Badge: string;
    step3Title: string;
    step3Desc: string;
    ctaHeading: string;
    ctaSubtext: string;
    ctaBtn: string;
  };
  supportedDocs: {
    badge: string;
    heading: string;
    subheading: string;
    allIndia: string;
    tamilNadu: string;
    apTelangana: string;
    karnataka: string;
    kerala: string;
    moreStates: string;
  };
  trust: {
    badge: string;
    heading: string;
    subheading: string;
  };
  faq: {
    badge: string;
    heading: string;
    subheading: string;
    contactNote: string;
    contactLink: string;
  };
  contactFloating: {
    tooltip: string;
    badge: string;
  };
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    common: {
      brandSubtitle: 'India PKI Verify',
      contactSupport: 'Contact Support',
      quickNav: 'Quick Navigation',
      dragMe: 'Drag sticky note anywhere',
      minimize: 'Minimize',
      expand: 'Expand',
      needHelp: 'Need Help?',
    },
    nav: {
      documents: 'Documents',
      howItWorks: 'How It Works',
      security: 'Security',
      faq: 'FAQ',
      contact: 'Contact',
      blog: 'Blog',
      home: 'Home',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      dashboard: 'Dashboard',
      adminPanel: 'Admin Panel',
      logout: 'Sign Out',
      freeTools: 'Free Tools',
      homeCost: 'Home Cost',
      businessOs: 'Business OS',
    },
    hero: {
      tag: 'Free Online Verification Tool • IT Act 2000 Compliant',
      titleStart: 'Verify Indian Government PDF',
      titleHighlight: 'Signature Instantly',
      subtitle:
        'Fix the yellow ❓ on your Aadhaar, community certificate, nativity, PAN card or DigiLocker PDF. Free, instant, your file never leaves your device.',
      badge1Label: 'Files Never Stored',
      badge1Subtext: 'In-memory RAM processing only',
      badge2Label: 'Instant Verification',
      badge2Subtext: 'Results in 2-3 seconds',
      badge3Label: 'CCA India Certified',
      badge3Subtext: 'RCAI root trust chain',
    },
    upload: {
      counterSuffix: 'PDFs verified and counting',
      trustTag: '100% In-Memory RAM • IT Act 2000 Section 35',
      cardHeading: 'Verify Digital Signature',
      cardSubheading: 'Connected to official India CCA Root Certifying Authority trust hierarchy.',
      liveEngine: 'Live Engine',
      uploadAnother: 'Upload Another File',
      dropTitle: 'Drop your PDF here or click to upload',
      dropSubtitle: 'or click to browse from your device (Max 25MB)',
      dropHint: 'Accepts official Indian government PDFs up to 25MB. Files are verified in memory and never stored on any server.',
      browseBtn: 'Choose PDF File',
      releaseToUpload: 'Release to Upload PDF',
      releaseHint: 'VeriSeal will immediately inspect the digital signature hierarchy',
      selectPdfBtn: 'Select Government PDF',
      passwordLabel: 'PDF Password (Optional)',
      passwordPlaceholder: 'e.g. RAMA1995 for e-Aadhaar',
      passwordHint: 'For e-Aadhaar: First 4 letters of name in CAPITALS + Year of Birth',
      passwordCheckbox: 'This PDF is password-protected (e.g. e-Aadhaar)',
      passwordDecryptionTitle: 'PDF Decryption Password',
      inMemoryOnly: 'Processed in-memory only',
      passwordRuleDetail: 'Aadhaar Password Rule: First 4 letters of your name in CAPITAL LETTERS followed by your 4-digit Year of Birth (e.g., if name is SURESH KUMAR born in 1992, password is SURE1992).',
      verifyBtn: 'Verify Digital Signature Now',
      verifyingBtn: 'Verifying Cryptographic Chain...',
      cancelBtn: 'Cancel',
      verifyingTitle: 'Verifying Digital Signature...',
      pkiEngineProgress: 'PKI Engine Progress',
      verifiedHeading: 'Signature Valid & Verified',
      verifiedSubheading: 'Government digital signature confirmed authentic under IT Act 2000',
      signatureValid: 'Signature Valid',
      ccaVerified: 'CCA India Verified',
      legallyValid: 'Legally Valid (IT Act 2000)',
      certDetailsHeading: 'Certificate Verification Details',
      docNameLabel: 'Document Name',
      signerLabel: 'Signer Identity',
      issuedByLabel: 'Issued By (CA)',
      signedOnLabel: 'Document Signed On',
      scopeLabel: 'Signature Scope',
      hashLabel: 'Cryptographic Hash',
      inPlaceNote: 'Yellow ? on certificate replaced with Adobe verified green tick in-place.',
      downloadBtn: 'Download Verified PDF (With Permanent Green Tick)',
      verifyAnother: 'Verify Another Document',
      validSeal: 'VALID SIGNATURE',
      invalidSeal: 'INVALID SIGNATURE',
      unknownSeal: 'VALIDITY UNKNOWN',
      signerName: 'Signer Name',
      issuedBy: 'Certifying Authority',
      signedAt: 'Signed Timestamp',
      certExpiry: 'Certificate Expiry',
    },
    howItWorks: {
      badge: 'Simple 3-Step Process',
      heading: 'How VeriSeal Works',
      subheading: 'Instant PKI verification compliant with the IT Act 2000. Zero software installation required.',
      step1Badge: 'Step 1 • Upload',
      step1Title: 'Upload Government PDF',
      step1Desc: 'Select your e-Aadhaar, community, nativity, or income certificate. Password-protected PDFs are securely processed in memory.',
      step2Badge: 'Step 2 • Cryptographic Check',
      step2Title: 'Cryptographic Chain Check',
      step2Desc: 'Our engine validates the digital signature against official RCAI and CCA India root certificates and licensed CAs.',
      step3Badge: 'Step 3 • Verified PDF',
      step3Title: 'Download Verified PDF',
      step3Desc: 'Receive your clean PDF with an authentic Adobe green checkmark. Legally valid for all government, college, and bank submissions.',
      ctaHeading: 'Ready to fix the yellow question mark on your PDF?',
      ctaSubtext: 'Takes less than 3 seconds. Free, private, and zero storage.',
      ctaBtn: 'Go to Verification Tool',
    },
    supportedDocs: {
      badge: 'Wide Portal Coverage',
      heading: 'Supported Government Documents',
      subheading: 'VeriSeal verifies digitally signed PDFs across Central ministries and all State revenue portals.',
      allIndia: 'All India',
      tamilNadu: 'Tamil Nadu',
      apTelangana: 'AP & Telangana',
      karnataka: 'Karnataka',
      kerala: 'Kerala',
      moreStates: 'More States',
    },
    trust: {
      badge: 'Bank-Grade Security',
      heading: '100% In-Memory RAM Processing',
      subheading: 'Your identity documents are never saved to any disk, cloud database, or third-party server.',
    },
    faq: {
      badge: 'Clear Answers',
      heading: 'Frequently Asked Questions',
      subheading: 'Everything you need to know about digital signatures, validity, and how VeriSeal works.',
      contactNote: 'Still have questions or need technical support?',
      contactLink: 'Contact VeriSeal Support',
    },
    contactFloating: {
      tooltip: 'Need Help? Contact Admin',
      badge: 'Help',
    },
  },
  ta: {
    common: {
      brandSubtitle: 'இந்தியா PKI சரிபார்ப்பு',
      contactSupport: 'உதவிக்கு தொடர்பு கொள்ள',
      quickNav: 'விரைவு வழிகாட்டி',
      dragMe: 'எங்கு வேண்டுமானாலும் நகர்த்தலாம்',
      minimize: 'சுருக்கு',
      expand: 'விரிவாக்கு',
      needHelp: 'உதவி தேவையா?',
    },
    nav: {
      documents: 'ஆவணங்கள்',
      howItWorks: 'செயல்படும் முறை',
      security: 'பாதுகாப்பு',
      faq: 'கேள்வி-பதில்',
      contact: 'தொடர்பு',
      blog: 'வலைப்பதிவு',
      home: 'முகப்பு',
      signIn: 'உள்நுழைக',
      signUp: 'பதிவு செய்க',
      dashboard: 'டாஷ்போர்டு',
      adminPanel: 'நிர்வாக பலகை',
      logout: 'வெளியேறு',
      freeTools: 'இலவச கருவிகள்',
      homeCost: 'வீட்டு செலவு',
      businessOs: 'வணிக OS',
    },
    hero: {
      tag: 'இலவச ஆன்லைன் சரிபார்ப்பு • தகவல் தொழில்நுட்ப சட்டம் 2000 இணக்கமானது',
      titleStart: 'இந்திய அரசு PDF டிஜிட்டல்',
      titleHighlight: 'கையொப்பத்தை உடனே சரிபார்க்கவும்',
      subtitle:
        'உங்கள் ஆதார், சாதி சான்றிதழ், இருப்பிட சான்றிதழ், பான் கார்டு அல்லது டிஜிலாக்கர் PDF இல் உள்ள மஞ்சள் ❓ குறியை உடனே சரிசெய்யுங்கள். இலவசம், கோப்புகள் எப்போதும் சேமிக்கப்படாது.',
      badge1Label: 'கோப்புகள் சேமிக்கப்படுவதில்லை',
      badge1Subtext: 'நினைவகத்தில் (RAM) மட்டுமே இயங்கும்',
      badge2Label: 'உடனடி சரிபார்ப்பு',
      badge2Subtext: '2-3 வினாடிகளில் முடிவுகள்',
      badge3Label: 'CCA இந்தியா சான்றளிக்கப்பட்டது',
      badge3Subtext: 'RCAI மூல நம்பிக்கை கட்டமைப்பு',
    },
    upload: {
      counterSuffix: 'PDFகள் சரிபார்க்கப்பட்டு தொடர்ந்து உயர்கிறது',
      trustTag: '100% நினைவகம் • IT சட்டம் 2000 பிரிவு 35',
      cardHeading: 'டிஜிட்டல் கையொப்பத்தை சரிபார்க்கவும்',
      cardSubheading: 'அதிகாரப்பூர்வ இந்திய CCA மூல சான்றளிப்பு கட்டமைப்புடன் இணைக்கப்பட்டுள்ளது.',
      liveEngine: 'நேரலை தளம்',
      uploadAnother: 'மற்றொரு கோப்பை பதிவேற்றவும்',
      dropTitle: 'உங்கள் PDF கோப்பை இங்கே இழுத்துவிடவும் அல்லது கிளிக் செய்யவும்',
      dropSubtitle: 'அல்லது உங்கள் சாதனத்திலிருந்து கோப்பைத் தேர்ந்தெடுக்கவும் (அதிகபட்சம் 25MB)',
      dropHint: '25MB வரையிலான இந்திய அரசு PDF கோப்புகள். கோப்புகள் நினைவகத்தில் மட்டுமே சரிபார்க்கப்படும், எங்கும் சேமிக்கப்படாது.',
      browseBtn: 'PDF கோப்பைத் தேர்ந்தெடுக்கவும்',
      releaseToUpload: 'PDF-ஐ பதிவேற்ற விடுங்கள்',
      releaseHint: 'வெரிசீல் உடனடியாக கையொப்பத்தின் கட்டமைப்பை சரிபார்க்கும்',
      selectPdfBtn: 'அரசு PDF-ஐத் தேர்ந்தெடுக்கவும்',
      passwordLabel: 'PDF கடவுச்சொல் (தேவைப்பட்டால்)',
      passwordPlaceholder: 'எ.கா: RAMA1995 (இ-ஆதாருக்கு)',
      passwordHint: 'இ-ஆதாருக்கு: பெயரின் முதல் 4 ஆங்கில எழுத்துக்கள் (CAPS) + பிறந்த வருடம்',
      passwordCheckbox: 'இந்த PDF கடவுச்சொல் பாதுகாக்கப்பட்டது (எ.கா. இ-ஆதார்)',
      passwordDecryptionTitle: 'PDF திறக்கும் கடவுச்சொல்',
      inMemoryOnly: 'நினைவகத்தில் (RAM) மட்டுமே செயலாக்கப்படுகிறது',
      passwordRuleDetail: 'ஆதார் கடவுச்சொல் விதிமுறை: உங்கள் பெயரின் முதல் 4 ஆங்கில பெரிய எழுத்துக்கள் (CAPITALS) + உங்கள் பிறந்த வருடம் (எ.கா: சுரேஷ் குமார் 1992-ல் பிறந்திருந்தால் கடவுச்சொல் SURE1992).',
      verifyBtn: 'டிஜிட்டல் கையொப்பத்தை இப்போது சரிபார்க்கவும்',
      verifyingBtn: 'கையொப்பம் சரிபார்க்கப்படுகிறது...',
      cancelBtn: 'ரத்துசெய்',
      verifyingTitle: 'டிஜிட்டல் கையொப்பம் சரிபார்க்கப்படுகிறது...',
      pkiEngineProgress: 'PKI என்ஜின் முன்னேற்றம்',
      verifiedHeading: 'கையொப்பம் உறுதியானது & சரிபார்க்கப்பட்டது',
      verifiedSubheading: 'தகவல் தொழில்நுட்ப சட்டம் 2000 இன் கீழ் அரசு டிஜிட்டல் கையொப்பம் உறுதிசெய்யப்பட்டது',
      signatureValid: 'உண்மையான கையொப்பம் (Valid)',
      ccaVerified: 'CCA இந்தியா சரிபார்க்கப்பட்டது',
      legallyValid: 'சட்டப்பூர்வ செல்லுபடியாகும் (IT சட்டம் 2000)',
      certDetailsHeading: 'சான்றிதழ் சரிபார்ப்பு விவரங்கள்',
      docNameLabel: 'ஆவணப் பெயர்',
      signerLabel: 'கையொப்பமிட்டவர் அடையாளம்',
      issuedByLabel: 'வழங்கிய அமைப்பு (CA)',
      signedOnLabel: 'கையொப்பமிடப்பட்ட தேதி & நேரம்',
      scopeLabel: 'கையொப்பத்தின் பரப்பு',
      hashLabel: 'கிரிப்டோகிராஃபிக் ஹாஷ்',
      inPlaceNote: 'சான்றிதழில் உள்ள மஞ்சள் ? குறி நிரந்தர பச்சை டிக் குறியாக மாற்றப்பட்டது.',
      downloadBtn: 'சரிபார்க்கப்பட்ட PDF-ஐப் பதிவிறக்கவும் (நிரந்தர பச்சை டிக் உடன்)',
      verifyAnother: 'மற்றொரு ஆவணத்தை சரிபார்க்கவும்',
      validSeal: 'உண்மையான கையொப்பம்',
      invalidSeal: 'செல்லாத கையொப்பம்',
      unknownSeal: 'தெரியாத கையொப்பம்',
      signerName: 'கையொப்பமிட்டவர் பெயர்',
      issuedBy: 'சான்றளிக்கும் அதிகாரி (CA)',
      signedAt: 'கையொப்பமிடப்பட்ட நேரம்',
      certExpiry: 'சான்றிதழ் காலாவதி தேதி',
    },
    howItWorks: {
      badge: 'எளிய 3 படிநிலைகள்',
      heading: 'வெரிசீல் செயல்படும் விதம்',
      subheading: 'தகவல் தொழில்நுட்ப சட்டம் 2000 இன் கீழ் உடனடி PKI சரிபார்ப்பு. மென்பொருள் எதுவும் நிறுவ தேவையில்லை.',
      step1Badge: 'படி 1 • பதிவேற்றம்',
      step1Title: 'அரசு PDF-ஐ பதிவேற்றவும்',
      step1Desc: 'உங்கள் இ-ஆதார், சாதி, இருப்பிடம் அல்லது வருமான சான்றிதழைத் தேர்ந்தெடுக்கவும். கடவுச்சொல் பாதுகாக்கப்பட்ட கோப்புகள் பாதுகாப்பாக திறக்கப்படும்.',
      step2Badge: 'படி 2 • கையொப்ப சரிபார்ப்பு',
      step2Title: 'மின்னணு கையொப்ப சரிபார்ப்பு',
      step2Desc: 'அதிகாரப்பூர்வ RCAI மற்றும் CCA இந்திய சான்றிதழ் அமைப்புகளுடன் கையொப்பத்தின் நம்பகத்தன்மை சரிபார்க்கப்படுகிறது.',
      step3Badge: 'படி 3 • சரிபார்க்கப்பட்ட PDF',
      step3Title: 'சரிபார்க்கப்பட்ட PDF-ஐப் பெறவும்',
      step3Desc: 'அடோப் அதிகாரப்பூர்வ பச்சை டிக் குறியுடன் கூடிய PDF-ஐ உடனடியாக பதிவிறக்கி அரசு, கல்லூரி மற்றும் வங்கி பயன்பாடுகளுக்கு சமர்ப்பிக்கலாம்.',
      ctaHeading: 'உங்கள் PDF-ல் உள்ள மஞ்சள் கேள்விக்குறியை நீக்க தயாரா?',
      ctaSubtext: '3 வினாடிகளுக்கும் குறைவான நேரம் மட்டுமே. இலவசம் மற்றும் 100% பாதுகாப்பானது.',
      ctaBtn: 'சரிபார்ப்பு கருவிக்கு செல்லவும்',
    },
    supportedDocs: {
      badge: 'அனைத்து மாநில ஆவணங்கள்',
      heading: 'சரிபார்க்கக்கூடிய அரசு ஆவணங்கள்',
      subheading: 'மத்திய மற்றும் அனைத்து மாநில அரசு இணையதளங்களின் மின்னணு கையொப்பமிட்ட சான்றிதழ்களை ஆதரிக்கிறது.',
      allIndia: 'அகில இந்தியா',
      tamilNadu: 'தமிழ்நாடு',
      apTelangana: 'ஆந்திரா & தெலங்கானா',
      karnataka: 'கர்நாடகா',
      kerala: 'கேரளா',
      moreStates: 'பிற மாநிலங்கள்',
    },
    trust: {
      badge: 'உயர்தர பாதுகாப்பு',
      heading: '100% நினைவகத்தில் (RAM) மட்டுமே செயல்படும்',
      subheading: 'உங்கள் முக்கிய ஆவணங்கள் எந்த சேமிப்பகத்திலும் அல்லது தரவுத்தளத்திலும் ஒருபோதும் சேமிக்கப்படாது.',
    },
    faq: {
      badge: 'தெளிவான பதில்கள்',
      heading: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      subheading: 'டிஜிட்டல் கையொப்பங்கள், அதன் செல்லுபடியாகும் தன்மை மற்றும் வெரிசீல் பற்றிய அனைத்து விவரங்களும்.',
      contactNote: 'மேலும் கேள்விகள் உள்ளதா அல்லது தொழில்நுட்ப உதவி தேவையா?',
      contactLink: 'வெரிசீல் ஆதரவு குழுவை தொடர்பு கொள்ளவும்',
    },
    contactFloating: {
      tooltip: 'உதவி தேவையா? நிர்வாகியை தொடர்பு கொள்ளவும்',
      badge: 'உதவி',
    },
  },
};

