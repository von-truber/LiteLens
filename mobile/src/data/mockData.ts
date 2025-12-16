import { Challenge, Comment, ImageAsset, Post, User } from '../models/types';

const sampleImages: ImageAsset[] = [
  {
    id: 'img-1',
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    width: 4000,
    height: 2667,
  },
  {
    id: 'img-2',
    url: 'https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1200&q=80',
    width: 3840,
    height: 2560,
  },
  {
    id: 'img-3',
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80',
    width: 4000,
    height: 2250,
  },
  {
    id: 'img-4',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    width: 4000,
    height: 2667,
  },
  {
    id: 'img-5',
    url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    width: 4000,
    height: 2667,
  },
];

export const users: User[] = [
  {
    id: 'u-1',
    username: 'streetframe',
    displayName: 'Maya Ortiz',
    bio: 'Street and documentary photographer chasing light and quiet stories.',
    location: 'Barcelona, Spain',
    styles: ['street', 'documentary'],
    avatarUrl: undefined,
  },
  {
    id: 'u-2',
    username: 'portraitsbyleo',
    displayName: 'Leo Park',
    bio: 'Portraits with natural light and honest expressions.',
    location: 'Seoul, South Korea',
    styles: ['portrait'],
    avatarUrl: undefined,
  },
  {
    id: 'u-3',
    username: 'nocturnescapes',
    displayName: 'Aya Nakamura',
    bio: 'Night cityscapes and neon reflections.',
    location: 'Tokyo, Japan',
    styles: ['night', 'city'],
    avatarUrl: undefined,
  },
  {
    id: 'u-4',
    username: 'mountainlight',
    displayName: 'Jonas Keller',
    bio: 'Alpine sunrises and long hikes for one frame.',
    location: 'Zermatt, Switzerland',
    styles: ['landscape'],
    avatarUrl: undefined,
  },
];

export const posts: Post[] = [
  {
    id: 'p-1',
    author: users[0],
    title: 'Crossing at dusk',
    description:
      'Waiting for the last bit of blue hour to catch this quiet moment at the intersection.',
    images: [sampleImages[0]],
    tags: ['street', 'blue-hour', 'city'],
    gear: ['Fujifilm X100V'],
    exif: {
      camera: 'Fujifilm X100V',
      focalLength: '23mm',
      aperture: 'f/2',
      shutterSpeed: '1/125s',
      iso: 800,
    },
    location: 'Barcelona',
    createdAt: new Date().toISOString(),
    appreciationsCount: 42,
    commentsCount: 7,
  },
  {
    id: 'p-2',
    author: users[1],
    title: 'Window light portrait',
    description: 'Soft side light and a simple background to keep the focus on expression.',
    images: [sampleImages[1], sampleImages[2]],
    tags: ['portrait', 'natural-light'],
    gear: ['Sony A7III', 'Zeiss 55mm'],
    exif: {
      camera: 'Sony A7III',
      lens: 'Zeiss 55mm',
      focalLength: '55mm',
      aperture: 'f/1.8',
      shutterSpeed: '1/200s',
      iso: 400,
    },
    location: 'Seoul',
    createdAt: new Date().toISOString(),
    appreciationsCount: 88,
    commentsCount: 15,
  },
  {
    id: 'p-3',
    author: users[2],
    title: 'Neon alley',
    description: 'Layered reflections in a narrow alley just after the rain.',
    images: [sampleImages[2]],
    tags: ['night', 'city', 'neon'],
    gear: ['Sony A7R IV', 'FE 24-70mm f/2.8 GM'],
    exif: {
      camera: 'Sony A7R IV',
      lens: 'FE 24-70mm f/2.8 GM',
      focalLength: '35mm',
      aperture: 'f/2.8',
      shutterSpeed: '1/250s',
      iso: 800,
    },
    location: 'Tokyo',
    createdAt: new Date().toISOString(),
    appreciationsCount: 64,
    commentsCount: 9,
  },
  {
    id: 'p-4',
    author: users[3],
    title: 'First light on the ridge',
    description: 'A cold morning waiting for the first light to hit the peaks.',
    images: [sampleImages[4]],
    tags: ['landscape', 'mountain', 'sunrise'],
    gear: ['Nikon Z7 II', '24-70mm f/4'],
    exif: {
      camera: 'Nikon Z7 II',
      lens: 'NIKKOR Z 24-70mm f/4 S',
      focalLength: '28mm',
      aperture: 'f/8',
      shutterSpeed: '1/160s',
      iso: 200,
    },
    location: 'Zermatt',
    createdAt: new Date().toISOString(),
    appreciationsCount: 51,
    commentsCount: 6,
  },
];

export const commentsByPostId: Record<string, Comment[]> = {
  'p-1': [
    {
      id: 'c-1',
      author: users[1],
      body: 'Love how calm this feels even though it is a busy crossing.',
      isCritique: false,
      createdAt: new Date().toISOString(),
    },
  ],
  'p-2': [
    {
      id: 'c-2',
      author: users[0],
      body: 'Beautiful use of window light – the catchlights are great.',
      isCritique: false,
      createdAt: new Date().toISOString(),
    },
  ],
  'p-3': [
    {
      id: 'c-3',
      author: users[1],
      body: 'That reflection layering is so good – feels like a frame from a film.',
      isCritique: false,
      createdAt: new Date().toISOString(),
    },
  ],
  'p-4': [
    {
      id: 'c-4',
      author: users[0],
      body: 'Worth the early wake up – love the separation between the peaks.',
      isCritique: false,
      createdAt: new Date().toISOString(),
    },
  ],
};

export const challenges: Challenge[] = [
  {
    id: 'c-1',
    title: 'Golden Hour Stories',
    description: 'Capture the warmth and calm of golden hour, whether in the city or in nature.',
    themeTags: ['golden-hour', 'storytelling'],
    coverImage: sampleImages[0],
    status: 'live',
    startsAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'c-2',
    title: 'Quiet City Nights',
    description: 'Show the stillness of the city after dark – minimalism, reflections, and glow.',
    themeTags: ['night', 'city', 'minimal'],
    coverImage: sampleImages[2],
    status: 'upcoming',
    startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
];


