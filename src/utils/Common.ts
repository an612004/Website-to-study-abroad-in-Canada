export const stringToSlug = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\W_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export function dateString(date: Date) {
  // Extract date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based (January = 0)
  const year = date.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

export function dateTimeString(date: Date) {
  // Extract date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-based (January = 0)
  const year = date.getFullYear();

  // Extract time components
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Create the formatted date string
  const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export function getCurrentDateString() {
  const currentDate = new Date();
  return dateString(currentDate);
}

export function getCurrentDateTimeString() {
  const currentDate = new Date();
  return dateTimeString(currentDate);
}

export function parseDateString(dateStr: string) {
  if (dateStr === undefined || dateStr === null || dateStr.length === 0)
    return new Date();

  const parts = dateStr.split('/'); // Split the string by '/'
  const day = parseInt(parts[0], 10); // Convert day to an integer
  const month = parseInt(parts[1], 10) - 1; // Convert month to 0-based index
  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

export const imageKitExtract = (s: string) => {
  try {
    if (s.includes('||')) {
      // ImageKit format: id||url
      const ss = s.split('||');
      return { id: ss[0], url: ss[1] };
    }
    // Regular URL format
    return { id: '', url: s };
  } catch {
    return { id: '', url: s };
  }
};
export const imageKitCombine = (id: string, url: string) => {
  return `${id}||${url}`;
};
