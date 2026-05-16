const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// simpler storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'top1_esports',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).single('file');

exports.uploadFile = (req, res) => {
  console.log('📂 Starting file upload...');
  
  upload(req, res, (err) => {
    if (err) {
      console.error('❌ Cloudinary Upload Error:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (!req.file) {
      console.log('⚠️ No file received');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('🚀 Upload Success:', req.file.path);
    res.json({
      url: req.file.path,
      secure_url: req.file.path, // some clients might look for this
      filename: req.file.filename
    });
  });
};
