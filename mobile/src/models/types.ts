export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  styles: string[]; // e.g. ['street', 'portrait']
};

export type ImageAsset = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export type ExifData = {
  camera?: string;
  lens?: string;
  focalLength?: string; // '35mm'
  aperture?: string; // 'f/1.8'
  shutterSpeed?: string; // '1/200s'
  iso?: number;
};

export type Post = {
  id: string;
  author: User;
  title: string;
  description?: string;
  images: ImageAsset[]; // single hero or small series
  tags: string[];
  gear?: string[];
  exif?: ExifData;
  location?: string;
  createdAt: string;
  appreciationsCount: number;
  commentsCount: number;
};

export type Comment = {
  id: string;
  author: User;
  body: string;
  isCritique: boolean;
  createdAt: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  themeTags: string[];
  coverImage: ImageAsset;
  status: 'upcoming' | 'live' | 'ended';
  startsAt: string;
  endsAt: string;
};


