export const EDIT = 'EDIT'
export const NEW = 'NEW'
export const VIEW = 'VIEW'
export const CLOSE = 'CLOSE'
export const DELETE = 'DELETE'
export const SAVE = 'SAVE'
export const CHECK = 'CHECK'
export const COLOR = {
  BACKGROUND: '#F8F8F8',
  WHITE: '#FFFFFF',
  GRAY: '#EDEDED',
  PRIMARY: '#2D2937',
  PRIMARY_DARK: '#1b1821',
  TEXT: '#5A5A5A',
  BLACK: '#000000',
  DARK_COPY: '#A198A6',
  RED: '#EB5757',
  GREEN: '#50C878',
  DARK_GRAY: '#606060',
  TRANSPARENT: 'Transparent',
  BODY_TEXT: '#5A5A5A',
  BLUE: '#4285F4',
  UNSELECTED_GRAY: '#BDBAC3',
  MIDNIGHT_PURPLE_DEEP: '#2C2543',
  MIDNIGHT_PURPLE: '#433860',
  MIDNIGHT_PURPLE_LIGHT: '#8E7EB4',
  LIGHT_GRAY: '#F0EEF2',
  LIGHT_PURPLE: '#E2D6FF',
  NW_TEAL: '#20FFAF',
  TEAL: '#00A399',
  INACTIVE_DARK_GRAY: '#8C898F',
  BRIGHT_RED: '#F83D3D',
  GREY_500: '#BDBAC3',
  GREY_200: '#F0EEf2',
  EVAL_GREY: '#EEEEEE',
}
export const BUTTON_COLOR = {
  PRIMARY: 'linear-gradient(92.58deg, #0DEFE1 0%, #78FF96 100%)',
  SECONDARY: '#FFFFFF',
  OUTLINE: 'Transparent',
  DESTRUCTIVE: '#F65C5C',
  HOVER_PRIMARY: 'linear-gradient(90deg, #D7FFF0 0%, #7BFFCF 100%)',
}
export const TAG_COLOR = {
  TEAL: '#00BCBC',
  BLUE: '#2F80ED',
  PURPLE: '#812F9D',
  GREEN: '#00B775',
  RED: '#F83D3D',
  ORANGE: '#FFA644',
  YELLOW: '#FFF463',
}
export const TAGS = [
  {
    text: 'seattle bus',
    color: TAG_COLOR.TEAL,
  },
  {
    text: "rsvp'd",
    color: TAG_COLOR.BLUE,
  },
  {
    text: 'travel reimbursement',
    color: TAG_COLOR.PURPLE,
  },
]
export const FAQ = 'FAQ'
export const FAQCategory = Object.freeze({
  GENERAL: 'General',
  LOGS: 'Logistics',
  TEAMS: 'Teams & Projects',
  MISC: 'Miscellaneous',
})
export const SPONSORSHIP = 'SPONSORSHIP'
export const HACKATHON_NAVBAR = {
  intro: 'Intro',
  events: 'Edit Events',
  spocos: 'Edit Sponsors',
  rewards: 'Edit Rewards',
  FeatureFlags: 'Feature Flags',
  BuildConfig: 'Build Config',
  HackerInfo: 'Firebase Queries',
}
export const LIVESITE_NAVBAR = {
  announcements: 'Announcements',
  quicklinks: 'Quicklinks',
  schedule: 'Schedule',
  settings: 'Settings',
  judging: 'Judging',
}
export const HACKER_APP_NAVBAR = {
  welcome: 'Welcome',
  basicinfo: 'Basic Info',
  skills: 'Skills',
  questionnaire: 'Questionnaire',
}

export const ASSESSMENT_COLOR = {
  PRIMARY: '#2D2937',
  PRIMARY_DARK: '#1b1821',
  TEXT: '#5A5A5A',
  BLACK: '#000000',
  DARK_COPY: '#A198A6',
  RED: '#EB5757',
  GREEN: '#50C878',
  BLUE: '#4285F4',
  YELLOW: '#FFD700',
  DARK_GRAY: '#4F4F4F',
  INPUT_GRAY: '#F4F4F4',
  TRANSPARENT: 'Transparent',
  BODY_TEXT: '#5A5A5A',
  LIGHT_GRAY: '#828282',
  UNSCORED_GRAY: '#E0E0E0',
  LIGHT_BLUE: '#F0EEF2',
  TOOLBAR_GRAY: '#FAFAFA',
  BLUE_BORDER: '#21258A',
}

// Assessment portal
export const APPLICATION_STATUS = {
  applied: {
    color: ASSESSMENT_COLOR.RED,
    textColor: 'white',
    text: 'applied',
  },
  waitlisted: {
    color: ASSESSMENT_COLOR.RED,
    textColor: 'white',
    text: 'waitlisted',
    displayText: 'Waitlisted',
  },
  rejected: {
    color: ASSESSMENT_COLOR.YELLOW,
    textColor: 'white',
    text: 'rejected',
    displayText: 'Rejected',
  },
  scored: {
    color: ASSESSMENT_COLOR.BLUE,
    textColor: 'white',
    text: 'scored',
    displayText: 'Graded',
  },
  accepted: {
    color: ASSESSMENT_COLOR.GREEN,
    textColor: 'white',
    text: 'acceptedNoResponseYet',
    displayText: 'Accepted',
  },
  acceptedAndAttending: {
    color: ASSESSMENT_COLOR.GREEN,
    textColor: 'white',
    text: 'acceptedAndAttending',
    displayText: 'RSVPed',
  },
  acceptedUnRSVP: {
    color: ASSESSMENT_COLOR.GREEN,
    textColor: 'white',
    text: 'acceptedUnRSVP',
    displayText: 'UnRSVPed',
  },
  completed: {
    color: COLOR.MIDNIGHT_PURPLE,
    textColor: 'white',
    text: 'completed',
  },
}

export const NUM_SCORES = 4

export const SCORING = {
  RESUME: {
    label: 'Resume',
    value: 6,
    weight: 1,
  },
  ESSAY1: {
    label: 'Long Answer 1',
    value: 4,
    weight: 1,
  },
  ESSAY2: {
    label: 'Long Answer 2',
    value: 6,
    weight: 1,
  },
  ESSAY3: {
    label: 'Long Answer 3',
    value: 1,
    weight: 1,
  },
}

export const BONUS_SCORING = {
  FIRST_TIME_HACKER: {
    label: 'First time hacker',
    value: 1,
    weight: 0.5,
  },
}

export const MAX_SCORE = Object.values(SCORING).reduce((acc, curr) => acc + curr.value * curr.weight, 0)
// export const MAX_SCORE = 15 // hardcoded for cmd-f 2024

export const SORT = {
  TIMESTAMP: 'Timestamp',
  LAST_NAME: 'Last Name',
  FIRST_NAME: 'First Name',
  SCORE: 'Total Score',
  STATUS: 'Status',
}

export const TABS = {
  OVERVIEW: 'Overview',
  RESUME: 'Resume',
  COMMENTS: 'Comments',
}

export const RUBRIC = {
  PM: [
    {
      score: '+1',
      label: 'For any project/experience involving leadership',
    },
    {
      score: '+1',
      label: 'If one or more of any work experience',
    },
    {
      score: '+1',
      label: 'If any of the work experiences are tech-related (work or internship)',
    },
    {
      score: '+1',
      label: 'At least one extracurricular activity',
    },
    {
      score: '+1',
      label: 'Easy to read, clean, well made (something you would do to apply to a job)',
    },
  ],
  DEV: [
    {
      score: '+1',
      label: 'At least 1 tech-related project',
    },
    {
      score: '+1',
      label: 'If one or more of any work experience',
    },
    {
      score: '+1',
      label: 'If any of the work experiences are tech-related (work or internship)',
    },
    {
      score: '+1',
      label: 'At least one tech-related extracurricular activity',
    },
    {
      score: '+1',
      label: 'Easy to read, clean, well made (something you would do to apply to a job)',
    },
  ],
  DESIGN: [
    {
      score: '+1',
      label: 'For a design project linked to tech (examples: website design, app design) (not examples: sculpture)',
    },
    {
      score: '+1',
      label: 'If one or more of any work experience',
    },
    {
      score: '+1',
      label: 'if any of the work experiences are tech-related (work or internship)',
    },
    {
      score: '+1',
      label: 'At least one tech-related extracurricular activity',
    },
    {
      score: '+1',
      label: 'Easy to read, clean, well made (something you would do to apply to a job)',
    },
  ],
  GENERAL: [
    {
      score: '+1',
      label: 'Because they are a beginner',
    },
    {
      score: '+1',
      label: 'At least 1 small project/experience',
    },
    {
      score: '+1',
      label: 'For each extracurricular activity (1 point each, max 2 points)',
    },
    {
      score: '+1',
      label: 'Easy to read, clean, well made (something you would do to apply to a job)',
    },
  ],
  LONG_ANSWER: [
    {
      score: '+4',
      label: 'Above and beyond | Damn this is some quality writing | You think we need to accept this applicant',
    },
    {
      score: '+3',
      label:
        'One meaningful and realistic statement | Connect with impact to self or society (the why behind it) | Explanation to personal connection or passion (the how)',
    },
    {
      score: '+2',
      label: 'One meaningful and realistic statement | Connect with impact to self or society (the why behind it)',
    },
    {
      score: '+1',
      label: 'One Meaningful and realistic statement',
    },
    {
      score: '+0',
      label: 'No effort | Very low word count',
    },
    {
      score: '-1',
      label: 'Spelling and grammar mistakes makes it hard to read or understand the text',
    },
  ],
}

export const HACKATHONS = ['HackCamp2024', 'nwHacks2025', 'cmd-f2025']

export const QUESTION_TYPES = Object.freeze({
  MCQ: 'Multiple Choice',
  DROPDOWN: 'Dropdown',
  SELECTALL: 'Select All',
  SHORTANS: 'Short Answer',
  LONGANS: 'Long Answer',
  SCHOOL: 'School',
  COUNTRY: 'Country',
  MAJOR: 'Major',
  PORTFOLIO: 'Portfolio',
  LEGALNAME: 'Full Legal Name',
})

export const BASIC_INFO_FORM_INPUT_FIELDS = [
  'academicYear',
  'ageByHackathon',
  'canadianStatus',
  'culturalBackground',
  'dietaryRestriction',
  'disability',
  'educationLevel',
  'email',
  'gender',
  'graduation',
  'haveTransExperience',
  'identifyAsUnderrepresented',
  'indigenousIdentification',
  'phoneNumber',
  'preferredName',
  'pronouns',
  'race',
  'jobPosition',
]

export const SKILLS_FORM_INPUT_FIELDS = [
  'numHackathonsAttended',
  'contributionRole',
  'longAnswers1',
  'longAnswers2',
  'longAnswers3',
  'longAnswers4',
  // 'longAnswers5',
]

export const QUESTIONNAIRE_FORM_INPUT_FIELDS = ['eventsAttended', 'engagementSource']
