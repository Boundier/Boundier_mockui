
const KEYS = {
  EVENTS: 'boundier_events',
  PROFILE: 'boundier_profile',
  DISTORTION: 'boundier_distortion',
  PATTERN: 'boundier_pattern',
};

export const storage = {
  getEvents: <T>(): T[] => {
    try {
      const item = localStorage.getItem(KEYS.EVENTS);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  },

  addEvent: <T>(event: T) => {
    const events = storage.getEvents<T>();
    events.push(event);
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
  },

  getProfile: <T>(defaultProfile: T): T => {
    try {
      const item = localStorage.getItem(KEYS.PROFILE);
      return item ? JSON.parse(item) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  },

  saveProfile: <T>(profile: T) => {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  getDistortion: <T>(defaultProfile: T): T => {
    try {
      const item = localStorage.getItem(KEYS.DISTORTION);
      return item ? JSON.parse(item) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  },

  saveDistortion: <T>(profile: T) => {
    localStorage.setItem(KEYS.DISTORTION, JSON.stringify(profile));
  },

  getPattern: <T>(): T[] => {
    try {
      const item = localStorage.getItem(KEYS.PATTERN);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  },

  savePattern: <T>(pattern: T[]) => {
    localStorage.setItem(KEYS.PATTERN, JSON.stringify(pattern));
  },

  reset: () => {
    localStorage.removeItem(KEYS.EVENTS);
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.DISTORTION);
    localStorage.removeItem(KEYS.PATTERN);
  }
};
