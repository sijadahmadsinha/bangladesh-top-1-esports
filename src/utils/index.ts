export function createPageUrl(pageName: string) {
    return '/' + pageName.replace(/ /g, '-');
}

export function getEmbedUrl(url: string): string {
  if (!url) return '';
  
  // Regular expressions to match different YouTube link formats and capture the 11-character video ID
  const patterns = [
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
    /youtube\.com\/live\/([^"&?\/\s]{11})/i,
    /youtube\.com\/shorts\/([^"&?\/\s]{11})/i
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  // Fallback: If it's already a raw 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return `https://www.youtube.com/embed/${url.trim()}`;
  }
  
  return url;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const trimmed = dateStr.trim();
  // If it's already in DD/MM/YYYY format, return as is
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    return trimmed;
  }
  // Check if dateStr matches YYYY-MM-DD
  const match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    return `${match[3]}/${match[2]}/${match[1]}`;
  }
  // Fallback in case of standard JS Date string or other parseable formats
  const d = new Date(trimmed);
  if (!isNaN(d.getTime())) {
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return dateStr;
}