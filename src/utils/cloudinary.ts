const CLOUDINARY_UPLOAD = '/image/upload/';

export const cloudinaryImage = (src: string, transform = 'q_auto,f_auto,c_limit,w_1200') => {
  if (!src?.includes('res.cloudinary.com') || !src.includes(CLOUDINARY_UPLOAD)) {
    return src;
  }

  const [base, rest] = src.split(CLOUDINARY_UPLOAD);

  if (!base || !rest) {
    return src;
  }

  return `${base}${CLOUDINARY_UPLOAD}${transform}/${rest.replace(/^\/+/, '')}`;
};
