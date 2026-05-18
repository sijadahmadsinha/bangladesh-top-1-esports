import facebookIcon from '@/assets/fb-icon.svg';
import youtubeIcon from '@/assets/youtube-icon.svg';
import tiktokIcon from '@/assets/tiktok-icon.svg';
import discordIcon from '@/assets/discord-icon.svg';
import instagramIcon from '@/assets/instagram-icon.svg';

const iconMap = {
  facebook: facebookIcon,
  fb: facebookIcon,
  facebookpage: facebookIcon,
  facebookgroup: facebookIcon,
  youtube: youtubeIcon,
  tiktok: tiktokIcon,
  music: tiktokIcon,
  discord: discordIcon,
  messagecircle: discordIcon,
  instagram: instagramIcon,
};

export default function SocialIcon({ platform, size = 20, className = "" }) {
  if (!platform) return null;
  
  const normalizedPlatform = platform.toLowerCase().replace(/\s+/g, '');
  const iconSrc = iconMap[normalizedPlatform];

  if (!iconSrc) return null;

  return (
    <img
      src={iconSrc}
      alt={platform}
      style={{ width: size, height: size }}
      className={`object-contain max-w-full max-h-full inline-block ${className}`}
    />
  );
}
