import reviewsRaw from './la-casa-frente-al-parque-reviews.json';

type Review = {
  is_duplicate?: boolean;
  platform?: string | null;
  guest_name?: string | null;
  stay_start_date?: string | null;
  stay_end_date?: string | null;
  review_published_at?: string | null;
  nights?: number | null;
  overall_score?: number | null;
  currency_or_scale?: string | null;
  title?: string | null;
  comment_public?: string | null;
  comment_positive?: string | null;
  guest_count?: number | null;
};

const uniqueReviews = (reviewsRaw as Review[]).filter((review) => !review.is_duplicate);

const averageRatingFor = (platform: string) => {
  const scores = uniqueReviews
    .filter((review) => review.platform === platform)
    .map((review) => Number(review.overall_score))
    .filter((score) => Number.isFinite(score));

  if (scores.length === 0) {
    return null;
  }

  const average = scores.reduce((total, score) => total + score, 0) / scores.length;

  return Number(average.toFixed(1));
};

const reviewDate = (review: Review) => review.stay_start_date ?? review.review_published_at ?? '';

const reviewText = (review: Review) =>
  (review.comment_public || review.comment_positive || review.title || '').trim();

const reviews = uniqueReviews
  .map((review) => ({
    name: review.guest_name ?? 'Huésped',
    platform: review.platform ?? 'review',
    text: reviewText(review),
    stayStartDate: review.stay_start_date,
    stayEndDate: review.stay_end_date,
    reviewPublishedAt: review.review_published_at,
    nights: review.nights,
    guestCount: review.guest_count,
    score: review.overall_score,
    scale: review.currency_or_scale,
    sortDate: reviewDate(review),
  }))
  .filter((review) => review.text && review.text !== '.')
  .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
  .slice(0, 30)
  .map(({ sortDate, ...review }) => review);

export const parqueReviews = reviews;
export const parqueReviewRatings = {
  airbnb: averageRatingFor('airbnb'),
  booking: averageRatingFor('booking'),
};
