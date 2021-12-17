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
  MIDNIGHT_PURPLE: '#2C2543',
  MIDNIGHT_PURPLE_LIGHT: '#8E7EB4',
  LIGHT_GRAY: '#F0EEF2',
  LIGHT_PURPLE: '#E2D6FF',
  NW_TEAL: '#20FFAF',
  TEAL: '#00A399',
  INACTIVE_DARK_GRAY: '#8C898F',
  BRIGHT_RED: '#F83D3D',
  GREY_500: '#BDBAC3',
};
export const BUTTON_COLOR = {
  PRIMARY: 'linear-gradient(92.58deg, #0DEFE1 0%, #78FF96 100%)',
  SECONDARY: '#FFFFFF',
  OUTLINE: 'Transparent',
  DESTRUCTIVE: '#F65C5C',
  HOVER_PRIMARY: 'linear-gradient(90deg, #D7FFF0 0%, #7BFFCF 100%)',
};
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

export const COMPLETED_TAG = {
  color: COLOR.MIDNIGHT_PURPLE,
  textColor: 'white',
  text: 'completed',
};

export const SCORING = {
  LINK: {
    label: 'GitHub/Personal Website',
    value: 7,
    weight: 1,
  },
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
