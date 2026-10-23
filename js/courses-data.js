/**
 * G-TEC Education Ottapalam - Official Verified Course Catalog
 * Exact 24 specialized courses across 4 premier domains provided by G-TEC Ottapalam
 */

const GTEC_CATEGORIES = {
  "software": {
    "key": "software",
    "title": "Software Development & IT",
    "icon": "code-2",
    "badge": "Software & IT",
    "courseCount": 7,
    "color": "from-blue-600 to-indigo-600",
    "description": "Full-Stack Development, Flutter Mobile, MERN, AI & Data Science, UI/UX Design, Generative AI, and Office Automation with 100% lab practice."
  },
  "multimedia": {
    "key": "multimedia",
    "title": "Multimedia & Visual Arts",
    "icon": "palette",
    "badge": "Multimedia & Arts",
    "courseCount": 6,
    "color": "from-amber-500 to-orange-500",
    "description": "Graphic Design, Video Editing, Motion Graphics, Digital Marketing, 3DS Max architectural rendering, and Blender 3D animation."
  },
  "cad": {
    "key": "cad",
    "title": "CAD & Engineering Design",
    "icon": "ruler",
    "badge": "CAD & Engineering",
    "courseCount": 6,
    "color": "from-rose-600 to-red-600",
    "description": "Revit Architecture & BIM, SolidWorks 3D, AutoCAD Electrical, CATIA V5, Staad-Pro structural analysis, and G-Draughtsman."
  },
  "accounting": {
    "key": "accounting",
    "title": "Corporate Accounting & SAP",
    "icon": "calculator",
    "badge": "Accounting & SAP",
    "courseCount": 5,
    "color": "from-emerald-600 to-teal-600",
    "description": "TallyPrime with GST compliance, SAP S/4 HANA FICO, SAP Material Management, SAP Human Capital Management, and SAP ABAP development."
  }
};

const GTEC_COURSES = [
  // =========================================================================
  // DOMAIN 1: CAD & ENGINEERING DESIGN (6 COURSES)
  // =========================================================================
  {
    "id": "cad-revit-architecture",
    "title": "Certificate Course in Revit Architecture",
    "categoryKey": "cad",
    "categoryName": "CAD & Engineering Design",
    "subCategory": "Architectural BIM & 3D Modeling",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "3 Months",
    "badge": "CAD & Engineering",
    "tools": "Autodesk Revit Architecture, BIM 360, Enscape",
    "toolsList": ["Autodesk Revit", "BIM 360", "Enscape"],
    "tags": ["Revit", "BIM 360", "Enscape", "Architecture", "3D Modeling"],
    "description": "Master building information modeling (BIM), parametric 3D architectural modeling, construction documentation, dynamic scheduling, and photorealistic Enscape walkthroughs.",
    "highlights": [
      "Parametric Building Information Modeling (BIM) workflows",
      "Real-time photorealistic walkthroughs and rendering with Enscape",
      "Detailed architectural floor plans, sections, elevations & scheduling",
      "BIM 360 cloud collaboration and project documentation standards"
    ],
    "mode": "Classroom & 1:1 CAD Workstation Lab",
    "placementSupport": true,
    "certified": "Autodesk / G-TEC Global Certification"
  },
  {
    "id": "cad-solidworks",
    "title": "Certificate Course in Solidworks",
    "categoryKey": "cad",
    "categoryName": "CAD & Engineering Design",
    "subCategory": "Mechanical 3D CAD & Simulation",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "3 Months",
    "badge": "CAD & Engineering",
    "tools": "SolidWorks 3D CAD, PhotoView 360, SolidWorks Simulation",
    "toolsList": ["SolidWorks 3D", "PhotoView 360", "Simulation"],
    "tags": ["SolidWorks", "Mechanical CAD", "Simulation", "Product Design"],
    "description": "Comprehensive mechanical product design, 3D part modeling, advanced assembly creation, sheet metal design, kinematic motion simulation, and photorealistic rendering.",
    "highlights": [
      "Parametric 3D part design, complex sketches, and feature modeling",
      "Assembly mate configurations, collision detection & motion analysis",
      "Stress, strain, and thermal FEA simulations with SolidWorks Simulation",
      "Sheet metal fabrication, weldments, and photorealistic rendering"
    ],
    "mode": "Classroom & 1:1 CAD Workstation Lab",
    "placementSupport": true,
    "certified": "Dassault Systèmes / G-TEC Global Certification"
  },
  {
    "id": "cad-autocad-electrical",
    "title": "Certificate Course in AutoCAD Electrical",
    "categoryKey": "cad",
    "categoryName": "CAD & Engineering Design",
    "subCategory": "Electrical Schematics & Control Systems",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "2 Months",
    "badge": "CAD & Engineering",
    "tools": "AutoCAD Electrical, Autodesk Design Suite",
    "toolsList": ["AutoCAD Electrical", "Autodesk Suite"],
    "tags": ["AutoCAD Electrical", "Schematics", "Panel Layout", "Control Circuits"],
    "description": "Specialized electrical engineering design training covering comprehensive electrical schematic generation, control panel layout drafting, PLC I/O circuits, and wiring reports.",
    "highlights": [
      "Comprehensive schematic diagrams, ladder rungs & wire numbering",
      "Physical control panel footprint layout with automated terminal strips",
      "PLC I/O module drafting, cross-referencing, and component tagging",
      "Automated Bills of Materials (BOM) and conduit routing reports"
    ],
    "mode": "Classroom & 1:1 CAD Workstation Lab",
    "placementSupport": true,
    "certified": "Autodesk / G-TEC Certification"
  },
  {
    "id": "cad-catia",
    "title": "Certificate Course in Catia",
    "categoryKey": "cad",
    "categoryName": "CAD & Engineering Design",
    "subCategory": "Aerospace & Automotive Engineering",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "3 Months",
    "badge": "CAD & Engineering",
    "tools": "Dassault CATIA V5/V6, 3DEXPERIENCE",
    "toolsList": ["CATIA V5/V6", "3DEXPERIENCE"],
    "tags": ["CATIA", "Aerospace CAD", "Automotive Design", "Surface Modeling"],
    "description": "Industry-standard automotive and aerospace engineering suite training: advanced class-A generative surface design, solid part modeling, assembly workbench, and DMU kinematics.",
    "highlights": [
      "Generative Shape Design (GSD) for advanced Class-A industrial surfacing",
      "Automotive chassis, body-in-white (BIW), and aerospace component modeling",
      "DMU Kinematics simulation and digital mockup assembly verification",
      "Generative drafting and GD&T tolerance integration"
    ],
    "mode": "Classroom & 1:1 CAD Workstation Lab",
    "placementSupport": true,
    "certified": "Dassault Systèmes / G-TEC Global Certification"
  },
  {
    "id": "cad-staad-pro",
    "title": "Certificate Course in Staad-Pro",
    "categoryKey": "cad",
    "categoryName": "CAD & Engineering Design",
    "subCategory": "Civil Structural Analysis & Design",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "2 Months",
    "badge": "CAD & Engineering",
    "tools": "STAAD.Pro Connect Edition, RAM Connection",
    "toolsList": ["STAAD.Pro Connect", "RAM Connection"],
    "tags": ["STAAD.Pro", "Structural Analysis", "Civil Design", "Concrete & Steel"],
    "description": "Civil structural design and 3D finite element analysis for multi-story buildings, steel industrial sheds, foundation systems, seismic load calculations, and wind analysis per IS codes.",
    "highlights": [
      "3D structural modeling of RC frames, trusses, and industrial steel sheds",
      "Dead, live, wind, and earthquake seismic load combinations per IS 1893",
      "Concrete column/beam design, reinforcement detailing & deflection checks",
      "Steel connection design and foundation sizing with RAM Connection"
    ],
    "mode": "Classroom & 1:1 CAD Workstation Lab",
    "placementSupport": true,
    "certified": "Bentley Systems / G-TEC Global Certification"
  },
  {
    "id": "cad-g-draughtsman",
    "title": "G-Draughtsman",
    "categoryKey": "cad",
    "categoryName": "CAD & Engineering Design",
    "subCategory": "Architectural & Civil 2D Drafting",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "3 Months",
    "badge": "CAD & Engineering",
    "tools": "AutoCAD 2D, Drafting Tools",
    "toolsList": ["AutoCAD 2D", "Drafting Tools"],
    "tags": ["AutoCAD 2D", "Architectural Drafting", "Blueprints", "Civil Plans"],
    "description": "Foundation civil and architectural drafting program covering standard blueprint reading, 2D municipal submission plans, building elevations, sectional details, and approval documentation.",
    "highlights": [
      "Precision 2D technical drawings, dimensioning, layers, and blocks",
      "Panchayat and municipal building rule (KMBR) compliance drawings",
      "Detailed structural working drawings, foundation layouts, and staircases",
      "Professional plotting, scale factors, and client presentation sheets"
    ],
    "mode": "Classroom & 1:1 CAD Workstation Lab",
    "placementSupport": true,
    "certified": "G-TEC Certified Draughtsman"
  },

  // =========================================================================
  // DOMAIN 2: SOFTWARE DEVELOPMENT & IT (7 COURSES)
  // =========================================================================
  {
    "id": "dev-fullstack-python",
    "title": "Full-Stack Web Developer – Python",
    "categoryKey": "software",
    "categoryName": "Software Development & IT",
    "subCategory": "Python & Django Full-Stack",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "6 Months",
    "badge": "Software & IT",
    "tools": "Python, Django, MySQL, JavaScript, Bootstrap, Git, Postman",
    "toolsList": ["Python", "Django", "MySQL", "JavaScript", "Git", "Postman"],
    "tags": ["Python", "Django", "Full-Stack", "REST API", "MySQL", "Backend"],
    "description": "End-to-end full-stack web engineering curriculum: Core Python, Object-Oriented Architecture, Django framework, REST APIs with Postman, MySQL relational databases, and Git version control.",
    "highlights": [
      "Advanced Python programming, OOP design patterns, and modular architecture",
      "Full-featured web apps with Django MTV architecture, ORM & Auth systems",
      "Building and testing secure RESTful APIs with Postman and JWT authentication",
      "Relational database design in MySQL, responsive frontends, and cloud deployment"
    ],
    "mode": "Classroom & Hands-on Coding Lab",
    "placementSupport": true,
    "certified": "G-TEC / NSDC / Global Certification"
  },
  {
    "id": "dev-fullstack-flutter",
    "title": "Full-Stack Web Developer – Flutter",
    "categoryKey": "software",
    "categoryName": "Software Development & IT",
    "subCategory": "Cross-Platform Mobile & Web Apps",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "6 Months",
    "badge": "Software & IT",
    "tools": "Flutter, Dart, Firebase, Android Studio, VS Code, Git",
    "toolsList": ["Flutter", "Dart", "Firebase", "Android Studio", "VS Code"],
    "tags": ["Flutter", "Dart", "Mobile App", "Firebase", "Android", "iOS"],
    "description": "High-demand cross-platform mobile application development for Android, iOS, and Web using Google Flutter and Dart, with Firebase cloud backends and state management.",
    "highlights": [
      "Modern Dart programming language fundamentals and reactive asynchronous programming",
      "Pixel-perfect responsive UI with Flutter widget trees and custom animations",
      "State management mastery using Provider / Bloc / Riverpod architectural patterns",
      "Firebase Auth, Cloud Firestore NoSQL, Cloud Functions, and Google Play Store publishing"
    ],
    "mode": "Classroom & Hands-on Coding Lab",
    "placementSupport": true,
    "certified": "G-TEC / NSDC / Global Certification"
  },
  {
    "id": "dev-fullstack-mern",
    "title": "Full-Stack Web Developer – MERN",
    "categoryKey": "software",
    "categoryName": "Software Development & IT",
    "subCategory": "Modern JavaScript Full-Stack",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "6 Months",
    "badge": "Software & IT",
    "tools": "React.js, Node.js, Express.js, MongoDB, Redux, Tailwind CSS",
    "toolsList": ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Tailwind"],
    "tags": ["MERN", "React", "Node.js", "MongoDB", "Express", "Full-Stack"],
    "description": "Industry gold-standard JavaScript web stack: single-page applications with React.js and Redux, backend microservices with Node.js and Express, and MongoDB NoSQL database.",
    "highlights": [
      "Modern ES6+ JavaScript, functional components, hooks, and React Router",
      "Global state management with Redux Toolkit and modern Tailwind CSS UI",
      "Scalable backend API development with Node.js, Express.js, and middleware",
      "MongoDB aggregation, Mongoose schemas, token authentication, and full-stack deployment"
    ],
    "mode": "Classroom & Hands-on Coding Lab",
    "placementSupport": true,
    "certified": "G-TEC / NSDC / Global Certification"
  },
  {
    "id": "dev-master-ai-datascience",
    "title": "Master Diploma in AI & Data Science",
    "categoryKey": "software",
    "categoryName": "Software Development & IT",
    "subCategory": "Machine Learning & Big Data Analytics",
    "level": "Master",
    "levelDisplay": "Master Course",
    "duration": "8 Months",
    "badge": "Software & IT",
    "tools": "Python, TensorFlow, Pandas, Scikit-Learn, Jupyter, Tableau",
    "toolsList": ["Python", "TensorFlow", "Pandas", "Scikit-Learn", "Tableau"],
    "tags": ["Data Science", "Machine Learning", "AI", "TensorFlow", "Python", "Tableau"],
    "description": "Flagship career program in Artificial Intelligence, predictive data science, statistical modeling, machine learning algorithms with Scikit-Learn, neural networks with TensorFlow, and business intelligence with Tableau.",
    "highlights": [
      "Exploratory Data Analysis (EDA), NumPy, Pandas, and statistical inference",
      "Supervised & unsupervised Machine Learning (Regression, Classification, Clustering)",
      "Deep Learning neural architectures with TensorFlow and computer vision basics",
      "Interactive executive dashboards and business storytelling with Tableau"
    ],
    "mode": "Classroom & Hands-on Coding Lab",
    "placementSupport": true,
    "certified": "G-TEC Master Diploma / NSDC / Global Certification"
  },
  {
    "id": "dev-ui-ux-designing",
    "title": "Advanced Diploma in UI/UX Designing",
    "categoryKey": "software",
    "categoryName": "Software Development & IT",
    "subCategory": "Product Design & Design Systems",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "4 Months",
    "badge": "Software & IT",
    "tools": "Figma, Adobe XD, Miro, FigJam",
    "toolsList": ["Figma", "Adobe XD", "Miro", "FigJam"],
    "tags": ["UI/UX", "Figma", "Product Design", "Wireframing", "Prototyping"],
    "description": "Human-centered digital product design: user research methodologies, information architecture, wireframing, high-fidelity responsive UI design, interactive prototyping, and component design systems.",
    "highlights": [
      "UX research methods, user personas, journey mapping & Miro empathy frameworks",
      "Design systems, auto-layout, component variants, and tokens in Figma",
      "High-fidelity interactive prototyping, micro-interactions, and smart animation",
      "Usability testing, developer handoff specifications, and live Behance portfolio building"
    ],
    "mode": "Classroom & Creative Design Studio",
    "placementSupport": true,
    "certified": "G-TEC Certified UI/UX Specialist"
  },
  {
    "id": "dev-generative-ai",
    "title": "Certificate Course in Generative AI",
    "categoryKey": "software",
    "categoryName": "Software Development & IT",
    "subCategory": "Prompt Engineering & LLM Applications",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "2 Months",
    "badge": "Software & IT",
    "tools": "ChatGPT, OpenAI API, Midjourney, Python, LangChain",
    "toolsList": ["ChatGPT", "OpenAI API", "Midjourney", "Python", "LangChain"],
    "tags": ["Generative AI", "ChatGPT", "LLMs", "LangChain", "Prompt Engineering"],
    "description": "Cutting-edge practical curriculum on modern Artificial Intelligence: advanced prompt engineering, OpenAI APIs, building intelligent agents with LangChain, retrieval augmented generation (RAG), and creative AI synthesis.",
    "highlights": [
      "Advanced prompt engineering strategies for ChatGPT, Claude, and Midjourney",
      "Developing LLM-powered applications using Python, OpenAI API, and LangChain",
      "Retrieval Augmented Generation (RAG) architecture and vector database search",
      "AI workflow automation for content generation, coding, and enterprise productivity"
    ],
    "mode": "Classroom & Hands-on Coding Lab",
    "placementSupport": true,
    "certified": "G-TEC Certificate in GenAI"
  },
  {
    "id": "dev-office-automation",
    "title": "Diploma in Office Automation",
    "categoryKey": "software",
    "categoryName": "Software Development & IT",
    "subCategory": "Corporate Productivity & Cloud Suites",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "3 Months",
    "badge": "Software & IT",
    "tools": "MS Word, MS Excel, MS PowerPoint, MS Outlook, Google Docs",
    "toolsList": ["MS Word", "MS Excel", "MS PowerPoint", "Outlook", "Google Docs"],
    "tags": ["Office Automation", "Advanced Excel", "MS Office", "Corporate Tools"],
    "description": "Essential corporate workplace computing diploma covering advanced Microsoft Office and Google Workspace suites, automated spreadsheets, financial VLOOKUP/XLOOKUP formulas, pivot tables, and professional email correspondence.",
    "highlights": [
      "Advanced MS Excel: nested IF formulas, VLOOKUP/XLOOKUP, Pivot Tables, and charts",
      "Corporate documentation, mail merge, and official letter drafting in MS Word",
      "Executive multimedia slide presentations and template design in PowerPoint",
      "Business communications in MS Outlook and cloud team collaboration in Google Workspace"
    ],
    "mode": "Classroom & Dedicated PC Workstation Lab",
    "placementSupport": true,
    "certified": "G-TEC Diploma / Govt. Recognized Certification"
  },

  // =========================================================================
  // DOMAIN 3: MULTIMEDIA & VISUAL ARTS (6 COURSES)
  // =========================================================================
  {
    "id": "media-graphic-designing",
    "title": "Diploma in Graphic Designing",
    "categoryKey": "multimedia",
    "categoryName": "Multimedia & Visual Arts",
    "subCategory": "Visual Branding & Vector Design",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "4 Months",
    "badge": "Multimedia & Arts",
    "tools": "Adobe Photoshop, CorelDraw, Illustrator, InDesign",
    "toolsList": ["Photoshop", "Illustrator", "CorelDraw", "InDesign"],
    "tags": ["Graphic Design", "Photoshop", "Illustrator", "Branding", "CorelDraw"],
    "description": "Professional brand design and creative visual publishing: master photo manipulation in Photoshop, vector branding in Illustrator, print packaging in CorelDraw, and multi-page editorial layouts in InDesign.",
    "highlights": [
      "Advanced photo retouching, color grading, masking, and matte painting in Photoshop",
      "Corporate logo design, vector typography, and icon creation in Adobe Illustrator",
      "Commercial print packaging, hoardings, and vector drafting in CorelDraw",
      "Magazines, brochures, book layouts, and prepress prep in Adobe InDesign"
    ],
    "mode": "Classroom & Creative Design Lab",
    "placementSupport": true,
    "certified": "Adobe / G-TEC Global Certification"
  },
  {
    "id": "media-video-editing",
    "title": "Diploma in Video Editing",
    "categoryKey": "multimedia",
    "categoryName": "Multimedia & Visual Arts",
    "subCategory": "Cinematic Post-Production & Sound Design",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "4 Months",
    "badge": "Multimedia & Arts",
    "tools": "Adobe Premiere Pro, After Effects, Edius, Photoshop",
    "toolsList": ["Premiere Pro", "After Effects", "Edius", "Photoshop"],
    "tags": ["Video Editing", "Premiere Pro", "After Effects", "Color Grading", "Edius"],
    "description": "Comprehensive film and commercial video editing course covering non-linear cutting in Premiere Pro, multi-camera edits in Edius, motion graphics in After Effects, and cinematic Lumetri color grading.",
    "highlights": [
      "Cinematic narrative pacing, rhythm, transitions, and multi-camera synchronization",
      "Advanced color grading and film emulation using Lumetri Color scopes",
      "Motion titles, lower-thirds, green-screen chroma keying in After Effects",
      "Multi-format broadcast exports for YouTube, Instagram Reels, and OTT platforms"
    ],
    "mode": "Classroom & High-Spec Editing Workstations",
    "placementSupport": true,
    "certified": "G-TEC Certified Video Editor"
  },
  {
    "id": "media-motion-graphics",
    "title": "Professional Diploma in Motion Graphics",
    "categoryKey": "multimedia",
    "categoryName": "Multimedia & Visual Arts",
    "subCategory": "Broadcast Design & Visual Effects",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "6 Months",
    "badge": "Multimedia & Arts",
    "tools": "After Effects, Premiere Pro, Cinema 4D, Photoshop",
    "toolsList": ["After Effects", "Cinema 4D", "Premiere Pro", "Photoshop"],
    "tags": ["Motion Graphics", "After Effects", "Cinema 4D", "VFX", "Animation"],
    "description": "Advanced broadcast motion design and visual effects: kinetic typography, 2D/3D title sequences, dynamic brand stingers, particle physics, and 3D motion graphics combining After Effects and Cinema 4D.",
    "highlights": [
      "Principles of animation, graph editor easing, and kinetic typography sequencing",
      "3D layers, lighting, camera rigs, and element compositing in After Effects",
      "Cinema 4D MoGraph tools, cloners, dynamics, and Redshift lighting basics",
      "Visual effects compositing, rotoscoping, object tracking, and showreel creation"
    ],
    "mode": "Classroom & High-Spec Editing Workstations",
    "placementSupport": true,
    "certified": "G-TEC Professional Diploma"
  },
  {
    "id": "media-digital-marketing",
    "title": "Professional Diploma in Digital Marketing",
    "categoryKey": "multimedia",
    "categoryName": "Multimedia & Visual Arts",
    "subCategory": "Performance Marketing & SEO/SEM",
    "level": "Diploma",
    "levelDisplay": "Diploma Course",
    "duration": "4 Months",
    "badge": "Multimedia & Arts",
    "tools": "Google Ads, Meta Business Suite, GA4, SEMrush, Canva",
    "toolsList": ["Google Ads", "Meta Ads", "GA4", "SEMrush", "Canva"],
    "tags": ["Digital Marketing", "SEO", "Google Ads", "Social Media", "Analytics"],
    "description": "High-ROI digital growth strategies: Search Engine Optimization (SEO), pay-per-click Google Search & Display Ads, Meta Ads Manager (Facebook/Instagram), content marketing, and Google Analytics 4.",
    "highlights": [
      "On-page, technical, and off-page SEO with keyword research tools like SEMrush",
      "Creating and managing profitable PPC campaigns across Google Search & YouTube",
      "Targeted lead generation and retargeting campaigns in Meta Business Suite",
      "Web traffic tracking, conversion funnel optimization with GA4 and Google Tag Manager"
    ],
    "mode": "Classroom & Live Campaign Lab",
    "placementSupport": true,
    "certified": "Google / Meta / G-TEC Global Certification"
  },
  {
    "id": "media-3ds-max",
    "title": "Certificate Course in 3DS MAX",
    "categoryKey": "multimedia",
    "categoryName": "Multimedia & Visual Arts",
    "subCategory": "Architectural Visualization & V-Ray",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "3 Months",
    "badge": "Multimedia & Arts",
    "tools": "Autodesk 3ds Max, V-Ray, Photoshop",
    "toolsList": ["3ds Max", "V-Ray", "Photoshop"],
    "tags": ["3ds Max", "V-Ray", "ArchViz", "3D Rendering", "Interior Design"],
    "description": "High-end architectural visualization and interior design rendering using Autodesk 3ds Max: high-poly modeling, realistic PBR materials, daylight/artificial lighting, and photorealistic V-Ray rendering.",
    "highlights": [
      "Precision architectural 3D modeling from AutoCAD floor plans and sections",
      "Photorealistic material creation, UV unwrapping, and texture mapping",
      "Interior and exterior lighting setups with V-Ray Sun, Sky, and IES photometric lights",
      "High-resolution architectural renders and post-production color balance in Photoshop"
    ],
    "mode": "Classroom & 1:1 GPU Workstation Lab",
    "placementSupport": true,
    "certified": "Autodesk / G-TEC Global Certification"
  },
  {
    "id": "media-blender",
    "title": "Certificate Course in Blender",
    "categoryKey": "multimedia",
    "categoryName": "Multimedia & Visual Arts",
    "subCategory": "Open-Source 3D Modeling & Animation",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "3 Months",
    "badge": "Multimedia & Arts",
    "tools": "Blender 3D, Substance 3D, GIMP",
    "toolsList": ["Blender 3D", "Substance 3D", "GIMP"],
    "tags": ["Blender", "3D Animation", "Sculpting", "Cycles", "Character Design"],
    "description": "Full-spectrum 3D creation with open-source industry standard Blender: hard-surface & organic sculpting, character rigging, procedural shader nodes, particle simulations, and Cycles raytracing.",
    "highlights": [
      "Hard-surface polygon modeling and digital sculpting workflows in Blender",
      "Procedural material creation using Blender shader nodes and PBR textures",
      "Character armature bone rigging, weight painting, and keyframe animation",
      "Fast real-time preview in Eevee and cinematic photorealistic raytracing in Cycles"
    ],
    "mode": "Classroom & 1:1 GPU Workstation Lab",
    "placementSupport": true,
    "certified": "G-TEC Certificate in 3D Blender"
  },

  // =========================================================================
  // DOMAIN 4: CORPORATE ACCOUNTING & SAP (5 COURSES)
  // =========================================================================
  {
    "id": "acc-tally-comprehensive",
    "title": "G-Accountant – Tally Essential Comprehensive",
    "categoryKey": "accounting",
    "categoryName": "Corporate Accounting & SAP",
    "subCategory": "Practical Indian Accounting & GST Compliance",
    "level": "Certificate",
    "levelDisplay": "Certificate Course",
    "duration": "3 Months",
    "badge": "Accounting & SAP",
    "tools": "TallyPrime, MS Excel, GST Portal Simulator, MS Office",
    "toolsList": ["TallyPrime", "MS Excel", "GST Simulator", "MS Office"],
    "tags": ["TallyPrime", "GST", "TDS", "Financial Accounting", "Income Tax"],
    "description": "Hands-on corporate accounting mastery using TallyPrime: journal vouchers, ledgers, inventory tracking, payroll processing, GST return filing (GSTR-1, 3B), e-Way bills, and TDS/TCS compliance.",
    "highlights": [
      "Double-entry bookkeeping, voucher entries, and trial balance generation in TallyPrime",
      "GST computation, input tax credit (ITC) reconciliation, and portal filing simulations",
      "TDS and TCS statutory compliance, payment challans, and payroll processing",
      "Final accounts preparation: Balance Sheet, Profit & Loss statements, and Bank Reconciliation"
    ],
    "mode": "Classroom & Hands-on Accounting Lab",
    "placementSupport": true,
    "certified": "Tally Certified / G-TEC Certified Accountant"
  },
  {
    "id": "acc-sap-fico",
    "title": "Certificate in SAP Finance and Control (S/4 HANA)",
    "categoryKey": "accounting",
    "categoryName": "Corporate Accounting & SAP",
    "subCategory": "Enterprise ERP Financial Management",
    "level": "SAP Global",
    "levelDisplay": "SAP Global Certification",
    "duration": "3 Months",
    "badge": "Accounting & SAP",
    "tools": "SAP S/4HANA ERP, SAP Fiori, SAP GUI",
    "toolsList": ["SAP S/4HANA", "SAP Fiori", "SAP GUI"],
    "tags": ["SAP FICO", "S/4 HANA", "Financial Accounting", "Controlling", "SAP ERP"],
    "description": "World-leading enterprise financial ERP training: SAP S/4HANA Financial Accounting (FI) including General Ledger, AP/AR, Asset Accounting, and Management Controlling (CO) cost center accounting.",
    "highlights": [
      "SAP Enterprise Structure configuration: Company Code, Business Area & Chart of Accounts",
      "General Ledger (FI-GL), Accounts Payable (FI-AP), Accounts Receivable (FI-AR) posting",
      "Controlling (CO): Cost Center Accounting, Internal Orders, and Profitability Analysis",
      "Modern SAP Fiori launchpad navigation and enterprise financial reporting"
    ],
    "mode": "Classroom & Dedicated SAP Server Access",
    "placementSupport": true,
    "certified": "SAP Global / G-TEC Authorized Certification"
  },
  {
    "id": "acc-sap-mm",
    "title": "Certificate in SAP Material Management (S/4 HANA)",
    "categoryKey": "accounting",
    "categoryName": "Corporate Accounting & SAP",
    "subCategory": "Procurement & Supply Chain ERP",
    "level": "SAP Global",
    "levelDisplay": "SAP Global Certification",
    "duration": "3 Months",
    "badge": "Accounting & SAP",
    "tools": "SAP S/4HANA MM, SAP Fiori Launchpad",
    "toolsList": ["SAP S/4HANA MM", "SAP Fiori"],
    "tags": ["SAP MM", "Procurement", "Inventory", "Supply Chain", "S/4 HANA"],
    "description": "Enterprise procurement and supply chain management in SAP S/4HANA: material master data, vendor management, purchasing cycles, goods receipt (MIGO), and invoice verification (MIRO).",
    "highlights": [
      "Procure-to-Pay (P2P) end-to-end lifecycle execution in SAP S/4HANA",
      "Material and vendor master data creation, valuation classes, and account determination",
      "Purchase requisitions, RFQs, purchase orders, goods receipt (MIGO), and invoice verification (MIRO)",
      "Physical inventory management, stock transfer orders, and automated reorder points"
    ],
    "mode": "Classroom & Dedicated SAP Server Access",
    "placementSupport": true,
    "certified": "SAP Global / G-TEC Authorized Certification"
  },
  {
    "id": "acc-sap-hcm",
    "title": "Certificate in SAP Human Capital Management (S/4 HANA)",
    "categoryKey": "accounting",
    "categoryName": "Corporate Accounting & SAP",
    "subCategory": "Enterprise HR & Talent Administration",
    "level": "SAP Global",
    "levelDisplay": "SAP Global Certification",
    "duration": "3 Months",
    "badge": "Accounting & SAP",
    "tools": "SAP S/4HANA HCM, SAP SuccessFactors Overview",
    "toolsList": ["SAP HCM", "SAP SuccessFactors", "SAP Fiori"],
    "tags": ["SAP HCM", "HR ERP", "Payroll", "Personnel Admin", "S/4 HANA"],
    "description": "Global enterprise human resource management with SAP S/4HANA: organizational management structures, personnel administration infotypes, time management, payroll processing, and SAP SuccessFactors overview.",
    "highlights": [
      "Organizational Management: organizational units, jobs, positions, and reporting lines",
      "Personnel Administration: hiring, transfers, terminations, and employee infotypes",
      "Time Management: work schedules, attendance tracking, leave quotas, and time evaluation",
      "Payroll simulation, deductions, payslip generation, and SuccessFactors integration overview"
    ],
    "mode": "Classroom & Dedicated SAP Server Access",
    "placementSupport": true,
    "certified": "SAP Global / G-TEC Authorized Certification"
  },
  {
    "id": "acc-sap-abap",
    "title": "Certificate in SAP ABAP (S/4 HANA)",
    "categoryKey": "accounting",
    "categoryName": "Corporate Accounting & SAP",
    "subCategory": "SAP Enterprise Programming & CDS Views",
    "level": "SAP Global",
    "levelDisplay": "SAP Global Certification",
    "duration": "3 Months",
    "badge": "Accounting & SAP",
    "tools": "SAP ABAP Workbench, Eclipse ADT, SAP GUI",
    "toolsList": ["SAP ABAP Workbench", "Eclipse ADT", "SAP GUI"],
    "tags": ["SAP ABAP", "ABAP on HANA", "CDS Views", "Eclipse ADT", "ERP Dev"],
    "description": "Technical programming for SAP enterprise systems: ABAP fundamentals, Data Dictionary (DDIC), internal tables, Open SQL, Smart Forms, Eclipse ADT, Core Data Services (CDS Views), and ABAP RESTful programming.",
    "highlights": [
      "ABAP Syntax, Data Dictionary (DDIC) tables, views, search helps, and lock objects",
      "Interactive ALV reports, selection screens, module pool programming, and user exits",
      "Modern development using ABAP Development Tools (ADT) in Eclipse",
      "ABAP for SAP S/4HANA: Core Data Services (CDS) views and OData service exposure"
    ],
    "mode": "Classroom & Dedicated SAP Server Access",
    "placementSupport": true,
    "certified": "SAP Global / G-TEC Authorized Certification"
  }
];

// Provide global access
if (typeof window !== 'undefined') {
  window.GTEC_CATEGORIES = GTEC_CATEGORIES;
  window.GTEC_COURSES = GTEC_COURSES;
}
