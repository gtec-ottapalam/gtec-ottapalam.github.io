
// ==========================================================================
// G-TEC EDUCATION OTTAPPALAM — KINETIC APPLICATION BUNDLE
// Self-contained interactivity for Discipline Matrix, Career Matcher,
// Course Modal, Floating Dock, and Campus Lightbox.
// ==========================================================================

const siteConfig = {
  instituteName: 'G-TEC Education, Ottappalam',
  tagline: 'Skills that turn creativity into possibility.',
  locationLabel: 'OTTAPPALAM, KERALA',
  email: 'ottappalam.pkd@gteceducation.com',
  // IMPORTANT: Phone and WhatsApp are distinct numbers as required by guidelines
  phone: '9995955501',
  phoneDisplay: '+91 99959 55501',
  phoneTel: 'tel:+919995955501',
  whatsappUrl: 'https://wa.me/916238843939',
  whatsappNumber: '+91 62388 43939',
  address: {
    line1: 'Second Floor, JRJ Complex',
    line2: 'Thozhupadam–Ottappalam Road',
    cityStateZip: 'Ottappalam, Kerala 679101',
    country: 'India',
    full: 'Second Floor, JRJ Complex, Thozhupadam–Ottappalam Road, Ottappalam, Kerala 679101, India.',
  },
  googleMapsUrl: 'https://maps.app.goo.gl/fbnyT27gH3FD3fjV9',
  // Official Ottappalam JRJ Complex coordinates for embedded map iframe
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.824287848695!2d76.3762886!3d10.7711467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7d56e9c6806ef%3A0xebe76214041b3117!2sG-TEC%20EDUCATION%20OTTAPALAM!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin',
  socials: {
    instagram: 'https://www.instagram.com/gtecottapalam/?hl=en',
    facebook: 'https://www.facebook.com/gtecotp/',
  },
  officialCatalogueUrl: 'https://www.gteceducation.com/courses/software',
  timing: {
    days: 'Monday – Saturday',
    hours: '8:30 AM – 6:30 PM IST',
  },
};


const courseCategories = [
  {
    id: 'cad',
    index: '01',
    name: 'CAD & Engineering Design',
    tagline: 'Precision Drafting, 3D Modeling & Building Information Modeling',
    description: 'Master industry-standard engineering and architectural suites including AutoCAD, SolidWorks, Revit Architecture, and CATIA to generate manufacturing-grade drawings, 3D parametric assemblies, and BIM visualizations.',
    visualThemes: ['Parametric 3D Modeling', 'BIM Architecture', 'Structural Simulation', 'Electrical Schematics'],
    icon: 'compass',
    officialCatalogUrl: 'https://www.gteceducation.com/courses/cad',
  },
  {
    id: 'software',
    index: '02',
    name: 'Software Development & Computing',
    tagline: 'Modern Full-Stack Engineering, Cloud, Mobile & Artificial Intelligence',
    description: 'Learn modern programming, responsive web systems, mobile applications, databases, and AI algorithms with practical hands-on labs and live project deployments to get industry-ready.',
    visualThemes: ['Full-Stack Web Engineering', 'Mobile App Development', 'Data Science & AI', 'Cloud & DevOps'],
    icon: 'code',
    officialCatalogUrl: 'https://www.gteceducation.com/courses/software',
  },
  {
    id: 'multimedia',
    index: '03',
    name: 'Multimedia & Visual Arts',
    tagline: 'Graphic Design, Motion Visuals, Video Editing & 3D Production',
    description: 'Develop creative mastery in branding, digital photography, kinetic typography, audio-visual post-production, and 3D modeling using Adobe Creative Suite, Blender, and professional edit suites.',
    visualThemes: ['Brand Identity & Print Design', 'Film & Video Post-Production', 'Motion Graphics', '3D Sculpting & VFX'],
    icon: 'film',
    officialCatalogUrl: 'https://www.gteceducation.com/courses/multimedia',
  },
  {
    id: 'accounting',
    index: '04',
    name: 'Accounting & Business Management',
    tagline: 'Tally Prime, GST Compliance, Financial Analysis & SAP S/4HANA',
    description: 'Comprehensive financial accounting, corporate taxation, statutory GST filing, and enterprise resource planning with SAP S/4HANA global certification for corporate finance readiness.',
    visualThemes: ['Tally Prime & GST Filing', 'SAP S/4HANA FICO', 'Corporate Procurement & MM', 'Financial Statement Analysis'],
    icon: 'trending-up',
    officialCatalogUrl: 'https://www.gteceducation.com/courses/finance-and-business-management',
  },
];


const verifiedCourses = [
  // ================= CAD COURSES =================
  {
    id: 'cad-revit-architecture',
    name: 'Certificate Course in Revit Architecture',
    category: 'cad',
    categoryTitle: 'CAD',
    level: 'Certificate Course',
    duration: '3 Months (Standard Batch)',
    eligibility: 'Civil Engineering / Architecture / Diploma in Civil / Draughtsman',
    description: 'Autodesk Revit Architecture is the industry benchmark for Building Information Modeling (BIM). This course enables learners to design architectural layouts, model parametric building components, extract automatic schedules, and generate photorealistic client presentations.',
    modules: [
      'Introduction to BIM & Revit Architecture Interface',
      'The Basics of Building Modeling (Walls, Doors, Windows, Roofs, Stairs)',
      'Editing & Modifying Architectural Elements',
      'Creating Views: Floor Plans, Elevations, Sections & Callouts',
      'Graphics, Material Rendering & Visibility Settings',
      'Annotation, Dimensions, Schedules & Construction Detailing',
    ],
    tools: ['Autodesk Revit Architecture', 'BIM 360', 'Enscape'],
    officialUrl: 'https://www.gteceducation.com/courses/cad/certificate-course/certificate-course-in-revit-architecture',
    featured: true,
  },
  {
    id: 'cad-solidworks',
    name: 'Certificate Course in Solidworks',
    category: 'cad',
    categoryTitle: 'CAD',
    level: 'Certificate Course',
    duration: '3 Months (Standard Batch)',
    eligibility: 'Mechanical / Automobile / Production Engineers & Students',
    description: 'Industry-leading 3D CAD software for product design, mechanical engineering, and manufacturing. Trains learners in parametric design, part modeling, assemblies, sheet metal, surface modeling, and manufacturing drafting.',
    modules: [
      'Parametric 2D Sketching & Constraint Relations',
      '3D Part Modeling, Extrusions, Revolves & Lofts',
      'Sheet Metal Designing & Flat Pattern Formations',
      'Assembly Drawing, Dynamic Mates & Exploded Views',
      'Production Drafting, Bill of Materials (BOM) & GD&T',
      'Stress Simulation & Photorealistic Rendering',
    ],
    tools: ['SolidWorks 3D CAD', 'PhotoView 360', 'SolidWorks Simulation'],
    officialUrl: 'https://www.gteceducation.com/courses/cad/certificate-course/certificate-course-in-solidworks',
    featured: true,
  },
  {
    id: 'cad-autocad-electrical',
    name: 'Certificate Course in AutoCAD Electrical',
    category: 'cad',
    categoryTitle: 'CAD',
    level: 'Certificate Course',
    duration: '2 Months',
    eligibility: 'Electrical / Electronics Engineering / Diploma / ITI',
    description: 'Specialized CAD program designed for electrical engineers and technicians to create schematic wire diagrams, panel layouts, PLC I/O drawings, and terminal plans with comprehensive symbol libraries.',
    modules: [
      'AutoCAD Electrical Project Manager & Settings',
      'Ladder Diagrams, Wire Numbers & Signal Arrows',
      'Schematic Components & Terminal Blocks',
      'PLC I/O Modules & Cross-Referencing',
      'Physical Panel Layout Generation & Footprints',
      'Project-Wide Auditing & BOM Report Generation',
    ],
    tools: ['AutoCAD Electrical', 'Autodesk Design Suite'],
    officialUrl: 'https://www.gteceducation.com/courses/cad/certificate-course/certificate-course-in-autocad-electrical',
    featured: true,
  },
  {
    id: 'cad-catia',
    name: 'Certificate Course in Catia',
    category: 'cad',
    categoryTitle: 'CAD',
    level: 'Certificate Course',
    duration: '3 Months',
    eligibility: 'Mechanical / Aerospace / Automobile Engineering Candidates',
    description: 'Master Dassault Systèmes CATIA, the premier solution for advanced complex surface modeling, aerospace structural engineering, and automotive styling design.',
    modules: [
      'CATIA Sketcher & Solid Part Design Workbench',
      'Generative Shape Design (GSD) & Advanced Surfaces',
      'Mechanical Assembly Design & Constraints',
      'Drafting, Sectioning & Dimension Standards',
      'Kinematics Simulation & Mechanism Analysis',
    ],
    tools: ['Dassault CATIA V5/V6', '3DEXPERIENCE'],
    officialUrl: 'https://www.gteceducation.com/courses/cad/certificate-course/certificate-course-in-catia',
    featured: false,
  },
  {
    id: 'cad-staad-pro',
    name: 'Certificate Course in Staad-Pro',
    category: 'cad',
    categoryTitle: 'CAD',
    level: 'Certificate Course',
    duration: '2 Months',
    eligibility: 'Civil / Structural Engineering Degree or Diploma',
    description: 'Structural engineering analysis and design program for concrete and steel buildings, multi-storey frames, load distributions, seismic analysis, and foundation checks.',
    modules: [
      'Structural Geometry Modeling & Grid Generation',
      'Member Properties, Specifications & Supports',
      'Load Definitions (Dead, Live, Wind, IS 1893 Seismic)',
      'Finite Element Analysis & Member Force Diagrams',
      'Concrete & Steel Member Design Verification',
    ],
    tools: ['STAAD.Pro Connect Edition', 'RAM Connection'],
    officialUrl: 'https://www.gteceducation.com/courses/cad/certificate-course/certificate-course-in-staad-pro',
    featured: false,
  },
  {
    id: 'cad-g-draughtsman',
    name: 'G- Draughtsman',
    category: 'cad',
    categoryTitle: 'CAD',
    level: 'Certificate Course',
    duration: '3 Months',
    eligibility: 'Plus Two / ITI Draughtsman / Diploma',
    description: 'Foundational architectural drafting, 2D floor plans, elevation drawings, section details, and municipality building permit submission documents.',
    modules: [
      'Engineering Drawing Conventions & Scaled Units',
      'AutoCAD 2D Precision Drafting & Layers',
      'Architectural Floor Plans, Sectional & Elevation Views',
      'Structural Detail Drafting & Reinforcement Basics',
      'Municipal Sanction Drawing Sheet Setup',
    ],
    tools: ['AutoCAD 2D', 'Drafting Tools'],
    officialUrl: 'https://www.gteceducation.com/courses/cad/certificate-course/g--draughtsman',
    featured: false,
  },

  // ================= SOFTWARE COURSES =================
  {
    id: 'sw-python-fullstack',
    name: 'Full-Stack Web Developer - Python',
    category: 'software',
    categoryTitle: 'Software',
    level: 'Diploma Course',
    duration: '6 Months',
    eligibility: 'Plus Two / Any Degree / Diploma / BCA / B.Tech',
    description: 'Master full-stack engineering with Python and Django. Build scalable server applications, design relational databases, integrate RESTful APIs, and construct interactive frontend interfaces.',
    modules: [
      'Frontend Development: HTML5, CSS3, JavaScript, jQuery, Bootstrap',
      'Python Programming: Core & Object-Oriented Principles',
      'RDBMS: MySQL Architecture, Queries, Views & Indexing',
      'Django Web Framework: MVC/MVT, ORM, Auth & Security',
      'REST APIs & Asynchronous Request Handlers',
      'GitHub Version Control, Cloud Hosting & Final Project',
    ],
    tools: ['Python', 'Django', 'MySQL', 'JavaScript', 'Bootstrap', 'Git', 'Postman'],
    officialUrl: 'https://www.gteceducation.com/courses/software/diploma-courses/full-stack-web-developer---python',
    featured: true,
  },
  {
    id: 'sw-flutter-fullstack',
    name: 'Full-Stack Web Developer - Flutter',
    category: 'software',
    categoryTitle: 'Software',
    level: 'Diploma Course',
    duration: '6 Months',
    eligibility: 'Plus Two / Degree / Technical Diploma',
    description: 'Cross-platform mobile and web engineering using Google Flutter and Dart. Build beautiful, natively compiled applications for iOS, Android, and web from a single codebase.',
    modules: [
      'Dart Language: Data Types, Async/Await & OOP',
      'Flutter Architecture & Material / Cupertino Widgets',
      'State Management (Provider & Bloc Patterns)',
      'Firebase Authentication, Cloud Firestore & Push Notifications',
      'REST API Integration & Local Storage with SQLite',
      'Production Build & App Store / Play Store Readiness',
    ],
    tools: ['Flutter', 'Dart', 'Firebase', 'Android Studio', 'VS Code', 'Git'],
    officialUrl: 'https://www.gteceducation.com/courses/software/diploma-courses/full-stack-web-developer---flutter',
    featured: true,
  },
  {
    id: 'sw-mern-fullstack',
    name: 'Full-Stack Web Developer - MERN',
    category: 'software',
    categoryTitle: 'Software',
    level: 'Diploma Course',
    duration: '6 Months',
    eligibility: 'Plus Two / Degree in any discipline',
    description: 'Modern JavaScript full-stack development using MongoDB, Express.js, React.js, and Node.js. Build high-speed reactive single-page applications with real-time capabilities.',
    modules: [
      'Advanced Modern JavaScript (ES6+, Promises, Async/Await)',
      'React.js Component Ecosystem, Hooks & Context API',
      'Node.js Runtime & Express.js REST API Architecture',
      'MongoDB NoSQL Database Modeling with Mongoose',
      'JWT Authentication, Protected Routes & Security',
      'State Management with Redux Toolkit & Vercel/Render Deployment',
    ],
    tools: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'Tailwind CSS'],
    officialUrl: 'https://www.gteceducation.com/courses/software/diploma-courses/full-stack-web-developer---mern',
    featured: true,
  },
  {
    id: 'sw-ai-datascience',
    name: 'Master Diploma in AI And Data Science',
    category: 'software',
    categoryTitle: 'Software',
    level: 'Master Course',
    duration: '8 Months',
    eligibility: 'Graduation in Science, Maths, Engineering, BCA or Computer Science',
    description: 'In-depth program covering data analytics, exploratory statistics, machine learning algorithms, deep learning neural networks, computer vision, and generative AI.',
    modules: [
      'Python for Scientific Computing: NumPy, Pandas & Matplotlib',
      'Applied Statistics, Hypothesis Testing & Exploratory Data Analysis',
      'Supervised & Unsupervised Machine Learning (Scikit-Learn)',
      'Deep Learning & Neural Networks with TensorFlow / Keras',
      'Natural Language Processing (NLP) & Computer Vision Basics',
      'Real-World Capstone Project & Data Visualization Dashboards',
    ],
    tools: ['Python', 'TensorFlow', 'Pandas', 'Scikit-Learn', 'Jupyter', 'Tableau'],
    officialUrl: 'https://www.gteceducation.com/courses/software/master-courses/master-diploma-in-ai-and-data-science',
    featured: true,
  },
  {
    id: 'sw-uiux-designing',
    name: 'Advanced Diploma in UI/UX Designing',
    category: 'software',
    categoryTitle: 'Software',
    level: 'Diploma Course',
    duration: '4 Months',
    eligibility: 'Plus Two / Any Degree / Creative Enthusiasts',
    description: 'Learn human-centred design principles, user research, wireframing, interactive prototyping, micro-interactions, design systems, and responsive interface workflows.',
    modules: [
      'Design Thinking Process & User Journey Mapping',
      'Information Architecture & Low-Fidelity Wireframes',
      'High-Fidelity Interface Design in Figma',
      'Component Architecture, Auto-Layout & Design Systems',
      'Interactive Prototyping & Usability Testing',
      'Developer Handoff & Portfolio Case Study Building',
    ],
    tools: ['Figma', 'Adobe XD', 'Miro', 'FigJam'],
    officialUrl: 'https://www.gteceducation.com/courses/software/diploma-courses/advanced-diploma-in-uiux-designing',
    featured: false,
  },
  {
    id: 'sw-generative-ai',
    name: 'Certificate Course In Generative AI',
    category: 'software',
    categoryTitle: 'Software',
    level: 'Certificate Course',
    duration: '2 Months',
    eligibility: 'Basic Computer Literacy & Programming Interest',
    description: 'Hands-on curriculum on large language models (LLMs), prompt engineering, synthetic media creation, API integration, and leveraging generative tools for developer productivity.',
    modules: [
      'Foundations of Generative AI & Transformer Architectures',
      'Effective Prompt Engineering Techniques & System Prompts',
      'Text, Image & Audio Synthesis Applications',
      'Connecting AI APIs with Python & LangChain Fundamentals',
      'Responsible AI, Content Verification & Industry Applications',
    ],
    tools: ['ChatGPT', 'OpenAI API', 'Midjourney', 'Python', 'LangChain'],
    officialUrl: 'https://www.gteceducation.com/courses/software/certificate-course/certificate-course-in-generative-ai',
    featured: false,
  },
  {
    id: 'sw-office-automation',
    name: 'Diploma in Office Automation',
    category: 'software',
    categoryTitle: 'Software',
    level: 'Diploma Course',
    duration: '3 Months',
    eligibility: 'SSLC / Plus Two / Any Stream',
    description: 'Comprehensive office productivity training covering Microsoft Office suites, spreadsheet automation, professional document drafting, presentation design, and AI-assisted productivity tools.',
    modules: [
      'Windows OS Fundamentals & File Organization',
      'Microsoft Word: Document Formatting, Mail Merge & Tables',
      'Microsoft Excel: Formulas, Functions, Charts & Data Sorting',
      'Microsoft PowerPoint: Slide Layouts, Animations & Transitions',
      'Internet Communications, Email Etiquette & Cloud Collaboration',
      'AI Integration in Office Workflows',
    ],
    tools: ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Outlook', 'Google Docs'],
    officialUrl: 'https://www.gteceducation.com/courses/software/diploma-courses/diploma-in-office-automation',
    featured: false,
  },

  // ================= MULTIMEDIA COURSES =================
  {
    id: 'mm-graphic-designing',
    name: 'Diploma In Graphic Designing',
    category: 'multimedia',
    categoryTitle: 'Multimedia',
    level: 'Diploma Course',
    duration: '4 Months',
    eligibility: 'Plus Two / Any Degree / Creative Aspirants',
    description: 'Through this course, learners specialize in graphical outputs including layouts, digital photo editing, brand identity design, pre-press works, packaging, and commercial illustrations.',
    modules: [
      'Adobe Photoshop: Photo Retouching, Masking & Compositing',
      'CorelDraw: Vector Drawings, Layouts, Pre-Press & Print Formats',
      'Adobe Illustrator: Logo Design, Vector Graphics & Typography',
      'Adobe InDesign: Magazine Layouts, Brochures & Editorial Publishing',
      'Color Theory, Typography Rules & Portfolio Presentation',
    ],
    tools: ['Adobe Photoshop', 'CorelDraw', 'Adobe Illustrator', 'Adobe InDesign'],
    officialUrl: 'https://www.gteceducation.com/courses/multimedia/diploma-courses/diploma-in-graphic-designing',
    featured: true,
  },
  {
    id: 'mm-video-editing',
    name: 'Diploma In Video Editing',
    category: 'multimedia',
    categoryTitle: 'Multimedia',
    level: 'Diploma Course',
    duration: '4 Months',
    eligibility: 'Plus Two / Any Degree / Media Enthusiasts',
    description: 'Specialized in audio-video editing and post-production workflows. Learners master non-linear editing suites, multi-camera synchronisation, background score mixing, and dynamic visual effects.',
    modules: [
      'Visual Storytelling & Non-Linear Editing Principles',
      'Adobe Premiere Pro: Timeline Mastery, Transitions & Color Lumetri',
      'Edius: Fast Broadcast Editing & Newsroom Turnaround',
      'Adobe After Effects: Motion Titles, Lower Thirds & Chroma Keying',
      'Sound Editing, Audio Cleaning & Export Configurations',
    ],
    tools: ['Adobe Premiere Pro', 'Adobe After Effects', 'Edius', 'Adobe Photoshop'],
    officialUrl: 'https://www.gteceducation.com/courses/multimedia/diploma-courses/diploma-in-video-editing',
    featured: true,
  },
  {
    id: 'mm-motion-graphics',
    name: 'Professional Diploma in Motion Graphics',
    category: 'multimedia',
    categoryTitle: 'Multimedia',
    level: 'Diploma Course',
    duration: '6 Months',
    eligibility: 'Plus Two / Graduation / Design Knowledge',
    description: 'Create broadcast-standard motion graphics, animated title sequences, 3D typography, commercial adverts, and visual effects for digital platforms and television broadcast.',
    modules: [
      'Animation Principles, Timing & Interpolation',
      'Advanced After Effects: Expressions, Null Objects & Tracking',
      'Kinetic Typography, Logo Stings & Infographics',
      'Cinema 4D / 3D Asset Integration & Lighting',
      'Audio Synchronization & Commercial Showreel Production',
    ],
    tools: ['After Effects', 'Premiere Pro', 'Cinema 4D', 'Photoshop'],
    officialUrl: 'https://www.gteceducation.com/courses/multimedia/diploma-courses/professional-diploma-in-motion-graphics',
    featured: true,
  },
  {
    id: 'mm-digital-marketing',
    name: 'Professional Diploma in Digital Marketing',
    category: 'multimedia',
    categoryTitle: 'Multimedia',
    level: 'Diploma Course',
    duration: '4 Months',
    eligibility: 'Plus Two / Any Degree / Business Owners',
    description: 'Drive online visibility and brand conversions. Master search engine optimization (SEO), search advertising, social media campaigns, content strategy, and web analytics.',
    modules: [
      'Search Engine Optimization (On-Page, Off-Page & Technical SEO)',
      'Search Engine Marketing: Google Search, Display & Performance Max',
      'Social Media Marketing: Meta Ads, LinkedIn & Instagram Strategy',
      'Content Marketing, Copywriting & Video Creation',
      'Web Analytics (Google Analytics 4 & Tag Manager)',
      'Live Campaign Setup, Budget Optimization & ROI Tracking',
    ],
    tools: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'SEMrush', 'Canva'],
    officialUrl: 'https://www.gteceducation.com/courses/multimedia/diploma-courses/professional-diploma-in-digital-marketing',
    featured: false,
  },
  {
    id: 'mm-3ds-max',
    name: 'Certificate Course in 3DS MAX',
    category: 'multimedia',
    categoryTitle: 'Multimedia',
    level: 'Certificate Course',
    duration: '3 Months',
    eligibility: 'Architectural / Interior Students & 3D Visualizers',
    description: 'Photorealistic architectural visualizations, interior 3D modeling, camera physics, V-Ray material shaders, illumination techniques, and walkthrough presentations.',
    modules: [
      '3DS MAX Viewports & Precision Modeling Techniques',
      'Architectural Interior & Exterior Geometry Setup',
      'V-Ray / Arnold Lighting, Sun Systems & Physical Cameras',
      'Material Editor, PBR Texturing & Reflection Maps',
      'High-Resolution Batch Rendering & Photoshop Post-Processing',
    ],
    tools: ['Autodesk 3DS Max', 'V-Ray', 'Photoshop'],
    officialUrl: 'https://www.gteceducation.com/courses/multimedia/certificate-course/certificate-course-in-3ds-max',
    featured: false,
  },
  {
    id: 'mm-blender',
    name: 'Certificate Course in Blender',
    category: 'multimedia',
    categoryTitle: 'Multimedia',
    level: 'Certificate Course',
    duration: '3 Months',
    eligibility: 'Plus Two / Any Degree / Creative Students',
    description: 'Comprehensive 3D asset creation pipeline with Blender. Covers polygonal modeling, digital sculpting, material nodes, rigging, animation, and real-time Cycles/Eevee rendering.',
    modules: [
      'Blender UI, Navigation & Shortcut Efficiency',
      '3D Poly Modeling & Digital Mesh Sculpting',
      'UV Unwrapping, Procedural Shaders & PBR Materials',
      'Skeletal Rigging, Weight Painting & Keyframe Motion',
      'Eevee & Cycles Lighting, Cameras & Final Render Compositing',
    ],
    tools: ['Blender 3D', 'Substance 3D', 'GIMP'],
    officialUrl: 'https://www.gteceducation.com/courses/multimedia/certificate-course/certificate-course-in-blender',
    featured: false,
  },

  // ================= ACCOUNTING COURSES =================
  {
    id: 'acc-tally-essential',
    name: 'G-Accountant - Tally Essential Comprehensive',
    category: 'accounting',
    categoryTitle: 'Accounting',
    level: 'Certificate Course',
    duration: '3 Months',
    eligibility: 'Plus Two Commerce / Any Graduate / Job Seekers',
    description: 'Designed to equip learners with essential MS Office skills and in-depth practical knowledge of Tally Prime. Master bookkeeping, inventory control, GST filing, TDS compliance, and financial reporting with Tally Direct & G-TEC Global Certification.',
    modules: [
      'IT Basics & Windows Office Fundamentals',
      'Manual Accounting Principles & Double-Entry Systems',
      'Tally Prime: Company Creation, Chart of Accounts & Groups',
      'Recording Transactions: Invoicing, Vouchers & Inventory Tracking',
      'Goods & Services Tax (GST): Multi-State GST, Invoicing & Return Filing',
      'TDS Deductions, Payroll Management & Balance Sheet Preparation',
    ],
    tools: ['Tally Prime', 'MS Excel', 'GST Portal Simulator', 'MS Office'],
    officialUrl: 'https://www.gteceducation.com/courses/finance-and-business-management/certificate-course/g-accountant---tally-essential-comprehensive',
    featured: true,
  },
  {
    id: 'acc-sap-fico',
    name: 'Certificate in SAP Finance and Control (S/4 HANA)',
    category: 'accounting',
    categoryTitle: 'Accounting',
    level: 'SAP Global Certification',
    duration: '3 Months',
    eligibility: 'B.Com / M.Com / MBA Finance / CA Inter / Accountants',
    description: 'Equips participants with the capability to configure, implement, and manage financial (FI) and controlling (CO) processes integrated with the SAP S/4HANA enterprise platform in real-time corporate environments.',
    modules: [
      'SAP S/4HANA Architecture & Enterprise Organizational Structure',
      'General Ledger Accounting (FI-GL) & Universal Journal (ACDOCA)',
      'Accounts Payable (FI-AP) & Accounts Receivable (FI-AR)',
      'Asset Accounting (FI-AA) & Bank Ledger Accounting',
      'Controlling (CO): Cost Element & Cost Center Accounting (CO-CCA)',
      'Internal Orders, Profit Center Accounting & Financial Closing',
    ],
    tools: ['SAP S/4HANA ERP', 'SAP Fiori', 'SAP GUI'],
    officialUrl: 'https://www.gteceducation.com/courses/finance-and-business-management/sap-global-certification/certificate-in-sap-finance-and-control-s4-hana',
    featured: true,
  },
  {
    id: 'acc-sap-mm',
    name: 'Certificate in SAP Material Management (S/4 HANA)',
    category: 'accounting',
    categoryTitle: 'Accounting',
    level: 'SAP Global Certification',
    duration: '3 Months',
    eligibility: 'Graduates in Commerce / Science / Engineering / Supply Chain',
    description: 'Master procurement and inventory optimization with SAP S/4HANA Material Management (MM). Covers purchasing cycles, vendor master records, material master, goods receipt, and invoice verification.',
    modules: [
      'SAP MM Enterprise Structure & Global Plant Configurations',
      'Master Data: Material Master, Vendor Master & Info Records',
      'Procure-to-Pay (P2P) Cycle & Purchase Requisitions',
      'Purchase Orders, Request for Quotation (RFQ) & Contracts',
      'Goods Receipt (MIGO), Movement Types & Inventory Counts',
      'Invoice Verification (MIRO) & FI-MM Integration Mapping',
    ],
    tools: ['SAP S/4HANA MM', 'SAP Fiori Launchpad'],
    officialUrl: 'https://www.gteceducation.com/courses/finance-and-business-management/sap-global-certification/certificate-in-sap-material-management-s4-hana',
    featured: true,
  },
  {
    id: 'acc-sap-hcm',
    name: 'Certificate in SAP Human Capital Management (SAP S/4 HANA)',
    category: 'accounting',
    categoryTitle: 'Accounting',
    level: 'SAP Global Certification',
    duration: '3 Months',
    eligibility: 'Graduates / MBA in HR / HR Professionals',
    description: 'Comprehensive enterprise workforce management using SAP S/4HANA HCM. Covers organizational structures, personnel administration, time recording, payroll processing, and statutory compliance.',
    modules: [
      'Organizational Management & Organizational Plan Modeling',
      'Personnel Administration: Hiring Workflows & Employee Master Data',
      'Time Management: Work Schedules, Leave Quotas & Attendances',
      'Payroll Configuration: Wage Types, Deductions & Run Execution',
      'Statutory Compliance & Reporting Tools',
    ],
    tools: ['SAP S/4HANA HCM', 'SAP SuccessFactors Overview'],
    officialUrl: 'https://www.gteceducation.com/courses/finance-and-business-management/sap-global-certification/certificate-in-sap-human-capital-management-sap-s4-hana',
    featured: false,
  },
  {
    id: 'acc-sap-abap',
    name: 'Certificate in SAP ABAP (S/4 HANA)',
    category: 'accounting',
    categoryTitle: 'Accounting',
    level: 'SAP Global Certification',
    duration: '3 Months',
    eligibility: 'B.Tech / BCA / MCA / IT Graduates / Programmers',
    description: 'Develop custom business applications, reports, user interfaces, and backend services for SAP S/4HANA using Advanced Business Application Programming (ABAP).',
    modules: [
      'ABAP Workbench Architecture & Data Dictionary (SE11)',
      'Classical & Interactive Modularized Business Reporting',
      'Object-Oriented ABAP (Classes, Methods & Interfaces)',
      'Core Data Services (CDS Views) for S/4HANA Real-Time Analytics',
      'OData Services Creation for SAP Fiori User Interfaces',
    ],
    tools: ['SAP ABAP Workbench', 'Eclipse ADT', 'SAP GUI'],
    officialUrl: 'https://www.gteceducation.com/courses/finance-and-business-management/sap-global-certification/certificate-in-sap-abap-s4-hana',
    featured: false,
  },
];


// Application State
let currentCategory = "all";
let currentSearchTerm = "";

// Course lookup map
const courseMap = {};
if (typeof verifiedCourses !== "undefined") {
  verifiedCourses.forEach(c => {
    courseMap[c.id] = c;
  });
}

// ==========================================================================
// 1. DISCIPLINE MATRIX & SEARCH ORCHESTRATOR
// ==========================================================================
function renderCourses() {
  const grid = document.getElementById("courses-grid");
  if (!grid || typeof verifiedCourses === "undefined") return;

  const filtered = verifiedCourses.filter(course => {
    const matchCat = (currentCategory === "all" || course.category === currentCategory);
    const q = currentSearchTerm.toLowerCase().trim();
    const matchSearch = !q || 
      course.name.toLowerCase().includes(q) || 
      (course.description && course.description.toLowerCase().includes(q)) ||
      (course.tools && course.tools.some(t => t.toLowerCase().includes(q))) ||
      (course.modules && course.modules.some(m => m.toLowerCase().includes(q)));
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 3rem 1.5rem; text-align: center; background: #FFFFFF; border-radius: 12px; border: 1px solid var(--border-light);">
        <p style="font-size: 1.15rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.5rem;">
          No matching courses found
        </p>
        <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">
          Try searching for another keyword like "Python", "Revit", "SAP", or "Accounting".
        </p>
        <button class="btn btn-outline btn-sm" onclick="setCategory('all')">
          Show All Courses
        </button>
      </div>
    `;
    return;
  }

    const categoryImages = {
    cad: "./student-workstation.jpg",
    software: "./students-coding-lab.jpg",
    multimedia: "./students-learning.jpg",
    accounting: "./training-lab-perspective.jpg"
  };

  grid.innerHTML = filtered.map(c => `
    <article class="armor-course-card" id="card-${c.id}">
      <div class="course-card-top" style="background-image: url('${categoryImages[c.category] || "./training-lab-wide.jpg"}');">
        <span class="course-category-badge">${c.category.toUpperCase()}</span>
        <span class="course-duration-badge">${c.duration || "Verified Track"}</span>
      </div>
      <div class="course-card-body">
        <h3><a href="#courses" onclick="openCourseModal('${c.id}')">${c.name}</a></h3>
        <p class="course-card-desc">${c.description || "Comprehensive hands-on training curriculum aligned with international industry standards."}</p>
        
        ${c.tools && c.tools.length > 0 ? `
          <div class="course-tools-deck">
            ${c.tools.slice(0, 4).map(t => `<span class="tool-chip">${t}</span>`).join("")}
            ${c.tools.length > 4 ? `<span class="tool-chip">+${c.tools.length - 4} more</span>` : ""}
          </div>
        ` : ""}
      </div>

      <div class="course-card-footer">
        <button type="button" class="btn btn-navy btn-sm" onclick="openCourseModal('${c.id}')">
          <span>View Syllabus</span>
        </button>
        <a href="https://wa.me/916238843939?text=${encodeURIComponent('Hello G-TEC Education Ottappalam, I would like to know more about the ' + c.name + ' course. Please share admission details.')}" 
           target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="Enquire about ${c.name} on WhatsApp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.12-.533-1.821-.756-2.986-2.614-3.076-2.735-.09-.12-0.739-.983-.739-1.874 0-.891.468-1.328.635-1.507.167-.179.366-.224.488-.224.122 0 .245.002.35.008.113.006.262-.042.411.314.155.371.531 1.296.577 1.39.046.094.077.204.015.327-.061.123-.092.199-.183.307-.091.107-.193.24-.276.323-.092.092-.188.193-.081.378.107.184.475.786 1.021 1.272.703.627 1.296.822 1.48.914.184.092.292.077.4-.046.108-.123.461-.537.584-.722.123-.184.246-.154.414-.092.169.062 1.07.505 1.254.597.184.092.307.138.353.215.046.077.046.447-.098.852z"/>
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </article>
  `).join("");
}

function setCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll(".course-tab-pill, .category-filter-btn").forEach(btn => {
    const isTarget = btn.getAttribute("data-category") === cat;
    btn.classList.toggle("active", isTarget);
  });
  renderCourses();
}

function resetCourseFilters() {
  currentCategory = "all";
  currentSearchTerm = "";
  const input = document.getElementById("course-search-input");
  if (input) input.value = "";
  document.querySelectorAll(".discipline-tab-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  renderCourses();
}

// ==========================================================================
// 2. INTERACTIVE COURSE SYLLABUS MODAL
// ==========================================================================
function openCourseModal(courseId) {
  const course = courseMap[courseId];
  if (!course) return;

  const overlay = document.getElementById("course-modal-overlay");
  const modalContent = document.getElementById("course-modal-content");
  if (!overlay || !modalContent) return;

  const waMsg = `Hello G-TEC Education Ottappalam, I would like to enquire about the ${course.name} course at your Ottappalam centre. Please share syllabus and batch schedules.`;
  const waUrl = `https://wa.me/916238843939?text=${encodeURIComponent(waMsg)}`;

  modalContent.innerHTML = `
    <div style="padding: 24px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 6px;">
          <span class="course-category-badge" style="position: static;">${course.category.toUpperCase()}</span>
          <span style="font-size: 13px; font-weight: 600; color: var(--color-slate-muted);">${course.duration || "Verified Track"}</span>
        </div>
        <h2 style="font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--color-navy); margin-top: 8px; margin-bottom: 6px;">${course.name}</h2>
        <p style="font-size: 14px; color: var(--color-slate-body); max-width: 540px;">${course.description || "Industry accredited training program designed for practical execution."}</p>
      </div>
      <button type="button" style="background: none; border: none; font-size: 26px; cursor: pointer; color: var(--color-slate-dark);" onclick="closeCourseModal()" aria-label="Close modal">&times;</button>
    </div>

    <div style="padding: 24px;">
      ${course.eligibility ? `
        <div style="margin-bottom: 20px; background: var(--bg-alt); padding: 12px 16px; border-radius: 8px; border: 1px solid var(--border-color);">
          <strong style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-navy);">Eligibility:</strong>
          <span style="font-size: 14px; color: var(--color-slate-body); margin-left: 6px;">${course.eligibility}</span>
        </div>
      ` : ""}

      ${course.tools && course.tools.length > 0 ? `
        <div style="margin-bottom: 22px;">
          <h4 style="font-family: var(--font-display); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; color: var(--color-navy);">Software & Tools Covered</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            ${course.tools.map(t => `<span class="tool-chip" style="font-size: 12px; padding: 4px 10px;">${t}</span>`).join("")}
          </div>
        </div>
      ` : ""}

      ${course.modules && course.modules.length > 0 ? `
        <div>
          <h4 style="font-family: var(--font-display); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; color: var(--color-navy);">Curriculum Modules</h4>
          <div style="display: grid; gap: 8px;">
            ${course.modules.map((m, idx) => `
              <div style="display: flex; gap: 10px; align-items: flex-start; padding: 10px 14px; background: #FFFFFF; border: 1px solid var(--border-color); border-radius: 8px;">
                <span style="font-family: var(--font-display); font-size: 11px; font-weight: 700; color: var(--color-navy); margin-top: 3px;">0${idx+1}.</span>
                <span style="font-size: 13.5px; color: var(--color-slate-body); font-weight: 500;">${m}</span>
              </div>
            `).join("")}
          </div>
        </div>
      ` : ""}
    </div>

    <div style="padding: 16px 24px; background: #FAFAFA; border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
      <div style="font-size: 13px; color: var(--color-slate-muted);">
        Certified at G-TEC Ottappalam • JRJ Complex
      </div>
      <div style="display: flex; gap: 10px;">
        <a href="tel:+919995955501" class="btn btn-outline btn-sm">
          <span>Call 9995955501</span>
        </a>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </div>
  `;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCourseModal() {
  const overlay = document.getElementById("course-modal-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ==========================================================================
// 3. INTERACTIVE CAREER MATCHER ("FIND YOUR MATCH")
// ==========================================================================
const careerMatches = {
  code: {
    title: "Software Engineering & Full Stack Track",
    courseId: "python-fullstack",
    courseName: "Full-Stack Web Developer - Python",
    description: "Build production web apps, REST APIs, and modern frontend interfaces using Python, Django, PostgreSQL, and JavaScript.",
    tools: ["Python", "Django", "PostgreSQL", "HTML5", "CSS3", "JavaScript", "Git"]
  },
  cad: {
    title: "Architectural & BIM Engineering Track",
    courseId: "revit-architecture",
    courseName: "Certificate Course in Revit Architecture",
    description: "Design 3D building information models, parametric architectural structures, and professional construction documentation.",
    tools: ["Autodesk Revit", "BIM Workflows", "3D Modeling", "Construction Specs"]
  },
  media: {
    title: "Visual Arts, Motion & 3D Animation Track",
    courseId: "motion-graphics",
    courseName: "Professional Diploma in Motion Graphics",
    description: "Master digital video editing, motion graphics, visual effects, and cinematic creative storytelling.",
    tools: ["Adobe Premiere Pro", "After Effects", "Photoshop", "Cinema 4D Basics"]
  },
  finance: {
    title: "Enterprise Accounting & SAP S/4HANA Track",
    courseId: "sap-fico",
    courseName: "Certificate in SAP Finance and Control (S/4 HANA)",
    description: "Master modern enterprise finance, balance sheets, automated ledger control, and global SAP ERP workflows.",
    tools: ["SAP S/4HANA", "Financial Accounting", "Controlling", "General Ledger"]
  }
};

function selectMatcherOption(fieldKey) {
  document.querySelectorAll(".matcher-choice-card").forEach(c => {
    c.classList.remove("selected");
  });
  const targetCard = document.getElementById(`matcher-opt-${fieldKey}`);
  if (targetCard) targetCard.classList.add("selected");

  const match = careerMatches[fieldKey];
  const resultBox = document.getElementById("matcher-result-box");
  if (!match || !resultBox) return;

  const waUrl = `https://wa.me/916238843939?text=${encodeURIComponent('Hello G-TEC Ottappalam, the Career Matcher suggested the ' + match.courseName + ' track for me. Can you share syllabus and guidance?')}`;

  resultBox.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
      <div>
        <span class="editorial-badge red" style="margin-bottom: 0.5rem;">Recommended Career Match</span>
        <h3 style="font-size: 1.5rem; margin-top: 0.35rem; margin-bottom: 0.35rem;">${match.courseName}</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary); max-width: 650px;">${match.description}</p>
      </div>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
        <button type="button" class="btn btn-navy btn-sm" onclick="openCourseModal('${match.courseId}')">
          View Full Syllabus
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
          Discuss With Counselor
        </a>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
      ${match.tools.map(t => `<span class="tool-chip">${t}</span>`).join("")}
    </div>
  `;
  resultBox.classList.add("visible");
}

// ==========================================================================
// 4. FLOATING BOTTOM DOCK & SCROLL ORCHESTRATION
// ==========================================================================
function initFloatingDock() {
  const dock = document.getElementById("floating-conversion-dock");
  if (!dock) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      dock.classList.add("dock-visible");
    } else {
      dock.classList.remove("dock-visible");
    }
  }, { passive: true });
}

// ==========================================================================
// 5. MOBILE DRAWER NAVIGATION
// ==========================================================================
function toggleMobileDrawer(open) {
  const drawer = document.getElementById("mobile-nav-drawer");
  if (!drawer) return;
  drawer.classList.toggle("active", open);
  document.body.style.overflow = open ? "hidden" : "";
}

// ==========================================================================
// 6. INITIALIZATION ON DOM READY
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderCourses();
  initFloatingDock();

  // Search input binding
  const searchInput = document.getElementById("course-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchTerm = e.target.value;
      renderCourses();
    });
  }

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCourseModal();
  });

  // Modal backdrop click
  const overlay = document.getElementById("course-modal-overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCourseModal();
    });
  }
});
