export interface User {
  id: string;
  username: string;
  displayName: string;
  handle: string;
  bio: string;
  followers: number;
  following: number;
  postsCount: number;
  avatarColor: string;
  initials: string;
  verified?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  text: string;
  timestamp: string;
  user: User;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  text: string;
  imageGradient?: string;
  imageAlt?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timestamp: string;
  hashtags?: string[];
}

export interface Story {
  id: string;
  userId: string;
  user: User;
  seen: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  actorId: string;
  actor: User;
  message: string;
  postId?: string;
  timestamp: string;
  read: boolean;
}

export interface TrendingHashtag {
  id: string;
  tag: string;
  postCount: number;
  category: string;
}

// Avatar colors for users
const AVATAR_COLORS = [
  'bg-rose-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-sky-400',
  'bg-violet-400',
  'bg-pink-400',
  'bg-red-400',
  'bg-indigo-400',
];

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'aurora_creates',
    displayName: 'Aurora Chen',
    handle: '@aurora_creates',
    bio: 'Digital artist & photographer 📸 | Capturing moments that matter | Based in San Francisco ✨',
    followers: 24800,
    following: 892,
    postsCount: 347,
    avatarColor: 'bg-rose-400',
    initials: 'AC',
    verified: true,
  },
  {
    id: 'u2',
    username: 'marco_travels',
    displayName: 'Marco Rivera',
    handle: '@marco_travels',
    bio: '🌍 Travel photographer | 47 countries and counting | Adventure seeker | DM for collabs',
    followers: 58200,
    following: 1240,
    postsCount: 892,
    avatarColor: 'bg-sky-400',
    initials: 'MR',
    verified: true,
  },
  {
    id: 'u3',
    username: 'zoe_bakes',
    displayName: 'Zoe Williams',
    handle: '@zoe_bakes',
    bio: 'Pastry chef & food blogger 🍰 | Sharing recipes that bring joy | NYC based',
    followers: 12400,
    following: 567,
    postsCount: 215,
    avatarColor: 'bg-amber-400',
    initials: 'ZW',
  },
  {
    id: 'u4',
    username: 'dev_kai',
    displayName: 'Kai Nakamura',
    handle: '@dev_kai',
    bio: 'Full-stack dev 💻 | Open source enthusiast | Building cool things with React & Rust',
    followers: 8900,
    following: 423,
    postsCount: 156,
    avatarColor: 'bg-violet-400',
    initials: 'KN',
  },
  {
    id: 'u5',
    username: 'luna_fitness',
    displayName: 'Luna Patel',
    handle: '@luna_fitness',
    bio: 'Certified personal trainer 💪 | Wellness coach | Helping you become your best self',
    followers: 31500,
    following: 789,
    postsCount: 428,
    avatarColor: 'bg-emerald-400',
    initials: 'LP',
    verified: true,
  },
  {
    id: 'u6',
    username: 'felix_music',
    displayName: 'Felix Okafor',
    handle: '@felix_music',
    bio: '🎵 Musician & producer | Jazz meets electronic | New EP dropping soon 🎹',
    followers: 19700,
    following: 654,
    postsCount: 289,
    avatarColor: 'bg-indigo-400',
    initials: 'FO',
  },
  {
    id: 'u7',
    username: 'sara_designs',
    displayName: 'Sara Johansson',
    handle: '@sara_designs',
    bio: 'UX/UI Designer ✏️ | Making the web beautiful one pixel at a time | Stockholm 🇸🇪',
    followers: 15300,
    following: 512,
    postsCount: 198,
    avatarColor: 'bg-pink-400',
    initials: 'SJ',
  },
  {
    id: 'u8',
    username: 'alex_writes',
    displayName: 'Alex Thompson',
    handle: '@alex_writes',
    bio: 'Writer & storyteller 📝 | Published in NYT, The Atlantic | Working on my first novel',
    followers: 22100,
    following: 934,
    postsCount: 512,
    avatarColor: 'bg-teal-400',
    initials: 'AT',
  },
  {
    id: 'u9',
    username: 'mia_science',
    displayName: 'Mia Kowalski',
    handle: '@mia_science',
    bio: 'Astrophysicist 🔭 | Science communicator | Making the cosmos accessible to everyone',
    followers: 44600,
    following: 287,
    postsCount: 634,
    avatarColor: 'bg-orange-400',
    initials: 'MK',
    verified: true,
  },
  {
    id: 'u10',
    username: 'james_chef',
    displayName: 'James Laurent',
    handle: '@james_chef',
    bio: 'Executive Chef 👨‍🍳 | Michelin-starred restaurant | French-Asian fusion | Paris & Tokyo',
    followers: 67800,
    following: 1102,
    postsCount: 743,
    avatarColor: 'bg-red-400',
    initials: 'JL',
    verified: true,
  },
];

const u = (id: string) => MOCK_USERS.find(u => u.id === id)!;

export const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', userId: 'u2', postId: 'p1', text: 'Absolutely stunning! The lighting is perfect 😍', timestamp: '2h ago', user: u('u2') },
  { id: 'c2', userId: 'u5', postId: 'p1', text: 'This is incredible work, Aurora! Keep it up 🔥', timestamp: '1h ago', user: u('u5') },
  { id: 'c3', userId: 'u7', postId: 'p1', text: 'The composition here is chef\'s kiss 👌', timestamp: '45m ago', user: u('u7') },
  { id: 'c4', userId: 'u1', postId: 'p2', text: 'I need to visit this place immediately!', timestamp: '3h ago', user: u('u1') },
  { id: 'c5', userId: 'u4', postId: 'p2', text: 'Which camera did you use for this shot?', timestamp: '2h ago', user: u('u4') },
  { id: 'c6', userId: 'u8', postId: 'p2', text: 'The colors are so vivid, love it!', timestamp: '1h ago', user: u('u8') },
  { id: 'c7', userId: 'u3', postId: 'p3', text: 'This recipe looks amazing! Saving for later 🍰', timestamp: '4h ago', user: u('u3') },
  { id: 'c8', userId: 'u6', postId: 'p3', text: 'Made this last weekend, turned out perfect!', timestamp: '3h ago', user: u('u6') },
  { id: 'c9', userId: 'u9', postId: 'p4', text: 'The science behind this is fascinating!', timestamp: '5h ago', user: u('u9') },
  { id: 'c10', userId: 'u10', postId: 'p4', text: 'Great explanation, very clear!', timestamp: '4h ago', user: u('u10') },
  { id: 'c11', userId: 'u2', postId: 'p5', text: 'This workout routine is 🔥 Adding to my schedule!', timestamp: '6h ago', user: u('u2') },
  { id: 'c12', userId: 'u1', postId: 'p5', text: 'Luna you\'re such an inspiration!', timestamp: '5h ago', user: u('u1') },
  { id: 'c13', userId: 'u4', postId: 'p6', text: 'The beat drop at 1:23 is insane 🎵', timestamp: '7h ago', user: u('u4') },
  { id: 'c14', userId: 'u7', postId: 'p6', text: 'This is going on repeat all day!', timestamp: '6h ago', user: u('u7') },
  { id: 'c15', userId: 'u5', postId: 'p7', text: 'The UI is so clean! What tools did you use?', timestamp: '8h ago', user: u('u5') },
  { id: 'c16', userId: 'u3', postId: 'p8', text: 'This is exactly what I needed to read today 💙', timestamp: '9h ago', user: u('u8') },
  { id: 'c17', userId: 'u6', postId: 'p9', text: 'Mind blown 🤯 Space is incredible!', timestamp: '10h ago', user: u('u6') },
  { id: 'c18', userId: 'u1', postId: 'p10', text: 'I tried this recipe and it was divine!', timestamp: '11h ago', user: u('u1') },
  { id: 'c19', userId: 'u8', postId: 'p11', text: 'Tokyo is on my bucket list! Amazing shots', timestamp: '12h ago', user: u('u8') },
  { id: 'c20', userId: 'u9', postId: 'p12', text: 'The gradient work here is stunning!', timestamp: '13h ago', user: u('u9') },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    user: u('u1'),
    text: 'Golden hour magic at Baker Beach 🌅 Sometimes you just have to drop everything and chase the light. This shot took 3 hours of waiting but was absolutely worth it. #photography #goldenhour #sanfrancisco',
    imageGradient: 'gradient-card-1',
    imageAlt: 'Golden hour photography',
    likes: 1842,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p1'),
    shares: 234,
    timestamp: '2h ago',
    hashtags: ['photography', 'goldenhour', 'sanfrancisco'],
  },
  {
    id: 'p2',
    userId: 'u2',
    user: u('u2'),
    text: 'Woke up at 4am to catch this sunrise over the Dolomites 🏔️ No filter needed when nature does all the work. Italy never disappoints. #travel #dolomites #italy #sunrise',
    imageGradient: 'gradient-card-2',
    imageAlt: 'Dolomites sunrise',
    likes: 3241,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p2'),
    shares: 567,
    timestamp: '4h ago',
    hashtags: ['travel', 'dolomites', 'italy'],
  },
  {
    id: 'p3',
    userId: 'u3',
    user: u('u3'),
    text: 'Finally perfected my lavender honey croissant recipe after 6 months of testing! 🥐✨ The secret is cold butter and patience. Full recipe dropping on my blog tomorrow! #baking #croissant #foodie',
    imageGradient: 'gradient-card-5',
    imageAlt: 'Lavender honey croissants',
    likes: 892,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p3'),
    shares: 145,
    timestamp: '5h ago',
    hashtags: ['baking', 'croissant', 'foodie'],
  },
  {
    id: 'p4',
    userId: 'u4',
    user: u('u4'),
    text: 'Just shipped a new open-source library for React state management! 🚀 It\'s 10x smaller than Redux with a simpler API. Check it out on GitHub — link in bio. #react #opensource #webdev #javascript',
    likes: 567,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p4'),
    shares: 234,
    timestamp: '6h ago',
    hashtags: ['react', 'opensource', 'webdev'],
  },
  {
    id: 'p5',
    userId: 'u5',
    user: u('u5'),
    text: 'Monday motivation! 💪 Here\'s a 20-minute HIIT routine you can do anywhere, no equipment needed. Consistency beats intensity every single time. Save this for your next workout! #fitness #hiit #wellness',
    imageGradient: 'gradient-card-3',
    imageAlt: 'Fitness workout',
    likes: 2156,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p5'),
    shares: 389,
    timestamp: '7h ago',
    hashtags: ['fitness', 'hiit', 'wellness'],
  },
  {
    id: 'p6',
    userId: 'u6',
    user: u('u6'),
    text: 'New track is finally out! 🎵 "Midnight Frequencies" — a blend of jazz piano and electronic beats that I\'ve been working on for 8 months. Link in bio. Let me know what you think! #music #jazz #electronic',
    imageGradient: 'gradient-card-4',
    imageAlt: 'Music production',
    likes: 1423,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p6'),
    shares: 312,
    timestamp: '8h ago',
    hashtags: ['music', 'jazz', 'electronic'],
  },
  {
    id: 'p7',
    userId: 'u7',
    user: u('u7'),
    text: 'Redesigned the onboarding flow for a fintech app and reduced drop-off by 40%! 📊 The key insight: users don\'t want to fill forms, they want to see value first. Thread on what we learned 👇 #uxdesign #design #fintech',
    likes: 734,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p7'),
    shares: 198,
    timestamp: '9h ago',
    hashtags: ['uxdesign', 'design', 'fintech'],
  },
  {
    id: 'p8',
    userId: 'u8',
    user: u('u8'),
    text: '"The best time to start was yesterday. The second best time is now." Working on chapter 12 of my novel and it\'s finally clicking. Sometimes you just have to write through the hard parts. ✍️ #writing #amwriting #novel',
    likes: 1089,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p8'),
    shares: 267,
    timestamp: '10h ago',
    hashtags: ['writing', 'amwriting', 'novel'],
  },
  {
    id: 'p9',
    userId: 'u9',
    user: u('u9'),
    text: 'The James Webb Space Telescope just captured this image of a galaxy 13.4 billion light-years away 🔭✨ We\'re literally looking back in time. The universe is 13.8 billion years old. Let that sink in. #space #astronomy #science',
    imageGradient: 'gradient-card-2',
    imageAlt: 'Galaxy image from James Webb',
    likes: 8934,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p9'),
    shares: 2341,
    timestamp: '11h ago',
    hashtags: ['space', 'astronomy', 'science'],
  },
  {
    id: 'p10',
    userId: 'u10',
    user: u('u10'),
    text: 'Truffle risotto with aged parmesan and a 24-hour stock 🍄 This dish took 3 days to prepare properly. Fine dining is about patience and respect for ingredients. Recipe in my new cookbook! #food #chef #risotto',
    imageGradient: 'gradient-card-5',
    imageAlt: 'Truffle risotto',
    likes: 4521,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p10'),
    shares: 876,
    timestamp: '12h ago',
    hashtags: ['food', 'chef', 'risotto'],
  },
  {
    id: 'p11',
    userId: 'u2',
    user: u('u2'),
    text: 'Tokyo at 3am hits different 🌃 The city never truly sleeps. Spent a week exploring hidden alleyways and tiny ramen shops. This city has my heart forever. #tokyo #japan #travel #nightphotography',
    imageGradient: 'gradient-card-4',
    imageAlt: 'Tokyo at night',
    likes: 5678,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p11'),
    shares: 1234,
    timestamp: '1d ago',
    hashtags: ['tokyo', 'japan', 'travel'],
  },
  {
    id: 'p12',
    userId: 'u1',
    user: u('u1'),
    text: 'Experimenting with abstract digital art this week 🎨 Using generative algorithms to create these gradient compositions. Each one is unique and unrepeatable. #digitalart #generativeart #abstract',
    imageGradient: 'gradient-card-1',
    imageAlt: 'Abstract digital art',
    likes: 2134,
    comments: MOCK_COMMENTS.filter(c => c.postId === 'p12'),
    shares: 456,
    timestamp: '1d ago',
    hashtags: ['digitalart', 'generativeart', 'abstract'],
  },
  {
    id: 'p13',
    userId: 'u5',
    user: u('u5'),
    text: 'Reminder: rest days are just as important as training days 🧘‍♀️ Your muscles grow during recovery, not during the workout. Listen to your body. #fitness #recovery #wellness #mindfulness',
    likes: 3456,
    comments: [],
    shares: 678,
    timestamp: '1d ago',
    hashtags: ['fitness', 'recovery', 'wellness'],
  },
  {
    id: 'p14',
    userId: 'u4',
    user: u('u4'),
    text: 'Hot take: TypeScript has made me a better JavaScript developer, not just a safer one. The discipline of thinking about types has fundamentally changed how I architect systems. Agree? #typescript #javascript #programming',
    likes: 1234,
    comments: [],
    shares: 345,
    timestamp: '2d ago',
    hashtags: ['typescript', 'javascript', 'programming'],
  },
  {
    id: 'p15',
    userId: 'u9',
    user: u('u9'),
    text: 'Did you know that neutron stars are so dense that a teaspoon of their material would weigh about 10 million tons? 🌟 And they spin up to 700 times per second. Physics is wild. #science #space #physics #facts',
    likes: 12456,
    comments: [],
    shares: 4567,
    timestamp: '2d ago',
    hashtags: ['science', 'space', 'physics'],
  },
];

export const STORIES: Story[] = [
  { id: 's1', userId: 'u1', user: u('u1'), seen: false },
  { id: 's2', userId: 'u2', user: u('u2'), seen: false },
  { id: 's3', userId: 'u5', user: u('u5'), seen: true },
  { id: 's4', userId: 'u10', user: u('u10'), seen: false },
  { id: 's5', userId: 'u7', user: u('u7'), seen: false },
  { id: 's6', userId: 'u9', user: u('u9'), seen: true },
  { id: 's7', userId: 'u3', user: u('u3'), seen: false },
  { id: 's8', userId: 'u6', user: u('u6'), seen: false },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    actorId: 'u2',
    actor: u('u2'),
    message: 'liked your photo',
    postId: 'p1',
    timestamp: '2m ago',
    read: false,
  },
  {
    id: 'n2',
    type: 'follow',
    actorId: 'u5',
    actor: u('u5'),
    message: 'started following you',
    timestamp: '15m ago',
    read: false,
  },
  {
    id: 'n3',
    type: 'comment',
    actorId: 'u7',
    actor: u('u7'),
    message: 'commented: "The composition here is chef\'s kiss 👌"',
    postId: 'p1',
    timestamp: '45m ago',
    read: false,
  },
  {
    id: 'n4',
    type: 'like',
    actorId: 'u10',
    actor: u('u10'),
    message: 'liked your post',
    postId: 'p12',
    timestamp: '1h ago',
    read: false,
  },
  {
    id: 'n5',
    type: 'follow',
    actorId: 'u9',
    actor: u('u9'),
    message: 'started following you',
    timestamp: '2h ago',
    read: true,
  },
  {
    id: 'n6',
    type: 'mention',
    actorId: 'u4',
    actor: u('u4'),
    message: 'mentioned you in a comment',
    postId: 'p4',
    timestamp: '3h ago',
    read: true,
  },
  {
    id: 'n7',
    type: 'like',
    actorId: 'u3',
    actor: u('u3'),
    message: 'liked your photo',
    postId: 'p1',
    timestamp: '4h ago',
    read: true,
  },
  {
    id: 'n8',
    type: 'comment',
    actorId: 'u8',
    actor: u('u8'),
    message: 'commented: "This is incredible work!"',
    postId: 'p12',
    timestamp: '5h ago',
    read: true,
  },
  {
    id: 'n9',
    type: 'follow',
    actorId: 'u6',
    actor: u('u6'),
    message: 'started following you',
    timestamp: '6h ago',
    read: true,
  },
  {
    id: 'n10',
    type: 'like',
    actorId: 'u1',
    actor: u('u1'),
    message: 'liked your post',
    postId: 'p5',
    timestamp: '8h ago',
    read: true,
  },
];

export const TRENDING_HASHTAGS: TrendingHashtag[] = [
  { id: 't1', tag: 'photography', postCount: 284500, category: 'Art' },
  { id: 't2', tag: 'travel', postCount: 512300, category: 'Lifestyle' },
  { id: 't3', tag: 'webdev', postCount: 98700, category: 'Technology' },
  { id: 't4', tag: 'fitness', postCount: 345600, category: 'Health' },
  { id: 't5', tag: 'foodie', postCount: 423100, category: 'Food' },
  { id: 't6', tag: 'science', postCount: 187400, category: 'Education' },
  { id: 't7', tag: 'music', postCount: 267800, category: 'Entertainment' },
  { id: 't8', tag: 'uxdesign', postCount: 76500, category: 'Design' },
  { id: 't9', tag: 'opensource', postCount: 54300, category: 'Technology' },
  { id: 't10', tag: 'space', postCount: 312400, category: 'Science' },
];

export function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

// Current logged-in user (mock)
export const CURRENT_USER: User = MOCK_USERS[0];
