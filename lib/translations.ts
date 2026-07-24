export type Lang = "en" | "km";

const translations = {
  // ── Navbar ──────────────────────────────────────────────────────────────
  nav: {
    home:       { en: "Home",       km: "ទំព័រដើម" },
    activities: { en: "Activities", km: "សកម្មភាព" },
    about:      { en: "About",      km: "អំពីយើង" },
    contact:    { en: "Contact",    km: "ទំនាក់ទំនង" },
    admin:      { en: "Admin",      km: "អ្នកគ្រប់គ្រង" },
    findJob:    { en: "Find a Job", km: "រកការងារ" },
    adminPanel: { en: "Admin Panel",km: "ផ្ទាំងគ្រប់គ្រង" },
  },

  // ── Home Page ────────────────────────────────────────────────────────────
  home: {
    badge:           { en: "UNIVERSITY OF SOUTH-EAST ASIA · SIEM REAP, CAMBODIA", km: "សាកលវិទ្យាល័យអាស៊ីអាគ្នេយ៍ · ខេត្តសៀមរាប, កម្ពុជា" },
    heroLine1:       { en: "YOUR CAREER",  km: "អាជីពរបស់អ្នក" },
    heroLine2:       { en: "STARTS HERE",  km: "ចាប់ផ្ដើមនៅទីនេះ" },
    exploreBtn:      { en: "Explore Activities", km: "រុករកសកម្មភាព" },
    aboutBtn:        { en: "About Us",     km: "អំពីយើង" },
    // Career Center section
    dontMiss:        { en: "Don't Miss Out",  km: "កុំឱ្យខកខាន" },
    careerCenter:    { en: "CAREER CENTER",   km: "មជ្ឈមណ្ឌលការងារ" },
    exploreAll:      { en: "Explore All Activities", km: "រុករកសកម្មភាពទាំងអស់" },
    // Activities section
    growSkills:      { en: "Grow Your Skills",    km: "ពង្រឹងជំនាញរបស់អ្នក" },
    upcomingAct:     { en: "UPCOMING ACTIVITIES", km: "សកម្មភាពដែលនឹងមកដល់" },
    allEvents:       { en: "All Events",          km: "ព្រឹត្តិការណ៍ទាំងអស់" },
    registered:      { en: "registered",          km: "បានចុះឈ្មោះ" },
    register:        { en: "Register",            km: "ចុះឈ្មោះ" },
    viewAllEvents:   { en: "View All Events",     km: "មើលព្រឹត្តិការណ៍ទាំងអស់" },
    // CTA section
    forEmployers:    { en: "For Employers",       km: "សម្រាប់និយោជក" },
    ctaHeadline1:    { en: "Are You an Employer", km: "តើអ្នកជានិយោជក" },
    ctaHeadline2:    { en: "in Siem Reap?",       km: "នៅខេត្តសៀមរាប?" },
    ctaDesc:         { en: "Post your job openings and reach thousands of qualified candidates. Partner with USEA Career Center today.", km: "បង្ហោះការងាររបស់អ្នកនិងទៅដល់បេក្ខជនដែលមានលក្ខណៈសម្បត្តិរាប់ពាន់នាក់។ ចូលជាដៃគូជាមួយមជ្ឈមណ្ឌលការងារ USEA នៅថ្ងៃនេះ។" },
    postJob:         { en: "Post a Job",          km: "បង្ហោះការងារ" },
    contactUs:       { en: "Contact Us",          km: "ទំនាក់ទំនងយើង" },
  },

  // ── Stats labels (from store) ────────────────────────────────────────────
  stats: {
    jobsPosted:       { en: "Jobs Posted",         km: "ការងារបានបង្ហោះ" },
    employersPartner: { en: "Employers Partnered", km: "និយោជកដៃគូ" },
    seekersPlaced:    { en: "Job Seekers Placed",  km: "អ្នករករការងារបានដាក់ឱ្យ" },
    trainingPrograms: { en: "Training Programs",   km: "កម្មវិធីបណ្ដុះបណ្ដាល" },
  },

  // ── About Page ───────────────────────────────────────────────────────────
  about: {
    pageTitle:   { en: "About USEA Career Center",  km: "អំពីមជ្ឈមណ្ឌលការងារ USEA" },
    mission:     { en: "Our Mission", km: "បេសកកម្មរបស់យើង" },
    missionText: { en: "To empower job seekers across Siem Reap with the skills, connections, and opportunities they need to build meaningful careers.", km: "ដើម្បីផ្ដល់សិទ្ធអំណាចដល់អ្នករករការងារក្នុងខេត្តសៀមរាបជាមួយនឹងជំនាញ ទំនាក់ទំនង និងឱកាសដែលត្រូវការដើម្បីកសាងអាជីពដ៏មានន័យ។" },
    vision:      { en: "Our Vision",  km: "ចក្ខុវិស័យរបស់យើង" },
    visionText:  { en: "To be Cambodia's most trusted career development center, recognized for bridging talent and industry in Siem Reap and beyond.", km: "ដើម្បីក្លាយជាមជ្ឈមណ្ឌលអភិវឌ្ឍន៍អាជីពដ៏គួរជឿទុកចិត្តបំផុតរបស់កម្ពុជា ដែលត្រូវបានទទួលស្គាល់ចំពោះការភ្ជាប់ទេពកោសល្យ និងឧស្សាហកម្មនៅសៀមរាបនិងក្រៅ។" },
    values:      { en: "Our Values",  km: "តម្លៃរបស់យើង" },
    valuesText:  { en: "Integrity, inclusivity, and community. We believe every Cambodian deserves access to career support and a chance to succeed.", km: "សុចរិតភាព ភាពរួមបញ្ចូល និងសហគមន៍។ យើងជឿថាជនជាតិខ្មែរគ្រប់រូបសមនឹងទទួលបានការគាំទ្រអាជីព និងឱកាសសម្រាប់ជោគជ័យ។" },
    meetTeam:    { en: "Meet the Team",    km: "ជួបក្រុមការងាររបស់យើង" },
    findUs:      { en: "Find Us in Siem Reap", km: "ស្វែងរកយើងនៅខេត្តសៀមរាប" },
    openHours:   { en: "Open Mon – Fri: 8:00 AM – 5:00 PM | Sat: 8:00 AM – 12:00 PM", km: "ម៉ោងទទួលភ្ញៀវ ចន្ទ – សុក្រ: 8:00 ព្រឹក – 5:00 ល្ងាច | សៅរ៍: 8:00 ព្រឹក – 12:00 ថ្ងៃត្រង់" },
    contactUs:   { en: "Contact Us", km: "ទំនាក់ទំនងយើង" },
    teamRoles: {
      director:    { en: "Director",              km: "នាយក" },
      counselor:   { en: "Career Counselor",      km: "អ្នកប្រឹក្សាអាជីព" },
      relations:   { en: "Employer Relations",    km: "ទំនាក់ទំនងនិយោជក" },
      coordinator: { en: "Training Coordinator",  km: "សម្របសម្រួលការបណ្ដុះបណ្ដាល" },
    },
  },

  // ── Activities Page ──────────────────────────────────────────────────────
  activities: {
    learnConnect:  { en: "Learn & Connect",     km: "រៀន និងភ្ជាប់" },
    pageTitle:     { en: "Activities & Events", km: "សកម្មភាព និងព្រឹត្តិការណ៍" },
    pageSubtitle:  { en: "Career fairs, workshops, seminars and networking events in Siem Reap", km: "ពិព័រណ៍អាជីព វគ្គសិក្ខាសាលា សិក្ខាសាលា និងព្រឹត្តិការណ៍បណ្ដាញទំនាក់ទំនងនៅខេត្តសៀមរាប" },
    search:        { en: "Search events...",    km: "ស្វែងរកព្រឹត្តិការណ៍..." },
    all:           { en: "All",                 km: "ទាំងអស់" },
    noEvents:      { en: "No events found",     km: "រកមិនឃើញព្រឹត្តិការណ៍" },
    checkBack:     { en: "Check back soon for new activities", km: "សូមមើលឡើងវិញឆាប់ៗសម្រាប់សកម្មភាពថ្មី" },
    fullyBooked:   { en: "Fully Booked",        km: "ពោរពេញហើយ" },
    viewDetails:   { en: "View Event Details",  km: "មើលព័ត៌មានលម្អិតព្រឹត្តិការណ៍" },
    spotsLeft:     { en: "spots left",          km: "កន្លែងនៅសល់" },
    registered:    { en: "registered",          km: "បានចុះឈ្មោះ" },
    activityTypes: {
      "Career Improvement": { en: "Career Improvement", km: "ការកែលម្អអាជីព" },
      Workshop:             { en: "Workshop",           km: "វគ្គសិក្ខាសាលា" },
      Events:               { en: "Events",             km: "ព្រឹត្តិការណ៍" },
      Training:             { en: "Training",           km: "ការបណ្ដុះបណ្ដាល" },
      Networking:           { en: "Networking",         km: "បណ្ដាញទំនាក់ទំនង" },
    },
  },

  // ── Contact Page ─────────────────────────────────────────────────────────
  contact: {
    getInTouch:   { en: "Get in Touch",     km: "ទំនាក់ទំនងមកយើង" },
    pageTitle:    { en: "Contact Us",       km: "ទំនាក់ទំនងយើង" },
    pageSubtitle: { en: "We're here to help with career questions or employer inquiries.", km: "យើងនៅទីនេះដើម្បីជួយចម្លើយសំណួរអំពីអាជីព ឬការសាកសួររបស់និយោជក។" },
    contactInfo:  { en: "Contact Information", km: "ព័ត៌មានទំនាក់ទំនង" },
    address:      { en: "Address",   km: "អាសយដ្ឋាន" },
    phone:        { en: "Phone",     km: "ទូរសព្ទ" },
    email:        { en: "Email",     km: "អ៊ីម៉ែល" },
    hours:        { en: "Hours",     km: "ម៉ោងបើកធ្វើការ" },
    hoursVal:     { en: "From: 7:00 AM – 9:30 PM\nMonday - Saturday", km: "ចាប់ពី: 7:00 ព្រឹក – 9:30 យប់\nចន្ទ - សៅរ៍" },
    sendMsg:      { en: "Send a Message", km: "ផ្ញើសារ" },
    fullName:     { en: "Full Name",   km: "ឈ្មោះពេញ" },
    namePlaceholder: { en: "Your name", km: "ឈ្មោះរបស់អ្នក" },
    emailLabel:   { en: "Email",       km: "អ៊ីម៉ែល" },
    subject:      { en: "Subject",     km: "ប្រធានបទ" },
    subjectPlaceholder: { en: "How can we help?", km: "យើងអាចជួយបានដោយរបៀបណា?" },
    message:      { en: "Message",     km: "សារ" },
    messagePlaceholder: { en: "Write your message...", km: "សរសេរសាររបស់អ្នក..." },
    sendBtn:      { en: "Send Message", km: "ផ្ញើសារ" },
    sentTitle:    { en: "Message Sent!", km: "សារត្រូវបានផ្ញើ!" },
    sentDesc:     { en: "We'll get back to you within 1–2 business days.", km: "យើងនឹងតបត្រលប់ក្នុងរយៈពេល ១–២ ថ្ងៃធ្វើការ។" },
    sendAnother:  { en: "Send another message", km: "ផ្ញើសារមួយទៀត" },
  },

  // ── Footer ───────────────────────────────────────────────────────────────
  footer: {
    tagline:      { en: "Empowering Cambodian talent through opportunities, training, and employer connections in Siem Reap.", km: "ផ្ដល់សិទ្ធអំណាចដល់ទេពកោសល្យខ្មែរតាមរយៈឱកាស ការបណ្ដុះបណ្ដាល និងការភ្ជាប់ជាមួយនិយោជកនៅខេត្តសៀមរាប។" },
    quickLinks:   { en: "Quick Links",     km: "តំណភ្ជាប់រហ័ស" },
    browseJobs:   { en: "Browse Jobs",     km: "រកការងារ" },
    activitiesEvents: { en: "Activities & Events", km: "សកម្មភាព និងព្រឹត្តិការណ៍" },
    aboutUs:      { en: "About Us",        km: "អំពីយើង" },
    contact:      { en: "Contact",         km: "ទំនាក់ទំនង" },
    adminPanel:   { en: "Admin Panel",     km: "ផ្ទាំងគ្រប់គ្រង" },
    jobCategories:{ en: "Job Categories",  km: "ប្រភេទការងារ" },
    contactUs:    { en: "Contact Us",      km: "ទំនាក់ទំនងយើង" },
    copyright:    { en: "© 2026 USEA Career Center, Siem Reap. All rights reserved.", km: "© 2026 មជ្ឈមណ្ឌលការងារ USEA ខេត្តសៀមរាប។ រក្សាសិទ្ធិគ្រប់យ៉ាង។" },
    slogan:       { en: "Connecting Cambodian talent with opportunity", km: "ភ្ជាប់ទេពកោសល្យខ្មែរជាមួយឱកាស" },
    jobCats: {
      Hospitality: { en: "Hospitality", km: "បដិសណ្ឋារកិច្ច" },
      Tourism:     { en: "Tourism",     km: "ទេសចរណ៍" },
      Technology:  { en: "Technology",  km: "បច្ចេកវិទ្យា" },
      Finance:     { en: "Finance",     km: "ហិរញ្ញវត្ថុ" },
      Marketing:   { en: "Marketing",   km: "ទីផ្សារ" },
      Education:   { en: "Education",   km: "ការអប់រំ" },
      Healthcare:  { en: "Healthcare",  km: "សុខាភិបាល" },
      Retail:      { en: "Retail",      km: "លក់រាយ" },
    },
  },
} as const;

export type Translations = typeof translations;

/** Helper: pick the correct string for the current language. */
export function t(entry: { en: string; km: string }, lang: Lang): string {
  return entry[lang];
}

export default translations;
