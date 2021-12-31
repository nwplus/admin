export const EDIT = 'EDIT';
export const NEW = 'NEW';
export const VIEW = 'VIEW';
export const CLOSE = 'CLOSE';
export const DELETE = 'DELETE';
export const SAVE = 'SAVE';
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
  EVAL_GREY: '#D2D2D2',
};
export const BUTTON_COLOR = {
  PRIMARY: 'linear-gradient(92.58deg, #0DEFE1 0%, #78FF96 100%)',
  SECONDARY: '#FFFFFF',
  OUTLINE: 'Transparent',
  DESTRUCTIVE: '#F65C5C',
  HOVER_PRIMARY: 'linear-gradient(90deg, #D7FFF0 0%, #7BFFCF 100%)',
};
export const TAG_COLOR = {
  TEAL: '#00BCBC',
  BLUE: '#2F80ED',
  PURPLE: '#812F9D',
  GREEN: '#00B775',
  RED: '#F83D3D',
  ORANGE: '#FFA644',
  YELLOW: '#FFF463',
};
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
];
export const FAQ = 'FAQ';
export const FAQCategory = Object.freeze({
  GENERAL: 'General',
  LOGS: 'Logistics',
  TEAMS: 'Teams & Projects',
  MISC: 'Miscellaneous',
});
export const SPONSORSHIP = 'SPONSORSHIP';
export const HACKATHON_NAVBAR = {
  intro: 'Intro',
  events: 'Events',
  spocos: 'Sponsors',
  FeatureFlags: 'Feature Flags',
  BuildConfig: 'Build Config',
};
export const LIVESITE_NAVBAR = {
  announcements: 'Announcements',
  quicklinks: 'Quicklinks',
  schedule: 'Schedule',
  settings: 'Settings',
  judging: 'Judging',
};

export const ASSESSMENT_COLOR = {
  PRIMARY: '#2D2937',
  PRIMARY_DARK: '#1b1821',
  TEXT: '#5A5A5A',
  BLACK: '#000000',
  DARK_COPY: '#A198A6',
  RED: '#EB5757',
  DARK_GRAY: '#4F4F4F',
  INPUT_GRAY: '#F4F4F4',
  TRANSPARENT: 'Transparent',
  BODY_TEXT: '#5A5A5A',
  LIGHT_GRAY: '#828282',
  UNSCORED_GRAY: '#E0E0E0',
  LIGHT_BLUE: '#F0EEF2',
  BLUE_TEXT: '#2F80ED',
  TOOLBAR_GRAY: '#FAFAFA',
  BLUE_BORDER: '#21258A',
};

// Assessment portal
export const APPLICATION_STATUS = {
  applied: {
    color: ASSESSMENT_COLOR.RED,
    textColor: 'white',
    text: 'applied',
  },
  scored: {
    color: ASSESSMENT_COLOR.BLUE_TEXT,
    textColor: 'white',
    text: 'scored',
  },
  accepted: {
    color: 'green',
    textColor: 'white',
    text: 'accepted',
  },
  completed: {
    color: COLOR.MIDNIGHT_PURPLE,
    textColor: 'white',
    text: 'completed',
  },
};

export const SCORING = {
  RESUME: {
    label: 'Resume',
    value: 7,
    weight: 1,
  },
  ESSAY: {
    label: 'Short Answer 1',
    value: 3,
    weight: 2,
  },
  ESSAY_TWO: {
    label: 'Short Answer 2',
    value: 3,
    weight: 2,
  },
};

export const MAX_SCORE = Object.values(SCORING).reduce(
  (acc, curr) => acc + curr.value * curr.weight,
  0
);

export const SORT = {
  TIMESTAMP: 'Timestamp',
  LAST_NAME: 'Last Name',
  FIRST_NAME: 'First Name',
  SCORE: 'Total Score',
  STATUS: 'Status',
};

export const TABS = {
  OVERVIEW: 'Overview',
  RESUME: 'Resume',
  COMMENTS: 'Comments',
};

export const RUBRIC = {
  DEV: [
    {
      score: '+2',
      label:
        'At least 2 small projects or 1 big project (personal, hackathon, or school projects)',
    },
    {
      score: '+1',
      label: 'If one or more of any work experience',
    },
    {
      score: '+1',
      label:
        'If any of the work experiences are tech-related (work or internship)',
    },
    {
      score: '+1',
      label: 'At least one tech-related extracurricular activity',
    },
    {
      score: '+1',
      label: 'If have won a hackathon (won: 1st, 2nd, 3rd)',
    },
    {
      score: '+1',
      label:
        'Easy to read, clean, well made (something you would do to apply to a job)',
    },
  ],
  DESIGN: [
    {
      score: '+2',
      label:
        'At least 2 small projects or 1 big project (personal, hackathon, school)',
    },
    {
      score: '+1',
      label:
        'For a design project linked to tech (examples: website design, app design) (not examples: sculpture)',
    },
    {
      score: '+1',
      label: 'If one or more of any work experience',
    },
    {
      score: '+1',
      label: 'If at least one job is design-related',
    },
    {
      score: '+1',
      label: 'At least one tech-related extracurricular activity',
    },
    {
      score: '+1',
      label:
        'Easy to read, clean, well made (something you would do to apply to a job)',
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
      label: 'If project/experience related to tech',
    },
    {
      score: '+1',
      label: 'For each extracurricular activity (1 point each, max 2 points)',
    },
    {
      score: '+1',
      label: 'If extracurricular activities are tech-related',
    },
    {
      score: '+1',
      label:
        'Easy to read, clean, well made (something you would do to apply to a job)',
    },
  ],
  LONG_ANSWER: [
    {
      score: '+4',
      label:
        'Above and beyond | Damn this is some quality writing | You think we need to accept this applicant',
    },
    {
      score: '+3',
      label:
        'One meaningful and realistic statement | Connect with impact to self or society (the why behind it) | Explanation to personal connection or passion (the how)',
    },
    {
      score: '+2',
      label:
        'One meaningful and realistic statement | Connect with impact to self or society (the why behind it)',
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
      label:
        'Spelling and grammar mistakes makes it hard to read or understand the text',
    },
  ],
};
