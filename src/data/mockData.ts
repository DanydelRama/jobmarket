
export interface JobSeeker {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto: string;
  professionalSummary: string;
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  hobbies: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  notes: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface Skill {
  id: string;
  name: string;
  rating: number;
  yearsOfExperience: number;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Advanced' | 'Native';
}

export interface Certification {
  id: string;
  title: string;
  issuingOrg: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  link: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  description: string;
  requirements: string[];
  skillTags: string[];
  companyLogo: string;
  postedDate: string;
  ageLimit?: { min: number; max: number };
  customQuestions: string[];
}

export interface Application {
  id: string;
  jobId: string;
  applicantId: string;
  motivationLetter: string;
  answers: { question: string; answer: string }[];
  status: 'pending' | 'accepted' | 'rejected';
  appliedDate: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  jobId: string;
  applicantId: string;
  recruiterId: string;
  dateTime: string;
  location: string;
  format: 'online' | 'in-person';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  confirmationMessage: string;
}

// Available skills for the platform
export const AVAILABLE_SKILLS = [
  'SEO', 'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Angular', 'Node.js',
  'Python', 'Java', 'PHP', 'Designer', 'UI/UX', 'Graphic Design', 'Photoshop',
  'Illustrator', 'Marketing', 'Digital Marketing', 'Social Media', 'Content Writing',
  'Financer', 'Accounting', 'Financial Analysis', 'Budget Management', 'Agriculture',
  'Agronomy', 'Farming', 'Livestock', 'Project Management', 'Teamwork', 
  'Communication', 'Leadership', 'Problem Solving', 'Time Management', 'French',
  'English', 'Arabic', 'Amazigh', 'Spanish', 'German', 'Management', 'Sales',
  'Customer Service', 'Data Analysis', 'Excel', 'PowerPoint', 'Presentation'
];

// Mock Job Seekers Data
export const mockJobSeekers: JobSeeker[] = [
  {
    id: '1',
    fullName: 'Youssef El Mansouri',
    email: 'youssef.elmansouri@email.com',
    phone: '+212 6 12 34 56 78',
    location: 'Casablanca',
    profilePhoto: '/placeholder.svg',
    professionalSummary: 'Experienced web developer with 5+ years in full-stack development. Passionate about creating scalable web applications using modern technologies.',
    education: [
      {
        id: '1',
        degree: 'Master in Computer Science',
        school: 'Université Hassan II',
        startDate: '2018',
        endDate: '2020',
        notes: 'Specialized in Software Engineering'
      }
    ],
    workExperience: [
      {
        id: '1',
        jobTitle: 'Senior Web Developer',
        company: 'TechMorocco Solutions',
        startDate: '2020',
        endDate: 'Present',
        responsibilities: 'Lead development team, architect scalable solutions, mentor junior developers'
      }
    ],
    skills: [
      { id: '1', name: 'JavaScript', rating: 5, yearsOfExperience: 5 },
      { id: '2', name: 'React', rating: 5, yearsOfExperience: 4 },
      { id: '3', name: 'Node.js', rating: 4, yearsOfExperience: 3 },
      { id: '4', name: 'Python', rating: 4, yearsOfExperience: 2 }
    ],
    languages: [
      { id: '1', name: 'Arabic', proficiency: 'Native' },
      { id: '2', name: 'French', proficiency: 'Advanced' },
      { id: '3', name: 'English', proficiency: 'Advanced' }
    ],
    certifications: [
      { id: '1', title: 'AWS Certified Developer', issuingOrg: 'Amazon', date: '2023' }
    ],
    projects: [
      { id: '1', name: 'E-commerce Platform', link: 'https://example.com', description: 'Full-stack e-commerce solution' }
    ],
    hobbies: ['Photography', 'Hiking', 'Reading']
  },
  {
    id: '2',
    fullName: 'Kenza Bouzidi',
    email: 'kenza.bouzidi@email.com',
    phone: '+212 6 87 65 43 21',
    location: 'Rabat',
    profilePhoto: '/placeholder.svg',
    professionalSummary: 'Creative digital marketing specialist with expertise in social media strategy and content creation. Proven track record of increasing brand engagement.',
    education: [
      {
        id: '1',
        degree: 'Bachelor in Marketing',
        school: 'Université Mohammed V',
        startDate: '2017',
        endDate: '2020',
        notes: 'Focus on Digital Marketing'
      }
    ],
    workExperience: [
      {
        id: '1',
        jobTitle: 'Digital Marketing Manager',
        company: 'Maroc Digital Agency',
        startDate: '2021',
        endDate: 'Present',
        responsibilities: 'Develop marketing strategies, manage social media campaigns, analyze performance metrics'
      }
    ],
    skills: [
      { id: '1', name: 'Digital Marketing', rating: 5, yearsOfExperience: 4 },
      { id: '2', name: 'Social Media', rating: 5, yearsOfExperience: 4 },
      { id: '3', name: 'SEO', rating: 4, yearsOfExperience: 3 },
      { id: '4', name: 'Content Writing', rating: 4, yearsOfExperience: 3 }
    ],
    languages: [
      { id: '1', name: 'Arabic', proficiency: 'Native' },
      { id: '2', name: 'French', proficiency: 'Native' },
      { id: '3', name: 'English', proficiency: 'Advanced' }
    ],
    certifications: [
      { id: '1', title: 'Google Analytics Certified', issuingOrg: 'Google', date: '2023' }
    ],
    projects: [
      { id: '1', name: 'Brand Campaign 2023', link: 'https://example.com', description: 'Successful social media campaign that increased engagement by 150%' }
    ],
    hobbies: ['Travel', 'Photography', 'Cooking']
  },
  {
    id: '3',
    fullName: 'Ahmed Tazi',
    email: 'ahmed.tazi@email.com',
    phone: '+212 6 55 44 33 22',
    location: 'Marrakech',
    profilePhoto: '/placeholder.svg',
    professionalSummary: 'Financial analyst with strong analytical skills and 6+ years of experience in investment banking and corporate finance.',
    education: [
      {
        id: '1',
        degree: 'Master in Finance',
        school: 'Al Akhawayn University',
        startDate: '2016',
        endDate: '2018',
        notes: 'Summa Cum Laude'
      }
    ],
    workExperience: [
      {
        id: '1',
        jobTitle: 'Senior Financial Analyst',
        company: 'Casablanca Finance Group',
        startDate: '2018',
        endDate: 'Present',
        responsibilities: 'Financial modeling, risk assessment, investment analysis, client presentations'
      }
    ],
    skills: [
      { id: '1', name: 'Financial Analysis', rating: 5, yearsOfExperience: 6 },
      { id: '2', name: 'Excel', rating: 5, yearsOfExperience: 6 },
      { id: '3', name: 'Data Analysis', rating: 4, yearsOfExperience: 4 },
      { id: '4', name: 'Presentation', rating: 4, yearsOfExperience: 5 }
    ],
    languages: [
      { id: '1', name: 'Arabic', proficiency: 'Native' },
      { id: '2', name: 'French', proficiency: 'Advanced' },
      { id: '3', name: 'English', proficiency: 'Advanced' }
    ],
    certifications: [
      { id: '1', title: 'CFA Level II', issuingOrg: 'CFA Institute', date: '2022' }
    ],
    projects: [],
    hobbies: ['Tennis', 'Reading', 'Traveling']
  }
];

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechMorocco Solutions',
    industry: 'Technology',
    location: 'Casablanca',
    description: 'We are looking for an experienced full-stack developer to join our growing team. You will work on cutting-edge web applications using modern technologies.',
    requirements: [
      '5+ years of experience in web development',
      'Strong knowledge of JavaScript, React, and Node.js',
      'Experience with databases and cloud platforms',
      'Excellent problem-solving skills'
    ],
    skillTags: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
    companyLogo: '/placeholder.svg',
    postedDate: '2024-01-15',
    customQuestions: [
      'Describe your experience with React and modern JavaScript frameworks.',
      'How do you approach debugging complex technical issues?'
    ]
  },
  {
    id: '2',
    title: 'Digital Marketing Manager',
    company: 'Maroc Digital Agency',
    industry: 'Marketing',
    location: 'Rabat',
    description: 'Join our dynamic marketing team to lead digital campaigns and drive brand growth across multiple channels.',
    requirements: [
      '3+ years of digital marketing experience',
      'Expertise in social media marketing and SEO',
      'Strong analytical and communication skills',
      'Experience with marketing automation tools'
    ],
    skillTags: ['Digital Marketing', 'SEO', 'Social Media', 'Google Analytics', 'Content Writing'],
    companyLogo: '/placeholder.svg',
    postedDate: '2024-01-10',
    ageLimit: { min: 25, max: 40 },
    customQuestions: [
      'What marketing campaigns are you most proud of?',
      'How do you measure the success of a digital marketing campaign?'
    ]
  },
  {
    id: '3',
    title: 'Financial Analyst',
    company: 'Casablanca Finance Group',
    industry: 'Finance',
    location: 'Casablanca',
    description: 'We seek a detail-oriented financial analyst to support our investment decisions and provide insights to senior management.',
    requirements: [
      'Bachelor\'s degree in Finance or related field',
      'Strong analytical and Excel skills',
      'Knowledge of financial modeling',
      'CFA certification preferred'
    ],
    skillTags: ['Financial Analysis', 'Excel', 'Financial Modeling', 'Data Analysis', 'Presentation'],
    companyLogo: '/placeholder.svg',
    postedDate: '2024-01-12',
    customQuestions: [
      'Describe your experience with financial modeling.',
      'How do you stay updated with market trends?'
    ]
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    company: 'Creative Studio Maroc',
    industry: 'Design',
    location: 'Casablanca',
    description: 'Looking for a talented designer to create exceptional user experiences for web and mobile applications.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Adobe Creative Suite',
      'Strong portfolio demonstrating design thinking',
      'Understanding of front-end technologies'
    ],
    skillTags: ['UI/UX', 'Figma', 'Photoshop', 'Illustrator', 'User Research'],
    companyLogo: '/placeholder.svg',
    postedDate: '2024-01-08',
    customQuestions: [
      'Walk us through your design process.',
      'How do you handle feedback and iterate on designs?'
    ]
  },
  {
    id: '5',
    title: 'Agricultural Engineer',
    company: 'AgriTech Morocco',
    industry: 'Agriculture',
    location: 'Meknes',
    description: 'Join our mission to modernize Moroccan agriculture through innovative farming techniques and sustainable practices.',
    requirements: [
      'Degree in Agricultural Engineering',
      'Knowledge of modern farming techniques',
      'Experience with agricultural technology',
      'Strong communication skills in Arabic and French'
    ],
    skillTags: ['Agriculture', 'Agronomy', 'Project Management', 'Sustainability', 'Research'],
    companyLogo: '/placeholder.svg',
    postedDate: '2024-01-05',
    customQuestions: [
      'What innovations in agriculture excite you most?',
      'How would you help farmers adopt new technologies?'
    ]
  }
];

// Additional mock data can be generated programmatically
export const generateMockJobSeekers = (count: number): JobSeeker[] => {
  const morrocanNames = [
    'Aicha Benali', 'Omar Idrissi', 'Fatima Alaoui', 'Khalid Berrada', 'Zineb Fassi',
    'Mohamed Chraibi', 'Salma Benkirane', 'Anas Benjelloun', 'Nadia Senhaji', 'Rachid Alami',
    'Leila Tazi', 'Yassine Bouchikhi', 'Meriem Ouali', 'Abdellatif Benabdellah', 'Houda Amrani'
  ];
  
  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 'Agadir', 'Meknes', 'Oujda'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `gen-${index + 1}`,
    fullName: morrocanNames[index % morrocanNames.length],
    email: `${morrocanNames[index % morrocanNames.length].toLowerCase().replace(' ', '.')}@email.com`,
    phone: `+212 6 ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10} ${Math.floor(Math.random() * 90) + 10}`,
    location: cities[Math.floor(Math.random() * cities.length)],
    profilePhoto: '/placeholder.svg',
    professionalSummary: 'Dedicated professional with experience in various domains, seeking new opportunities to contribute and grow.',
    education: [{
      id: '1',
      degree: 'Bachelor\'s Degree',
      school: 'Moroccan University',
      startDate: '2018',
      endDate: '2022',
      notes: 'Graduated with honors'
    }],
    workExperience: [{
      id: '1',
      jobTitle: 'Professional',
      company: 'Previous Company',
      startDate: '2022',
      endDate: 'Present',
      responsibilities: 'Various professional responsibilities and achievements'
    }],
    skills: AVAILABLE_SKILLS.slice(0, 5).map((skill, skillIndex) => ({
      id: `skill-${skillIndex}`,
      name: skill,
      rating: Math.floor(Math.random() * 3) + 3,
      yearsOfExperience: Math.floor(Math.random() * 5) + 1
    })),
    languages: [
      { id: '1', name: 'Arabic', proficiency: 'Native' as const },
      { id: '2', name: 'French', proficiency: 'Advanced' as const },
      { id: '3', name: 'English', proficiency: 'Intermediate' as const }
    ],
    certifications: [],
    projects: [],
    hobbies: ['Sports', 'Reading', 'Music']
  }));
};

export const generateMockJobs = (count: number): Job[] => {
  const companies = [
    'Atlas Technologies', 'Marrakech Innovations', 'Rabat Solutions', 'Casablanca Enterprises',
    'Fes Digital', 'Tangier Industries', 'Agadir Systems', 'Meknes Corp'
  ];
  
  const industries = ['Technology', 'Finance', 'Marketing', 'Healthcare', 'Education', 'Agriculture', 'Tourism', 'Manufacturing'];
  const cities = ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier', 'Agadir', 'Meknes', 'Oujda'];
  
  return Array.from({ length: count }, (_, index) => ({
    id: `job-gen-${index + 1}`,
    title: `Position ${index + 1}`,
    company: companies[index % companies.length],
    industry: industries[index % industries.length],
    location: cities[Math.floor(Math.random() * cities.length)],
    description: `Exciting opportunity to join our growing team and make a meaningful impact in the ${industries[index % industries.length].toLowerCase()} sector.`,
    requirements: [
      'Relevant degree or experience',
      'Strong communication skills',
      'Team player with leadership potential',
      'Proficiency in required tools and technologies'
    ],
    skillTags: AVAILABLE_SKILLS.slice(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10) + 5),
    companyLogo: '/placeholder.svg',
    postedDate: `2024-01-${String(Math.floor(Math.random() * 30) + 1).padStart(2, '0')}`,
    customQuestions: [
      'Why are you interested in this position?',
      'What unique value can you bring to our team?'
    ]
  }));
};
