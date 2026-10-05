export type Experience = { id: string; title: string; date: string; type: string; current?: boolean; team?: string; location?: string; band?: string; showBand?: boolean; bullets: string[]; tags: string[] }
export const experiences: Experience[] = [
  { id: 'technology-analyst-c10', title: 'Technology Analyst', date: 'Aug 2025 – Present', type: 'Full-time', current: true, team: 'US Personal Banking Datalake', band: 'C10', showBand: true, bullets: ['Build end-to-end ETL/ELT pipelines across HDFS, AWS S3, and Snowflake for downstream analytics and reporting', 'Work with enterprise-scale Big Data platforms supporting banking data use cases', 'Build Snowflake ingestion pipelines in the cloud data lake and work with Databricks', 'Support migration of data lake infrastructure from one AWS region to another', 'Contribute to migration of Snowflake between editions and cloud infrastructure for Iceberg pipelines', 'Automate production pipeline monitoring, data processing, and data quality validation to support reliability, accuracy, and regulatory compliance', 'Handle infrastructure-related high-priority production incidents on a regular basis'], tags: ['Big Data', 'AWS', 'Snowflake', 'Databricks', 'Iceberg', 'Datalake'] },
  { id: 'technology-analyst-c09', title: 'Technology Analyst', date: 'Jul 2024 – Jul 2025', type: 'Full-time', team: 'KYC Database Team', location: 'Chennai, Tamil Nadu, India', band: 'C09', showBand: true, bullets: ['Designed, developed and optimised Python-based ETL pipelines for data extraction, transformation and processing, improving efficiency and reliability', 'Contributed to the migration of ETL workflows from Talend to Python, translating existing transformation logic into Python pipelines for better flexibility, maintainability and integration', 'Worked extensively on data transfer from Oracle to Hive: extraction, transformation and migration, ensuring accuracy, consistency and reliability across source and target systems', 'Developed and maintained a Node.js full-stack web application that streamlined static data patching and database maintenance, enabling efficient data updates and reducing operational effort and cost', 'Owned the application end-to-end as Application Coordinator: feature enhancements, production maintenance, troubleshooting and stakeholder coordination', 'Dockerized and deployed the application on OpenShift for a scalable, portable deployment', 'Applied Python, SQL, ETL, data transformation and data-processing concepts to large-scale data workflows'], tags: ['Python', 'SQL', 'ETL', 'Node.js', 'Angular', 'Docker', 'OpenShift', 'Talend', 'Oracle', 'Hive'] },
  { id: 'summer-analyst', title: 'Summer Analyst (Internship) · Citi India', date: 'May 2023 – Jul 2023 (3 mos)', type: 'Internship', team: 'KYC ETL Team', location: 'Chennai, Tamil Nadu, India', bullets: ['Developed ETL-based reporting solutions for accurate data extraction, transformation and loading for business insights', 'Performed feed validation and data quality checks across multiple systems to ensure consistency, reliability and compliance with reporting standards'], tags: ['ETL', 'Shell Scripting', 'Big Data'] },
]
export const skillGroups = [
  { category: 'Data Engineering', core: ['Big Data', 'Apache Spark', 'ETL / ELT Pipelines', 'Datalake', 'Snowflake', 'Databricks'], more: ['Apache Iceberg', 'Hive', 'Talend'] },
  { category: 'Cloud & DevOps', core: ['AWS', 'Amazon EKS', 'Kubernetes', 'OpenShift', 'Docker'], more: ['Autosys'] },
  { category: 'Programming & Databases', core: ['Python', 'SQL', 'Shell Scripting'], more: ['Node.js', 'Angular', '.NET', 'Oracle', 'Microsoft SQL Server'] },
  { category: 'Foundations & Learning', core: ['Data Structures & Algorithms', 'Generative AI'], more: [] },
]
export const projects = [
  { title: 'Enhancing Image Generation Using Autoencoders and Transformer-Based Generation', publication: 'IEEE · Aug 2024', url: 'https://xploreqa.ieee.org/document/10739002', authors: '', summary: 'Combines a Vector Quantized Variational Autoencoder (VQ-VAE) encoder with a GPT decoder to generate images from discrete visual latent codes, addressing the challenge of using text-focused GPT models for image synthesis. Reported Fréchet Inception Distance (FID) scores are 23.35 on MNIST, 28.6 on CIFAR-10, and 21.45 on Fashion-MNIST.' },
  { title: 'Comprehensive Dataset for Urban Streetlight Analysis', publication: 'arXiv · 2024', url: 'https://arxiv.org/abs/2407.01117v1', authors: 'Eliza Femi Sherley S, Sanjay T, Shri Kaanth P, Jeffrey Samuel S', summary: 'A labelled collection of more than 800 high-resolution streetlight images, primarily from the Chennai region, organized to support training and evaluation of computer-vision models that classify streetlights as functional or not.' },
]

export const educationCourses = [
  ['IT5352', 'Programming and Data Structures'],
  ['IT5401', 'Object-Oriented Programming and Advanced Data Structures'],
  ['IT5402', 'Design and Analysis of Algorithms'],
  ['MA5302', 'Discrete Mathematics'],
  ['IT5351', 'Database Management Systems'],
  ['IT5403', 'Operating Systems'],
  ['IT5451', 'Computer Architecture'],
  ['IT5602', 'Data Science and Analytics'],
  ['IT5603', 'Distributed and Cloud Computing'],
  ['IT5701', 'Artificial Intelligence'],
]

export const clubs = [
  { name: 'AUSEC MIT', theme: 'Entrepreneurship', designation: 'Finance Lead', description: 'An entrepreneurship community for exploring ideas, collaboration, and student-led initiatives.', highlights: [], photos: [{ src: '/images/ausec-1.webp', alt: 'Sanjay speaking at a lectern during an AUSEC event', fit: 'cover' }, { src: '/images/ausec-2.webp', alt: 'AUSEC logo', fit: 'contain' }, { src: '/images/ausec-3.webp', alt: 'AUSEC student group gathered at an event', fit: 'cover' }, { src: '/images/ausec-4.webp', alt: 'AUSEC Futurize Fiesta 24 event poster', fit: 'cover' }] },
  { name: 'Variety Team', theme: 'College theatrical club', designation: 'Secretary', description: 'A creative community centered on theatre, performance, and collaborative storytelling.', highlights: [], photos: [{ src: '/images/variety-1.webp', alt: 'Variety Team performer holding a College Start sign on stage', fit: 'cover' }, { src: '/images/variety-2.webp', alt: 'Variety Team stage performance', fit: 'cover' }, { src: '/images/variety-3.webp', alt: 'Participants holding certificates at a Variety Team event', fit: 'cover' }, { src: '/images/variety-4.webp', alt: 'Silhouette performer in front of a projected stage scene', fit: 'cover' }] },
  { name: 'ITA', theme: 'Information Technology Association', designation: 'Event Organizer', description: 'A student community connected with Information Technology, peer learning, and campus activities.', highlights: ['Organized the Samhita ’24 Hackathon for 100 participants', 'Conducted symposiums and mock interview sessions'], photos: [{ src: '/images/ita-1.webp', alt: 'Information Technology Association emblem', fit: 'contain' }] },
]

export const saclExperience: Experience = {
  id: 'sacl-internship',
  title: 'Internship · SACL',
  date: 'Nov 2022 – Dec 2022',
  type: 'Internship',
  bullets: ['Built an internal HR application for certificate generation and reporting', 'Implemented the web interface and application logic for HR certificate workflows', 'Connected the application to SQL Server and Google SMTP for data and email delivery', 'Generated certificate and report PDFs using iText'],
  tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Font Awesome', 'DataTables', 'C#', '.NET Framework', 'ASP.NET', 'Microsoft SQL Server', 'Google SMTP · 587', 'iText'],
}

export const techGroups = [
  { category: 'Languages', items: [['Python', 'siPython'], ['Java', 'siOpenjdk'], ['C/C++', 'siCplusplus'], ['JavaScript', 'siJavascript'], ['C#', ''], ['Bash', 'siGnubash']] },
  { category: 'Web Development', items: [['Flask', 'siFlask'], ['React', 'siReact'], ['Node.js', 'siNodedotjs'], ['Vue.js', 'siVuedotjs'], ['Next.js', 'siNextdotjs'], ['TypeScript', 'siTypescript'], ['FastAPI', 'siFastapi'], ['HTML5', 'siHtml5'], ['CSS3', 'siCss3'], ['Bootstrap', 'siBootstrap']] },
  { category: 'Database', items: [['MySQL', 'siMysql'], ['PostgreSQL', 'siPostgresql'], ['SQLite', 'siSqlite'], ['Oracle SQL', 'siOracle'], ['MongoDB', 'siMongodb']] },
  { category: 'AI & Machine Learning', items: [['LangChain', 'siLangchain'], ['MCP', ''], ['RAG', ''], ['LangGraph', ''], ['TensorFlow', 'siTensorflow'], ['Keras', 'siKeras'], ['PyTorch', 'siPytorch'], ['Tableau', 'siTableau'], ['Scikit-Learn', 'siScikitlearn']] },
  { category: 'Tools & Platforms', items: [['AWS', 'siAmazonaws'], ['Azure', ''], ['GCP', 'siGooglecloud'], ['Jenkins', 'siJenkins'], ['Harness', ''], ['Tekton', 'siTekton'], ['Git', 'siGit'], ['Docker', 'siDocker'], ['Kubernetes', 'siKubernetes'], ['OpenShift', ''], ['Amazon EKS', ''], ['Snowflake', 'siSnowflake'], ['Databricks', 'siDatabricks']] },
]

export const foundations = ['Data Structures & Algorithms', 'OOPS', 'DBMS', 'Operating Systems', 'Cloud Computing', 'Big Data Processing', 'AI Concepts', 'APIs', 'Data Quality', 'Data Validation', 'Data Governance']

export const personalProjects: { title: string; summary: string; details: string[]; tags: string[] }[] = [
  { title: 'Student Grievance Cell', summary: 'Developed as a socially relevant project from February to June 2023, this grievance platform lets students submit issues anonymously or by name, track their status, and communicate with authorized staff. Sentiment analysis helps assess urgency, with role-based access for students, staff, and administrators.', details: ['Anonymous grievance submission', 'Categorized grievances assigned to staff', 'Status tracking and staff-student communication'], tags: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Mongoose', 'REST APIs', 'JWT', 'Axios', 'Google reCAPTCHA', 'Hugging Face API', 'Nodemailer'] },
  { title: 'Simplified Attendance Mobile App', summary: 'An Android app that helps teachers create classes, manage student lists, record attendance, and generate attendance reports, with RealmDB for local data storage.', details: ['Create classes with a class name, subject, and theme', 'Manage student lists', 'Record attendance and generate class reports'], tags: ['Java', 'Android Studio', 'RealmDB'] },
  { title: 'Department Inventory Tracker', summary: 'Built a web application for the MIT IT Department to manage system information and inventory records.', details: ['Generate system reports in Excel', 'Upload bills and invoices to the database', 'Track and update asset specifications and locations'], tags: ['HTML', 'CSS', 'PHP', 'MySQL'] },
  { title: 'Stock Prediction using LSTM', summary: 'A Streamlit-based machine-learning application for stock-price forecasting with LSTM neural networks.', details: ['Historical market-data retrieval', 'Data normalization and time-series preparation', 'LSTM model training and multi-step forecasting', 'Streamlit interface'], tags: ['Python', 'Streamlit', 'LSTM'] },
  { title: 'Computer Vision & Dataset Processing', summary: 'Computer-vision workflows for preparing image datasets for machine-learning models.', details: ['YOLO-based detection', 'Image cropping, resizing and preprocessing', 'Dataset preparation'], tags: ['YOLO', 'Computer vision', 'Image processing', 'Dataset preparation'] },
  { title: 'Machine Learning & Data Analysis', summary: 'Exploratory Python work applying statistical and machine-learning methods to structured data.', details: ['Naive Bayes classification', 'Feature-based prediction', 'Data preprocessing and exploratory programming'], tags: ['Python', 'Naive Bayes', 'Feature-based prediction', 'Data preprocessing'] },
]

export const educationHighlights = ['President of Finance, Entrepreneurship Club', 'Merit-based Scholar · TEMENOS', 'Winner of coding competitions and hackathons']
export const campusActivities = [{ name: 'NCC', theme: 'High school · 2016–2018', description: 'During high school, I participated in NCC and led the team in parade and marchpast.', photos: [{ src: '/images/ncc-school.webp', alt: 'National Cadet Corps emblem', fit: 'contain' }] }]