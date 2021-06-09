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

// Assessment portal
export const APPLICATION_STATUS = {
  applied: {
    color: COLOR.RED,
    textColor: 'white',
    text: 'applied',
  },
  scored: {
    color: COLOR.BLUE_TEXT,
    textColor: 'white',
    text: 'scored',
  },
  accepted: {
    color: 'green',
    textColor: 'white',
    text: 'accepted',
  },
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
  LIGHT_BLUE: '#F6FEFF',
  BLUE_TEXT: '#2F80ED',
  TOOLBAR_GRAY: '#FAFAFA',
  BLUE_BORDER: '#21258A',
};

export const MAX_SCORES = {
  RESUME: {
    value: 7,
    weight: 1,
  },
  ESSAY: {
    value: 3,
    weight: 2,
  },
};

export const MAX_SCORE = Object.values(MAX_SCORES).reduce(
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
