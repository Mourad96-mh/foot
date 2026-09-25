// Gallery content. To add media, add an entry — no other code change needed.
//   photo: { type: 'photo', src: '/img/xxx.webp', caption: { ar, fr, en, es } } or captionKey (from gallery.captions)
//   video: { type: 'video', youtubeId: 'dQw4w9WgXcQ', caption: { ar, fr, en, es } }
// TODO (client): replace the poster crops with real photos of the San Luis campus.
export const gallery = [
  { type: 'photo', src: '/img/players.webp', captionKey: 'players' },
  { type: 'photo', src: '/img/huddle.webp', captionKey: 'huddle' },
  { type: 'photo', src: '/img/campus.webp', captionKey: 'campus' },
  { type: 'photo', src: '/img/skyline.webp', captionKey: 'skyline' },
  { type: 'photo', src: '/img/ball.webp', captionKey: 'ball' },
  { type: 'photo', src: '/img/poster.webp', captionKey: 'poster', tall: true },
];
