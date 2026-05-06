import reviewsRaw from './casa-avellaneda-reviews.json';

type Review = {
  is_duplicate?: boolean;
  overall_score?: number | null;
  comment_public?: string | null;
  comment_positive?: string | null;
};

const reviews = (reviewsRaw as Review[])
  .filter((review) => !review.is_duplicate)
  .filter((review) => Number(review.overall_score ?? 0) >= 9 || Number(review.overall_score ?? 0) >= 5)
  .map((review) => review.comment_public || review.comment_positive || '')
  .map((text) => text.trim())
  .filter((text) => text && text !== '.')
  .slice(0, 4);

export const avellanedaReviews = reviews;
