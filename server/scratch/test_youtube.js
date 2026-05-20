function getEmbedUrl(url) {
  if (!url) return '';
  
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
  
  if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
    return `https://www.youtube.com/embed/${url.trim()}`;
  }
  
  return url;
}

const testUrls = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://youtube.com/watch?v=dQw4w9WgXcQ',
  'http://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=related',
  'https://youtu.be/dQw4w9WgXcQ',
  'https://youtu.be/dQw4w9WgXcQ?si=some-query',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/live/dQw4w9WgXcQ',
  'https://www.youtube.com/live/dQw4w9WgXcQ?feature=share',
  'https://www.youtube.com/shorts/dQw4w9WgXcQ',
  'https://m.youtube.com/watch?v=dQw4w9WgXcQ',
  'dQw4w9WgXcQ'
];

console.log("Starting tests...");
testUrls.forEach(url => {
  const result = getEmbedUrl(url);
  console.log(`Input:  ${url}`);
  console.log(`Output: ${result}`);
  const ok = result === 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  console.log(`Status: ${ok ? '✅ PASS' : '❌ FAIL'}`);
  console.log("------------------------");
});
