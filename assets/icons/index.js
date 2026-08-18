// ============================================================
// IMPORT ALL ICONS
// ============================================================

import { DataStruc } from "./DataStruc";
// import { NetworksIcon } from "./NetworksIcon";
// // import { OsIcon } from "./OsIcon";
// import { AlgorithmsIcon } from "./AlgorithmsIcon";
// import { DatabaseIcon } from "./DatabaseIcon";

// ============================================================
// EXPORT ALL ICONS
// ============================================================

export { DataStruc };
// export { NetworksIcon };
// export { OsIcon };
// export { AlgorithmsIcon };
// export { DatabaseIcon };

// ============================================================
// ICON MAP (Subject ID → Icon Component)
// ============================================================

export const ICON_MAP = {
  '1': DataStruc,      // Data Structures
//   '2': NetworksIcon,   // Networks
//   '3': OsIcon,         // Operating Systems
//   '4': AlgorithmsIcon, // Algorithms
//   '5': DatabaseIcon,   // Databases
};

// ============================================================
// DEFAULT ICON
// ============================================================

export const DefaultIcon = DataStruc;

// ============================================================
// GET ICON FOR SUBJECT
// ============================================================

export const getIconForSubject = (subject) => {
  // ✅ Safeguard: if subject is undefined or null
  if (!subject) {
    console.warn('⚠️ getIconForSubject: subject is undefined, using default');
    return DefaultIcon;
  }

  // ✅ If subject has an _id and it exists in the map
  if (subject._id && ICON_MAP[subject._id]) {
    return ICON_MAP[subject._id];
  }

  // ✅ Try to match by name
  const name = subject.name?.toLowerCase() || '';
  
  if (name.includes('data')) return DataStruc;
//   if (name.includes('network')) return NetworksIcon;
//   if (name.includes('operating') || name.includes('os')) return OsIcon;
//   if (name.includes('algorithm')) return AlgorithmsIcon;
//   if (name.includes('database')) return DatabaseIcon;

  // ✅ Default fallback
  return DefaultIcon;
};

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default {
  DataStruc,
//   NetworksIcon,
//   OsIcon,
//   AlgorithmsIcon,
//   DatabaseIcon,
  ICON_MAP,
  DefaultIcon,
  getIconForSubject,
};