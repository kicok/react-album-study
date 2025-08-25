export interface ResDto {
  results: CardDto[];
  total: number;
  total_pages: number;
}

export interface CardDto {
  id: string;
  slug: string;
  alternative_slugs: {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
    id: string;
  };
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  breadcrumbs: string[];
  urls: Url;
  links: Link;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[]; // 빈 배열 (추후 타입 정의 가능)
  sponsorship: null | object;
  topic_submissions: {
    [key: string]: {
      status: string;
      approved_on: string;
    };
  };
  asset_type: string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    total_illustrations: number;
    total_promoted_illustrations: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: string | null;
    };
  };
}

interface Link {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Tag {
  source: {
    ancestry: any;
    cover_photo: any;
    description: string;
    meta_descritpion: string;
    meta_title: string;
    subtitle: string;
    title: string;
  };
}

interface Url {
  raw: string;
  fu1ll: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
