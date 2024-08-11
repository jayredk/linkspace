import {
  BsFacebook,
  BsInstagram,
  BsThreadsFill,
  BsTiktok,
  BsTwitterX,
  BsYoutube,
} from 'react-icons/bs';

export const fontSizeMap = {
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
};

export const fontSizeMapWithSubtitle = {
  sm: '20px',
  md: '24px',
  lg: '28px',
  xl: '36px',
};

export const iconSizeMap = {
  sm: '24px',
  md: '24px',
  lg: '32px',
  xl: '40px',
};

export const iconSizeMapWithSubtitle = {
  sm: '32px',
  md: '32px',
  lg: '40px',
  xl: '48px',
};

export const iconMap = {
  facebook: BsFacebook,
  instagram: BsInstagram,
  twitter: BsTwitterX,
  youtube: BsYoutube,
  tiktok: BsTiktok,
  threads: BsThreadsFill,
};

export const iconArray = Object.entries(iconMap).map(([key, value]) => ({
  name: key,
  icon: value,
}));

export const effectMap = {
  none: '',
  wobble: 'animate__wobble',
  shakeX: 'animate__shakeX',
  pulse: 'animate__pulse',
};
