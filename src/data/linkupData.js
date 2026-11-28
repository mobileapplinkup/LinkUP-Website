// Product data mirrored from the LinkUp Flutter app (C:\Users\casas\Desktop\voiceroom).
// Source files are noted per section — keep these in sync when the app changes.
// The server (functions/src/catalog) is authoritative; these values are for display.

// lib/config/constants.dart
export const APP = {
  name: 'LinkUp',
  tagline: 'Talk. Stream. Meet. Belong.',
  androidPackage: 'com.linkup.linkup',
  websiteUrl: 'https://linkupmobile.xyz',
  // TODO: replace with the real store listing URLs once published.
  appStoreUrl: '#download',
  playStoreUrl: '#download',
  // Upload C:\Users\casas\Desktop\voiceroom\build\app\outputs\flutter-apk\app-release.apk
  // to Firebase Storage (bucket: linkup-8394d.firebasestorage.app) at releases/linkup-latest.apk
  // and ensure public read access (or append the Firebase Console download &token=...).
  apkUrl:
    'https://firebasestorage.googleapis.com/v0/b/linkup-8394d.firebasestorage.app/o/releases%2Flinkup-latest.apk?alt=media',
  apkFilename: 'LinkUp-latest.apk',
  supportEmail: 'support@linkupmobile.xyz',
};

export const STATS = [
  { value: '19', label: 'Profile languages' },
  { value: '10', label: 'Seats per room stage' },
];

// lib/config/constants.dart → roomTopics
export const ROOM_TOPICS = [
  'Language Exchange', 'Music', 'Gaming', 'Education', 'Culture',
  'Casual Chat', 'Reading Plan', 'Debate', 'Storytelling', 'Trivia',
];

// lib/config/constants.dart → datingLanguages
export const LANGUAGES = [
  'English', 'Japanese', 'Spanish', 'French', 'German', 'Korean',
  'Chinese (Simplified)', 'Chinese (Traditional)', 'Portuguese', 'Arabic',
  'Russian', 'Italian', 'Hindi', 'Thai', 'Vietnamese', 'Turkish',
  'Indonesian', 'Dutch', 'Swedish',
];

export const LOOKING_FOR = ['Friendship', 'Casual', 'Long-term', 'Marriage'];

// lib/screens/main_shell.dart — the 5 bottom-nav tabs
export const APP_TABS = [
  {
    id: 'rooms',
    title: 'Voice & Live Rooms',
    short: 'Rooms',
    blurb: 'Host or join live voice and video rooms with 2 host seats and 8 guest seats. Pick a topic, go on stage, and get discovered.',
    points: [
      '2 host + 8 guest seats on every stage',
      'Voice and Live (video) room types',
      'AI live captions while people speak',
      'Room Boosts to reach more listeners',
      'Floating mini-window on Android',
      'Moderator tools, room levels, and room menus',
    ],
  },
  {
    id: 'connect',
    title: 'Connect & Matchmaking',
    short: 'Connect',
    blurb: 'Find language partners and new friends worldwide. Profiles show native and learning languages, fluency, interests, and personality.',
    points: [
      '19 languages with 1–5 fluency levels',
      'MBTI, zodiac, blood type, and occupation',
      'Places visited and places you want to visit',
      'Filters: Serious Learners, Nearby, City, Gender',
      'Looking for friendship, casual, long-term, or marriage',
      'Matching that uses your whole profile',
    ],
  },
  {
    id: 'moments',
    title: 'Moments & Shorts',
    short: 'Moments',
    blurb: 'Share photos, thoughts, and short videos. Scroll the For You feed, follow people you like, and send gifts on posts.',
    points: [
      'For You and Following feeds',
      'Vertical Shorts video player',
      'Pay-to-unlock posts (VIP)',
      'Gifts and comments on posts',
    ],
  },
  {
    id: 'messages',
    title: 'Messages & AI Translation',
    short: 'Messages',
    blurb: 'Chat with anyone in any language. Messages translate right in the chat, and you control who can reach you.',
    points: [
      'AI translation in your chats',
      'Self-destructing messages (VIP)',
      'Block Unknown Chat: strangers send a gift first',
      'Group chats and public groups',
      'Room invites shared in chat',
    ],
  },
  {
    id: 'profile',
    title: 'Profile & Effects',
    short: 'Profile',
    blurb: 'Make your profile stand out with animated avatar frames, entrance effects, chat bubbles, and a gift wall.',
    points: [
      'Animated avatar frames and entrance effects',
      'Custom chat bubbles',
      'Backpack inventory and gift wall',
      'Gift level and room level badges',
      'See who visited your profile (VIP)',
    ],
  },
];

// lib/models/currency.dart
export const DIAMOND_RATES = {
  free: 0.10,
  vip: 0.15,
  moderatorBonus: 0.025,
  spendBonus: 0.10,
  spendBonusThresholdUsd: 500,
};

// lib/models/store_products.dart → tokenPackages
export const TOKEN_PACKAGES = [
  { usd: 1, tokens: 50 },
  { usd: 5, tokens: 250 },
  { usd: 10, tokens: 505 },
  { usd: 25, tokens: 1300 },
  { usd: 50, tokens: 2750 },
  { usd: 100, tokens: 6000 },
];

// functions/src/catalog/products.js → WEB_TOKEN_PACKAGES (+10% web bonus via Stripe Checkout)
export const WEB_TOKEN_PACKAGES = [
  { id: 'linkup_web_tokens_55', usd: 1, tokens: 55, inAppTokens: 50 },
  { id: 'linkup_web_tokens_275', usd: 5, tokens: 275, inAppTokens: 250 },
  { id: 'linkup_web_tokens_556', usd: 10, tokens: 556, inAppTokens: 505 },
  { id: 'linkup_web_tokens_1430', usd: 25, tokens: 1430, inAppTokens: 1300 },
  { id: 'linkup_web_tokens_3025', usd: 50, tokens: 3025, inAppTokens: 2750 },
  { id: 'linkup_web_tokens_6600', usd: 100, tokens: 6600, inAppTokens: 6000 },
];

// lib/models/gift_subscription.dart → GiftPassData._planMeta
export const GIFT_PASSES = [
  { name: '7-Day Gift Pass', tier: 'Basic', days: 7, usd: 1, value: '150%+ Value' },
  { name: '7-Day Gift Pass', tier: 'Premium', days: 7, usd: 10, value: '300%+ Value' },
  { name: '30-Day Gift Pass', tier: 'Basic', days: 30, usd: 25, value: '200%+ Value' },
  { name: '30-Day Gift Pass', tier: 'Premium', days: 30, usd: 50, value: '400%+ Value' },
];

// lib/models/goodie_bag.dart → GoodieBagData.seasons (150 / 750 / 1550 tokens)
export const GOODIE_BAGS = [
  {
    season: 'World Flowers',
    image: null,
    tiers: [
      { emoji: '🌸', name: 'Cherry Blossom Bag', tokens: 150, people: 4 },
      { emoji: '🌹', name: 'Rose Garden Bag', tokens: 750, people: 12 },
      { emoji: '🏵️', name: 'Exotic Bloom Bag', tokens: 1550, people: 25 },
    ],
  },
  {
    season: 'Cocktail',
    tiers: [
      { emoji: '🍹', name: 'Tropical Mix Bag', tokens: 150, people: 4 },
      { emoji: '🍸', name: 'Martini Bag', tokens: 750, people: 12 },
      { emoji: '🥃', name: 'Premium Spirit Bag', tokens: 1550, people: 25 },
    ],
  },
  {
    season: 'Animal',
    tiers: [
      { emoji: '🐹', name: 'Hamster Bag', tokens: 150, people: 4 },
      { emoji: '🐶', name: 'Puppy Bag', tokens: 750, people: 12 },
      { emoji: '🦁', name: 'Royal Lion Bag', tokens: 1550, people: 25 },
    ],
  },
  {
    season: 'Delicious Food',
    tiers: [
      { emoji: '🍬', name: 'Sweet Treat Bag', tokens: 150, people: 4 },
      { emoji: '🎂', name: 'Cake Bag', tokens: 750, people: 12 },
      { emoji: '🍗', name: 'Grand Feast Bag', tokens: 1550, people: 25 },
    ],
  },
];

// lib/models/treasure_chest.dart
export const TREASURE_CHESTS = [
  { key: 'bronze', name: 'Bronze Chest', tokens: 3750, color: '#E0995A', rewards: ['🎈 Balloons', '🧁 Macaron', '🎸 Guitar', '🦋 Butterfly', '🌹 Rose', '🪙 100 LINK Tokens'] },
  { key: 'silver', name: 'Silver Chest', tokens: 8000, color: '#DDE3EA', rewards: ['👑 Crown', '🏰 Castle', '🚀 Rocket', '💫 Star Burst', '🎆 Fireworks', '🪙 300 LINK Tokens'] },
  { key: 'gold', name: 'Gold Chest', tokens: 15500, color: '#FFD86B', rewards: ['🐉 Dragon', '🦄 Unicorn', '🌈 Rainbow', '🎭 Masquerade', '💎 Diamond', '🪙 1,000 LINK Tokens'] },
];

// lib/models/levels.dart → GiftLevels
export const GIFT_LEVEL_TIERS = [
  { range: '1–9', name: 'Brown', file: 'gift_lv_1-9.png', colors: ['#9A6B4F', '#5E3A26'] },
  { range: '10–19', name: 'Bronze', file: 'gift_lv_10-19.png', colors: ['#E0995A', '#9C5B2A'] },
  { range: '20–29', name: 'Silver', file: 'gift_lv_20-29.png', colors: ['#DDE3EA', '#8B96A5'] },
  { range: '30–39', name: 'Gold', file: 'gift_lv_30-39.png', colors: ['#FFD86B', '#C98E1E'] },
  { range: '40–49', name: 'Platinum', file: 'gift_lv_40-49.png', colors: ['#E9F1F7', '#97B3C8'] },
  { range: '50–59', name: 'Purple', file: 'gift_lv_50-59.png', colors: ['#C084FC', '#7C3AED'] },
  { range: '60–69', name: 'Blue', file: 'gift_lv_60-69.png', colors: ['#60A5FA', '#1D4ED8'] },
  { range: '70–79', name: 'Green', file: 'gift_lv_70-79.png', colors: ['#4ADE80', '#15803D'] },
  { range: '80–89', name: 'Red', file: 'gift_lv_80-89.png', colors: ['#F87171', '#B91C1C'] },
  { range: '90–100', name: 'White', file: 'gift_lv_90-100.png', colors: ['#FFFFFF', '#D9DEE6'] },
];

// lib/models/levels.dart → RoomLevels (L30 = 13,000 hosting hours, exponent 2.5)
export const roomHoursForLevel = (level) => {
  if (level <= 1) return 0;
  const l = Math.min(level, 30);
  return Math.max(1, Math.round(13000 * Math.pow((l - 1) / 29, 2.5)));
};

// lib/models/connection.dart
export const LINK_TYPES = [
  {
    id: 'couple', label: 'Couple', emoji: '💕', color: '#FF3CAC', slots: 1,
    gifts: [
      { emoji: '🧸', name: 'Crystal Bear', tokens: 999 },
      { emoji: '🌹', name: 'Romantic Gift', tokens: 2999 },
      { emoji: '🏰', name: 'MyLove', tokens: 9999 },
    ],
  },
  {
    id: 'bestie', label: 'Bestie', emoji: '⭐', color: '#3B82F6', slots: 5,
    gifts: [
      { emoji: '😎', name: 'Cool Shades', tokens: 599 },
      { emoji: '🏍️', name: 'Cyber Racer', tokens: 1299 },
      { emoji: '🛥️', name: 'Golden Yacht', tokens: 5999 },
    ],
  },
  {
    id: 'family', label: 'Family', emoji: '🌿', color: '#22C55E', slots: 2,
    gifts: [
      { emoji: '🌳', name: 'Family Tree', tokens: 499 },
      { emoji: '👼', name: 'Guardian Angel', tokens: 1299 },
      { emoji: '👑', name: 'Heritage Crown', tokens: 5999 },
    ],
  },
];

export const LINK_LEVELS = [
  { level: 0, xp: 0, reward: 'Avatar Effect', typePrefixed: true, detail: 'Unlocked when your LINK is created' },
  { level: 1, xp: 2000, reward: 'LINK EXP Boost +0.25×', typePrefixed: false, detail: '1.25× LINK EXP for this connection' },
  { level: 2, xp: 8000, reward: 'Chat Bubble', typePrefixed: true, detail: 'Matching chat bubble unlocked' },
  { level: 3, xp: 22000, reward: 'LINK EXP Boost +0.25×', typePrefixed: false, detail: '1.50× LINK EXP for this connection' },
  { level: 4, xp: 50000, reward: 'Entry Effect', typePrefixed: true, detail: 'Custom room entrance effect unlocked' },
  { level: 5, xp: 105000, reward: 'LINK EXP Boost +0.25×', typePrefixed: false, detail: '1.75× LINK EXP for this connection' },
  { level: 6, xp: 200000, reward: 'Special Gift', typePrefixed: true, detail: 'Unlock Special Gift in Gift Shop' },
];

export const LINK_EXP_RULES = [
  { label: 'No daily XP cap', detail: 'Earn unlimited LINK EXP every day' },
  { label: 'Rooms together', detail: '1 base EXP per 10 min in Voice or Live rooms' },
  { label: 'Gifting partners', detail: '1 base EXP per 10 tokens gifted' },
  { label: 'Connection boosts', detail: '+0.25× at Lv. 1, 3 & 5 (up to 1.75×)' },
];

// lib/models/fanclub.dart
export const FANCLUB = {
  monthly: 50,
  yearly: 500,
  minRoomLevel: 5,
  levels: [
    { level: 1, xp: 0 },
    { level: 2, xp: 3000 },
    { level: 3, xp: 9000 },
    { level: 4, xp: 18000 },
    { level: 5, xp: 30000 },
  ],
  perks: [
    { emoji: '💌', name: 'Fan comment bubble' },
    { emoji: '👼', name: 'Exclusive gift rewards' },
    { emoji: '🏅', name: 'Exclusive fan badge' },
  ],
  tasks: [
    { emoji: '🎬', name: 'Stay 30 minutes in Room', xp: '+5 XP' },
    { emoji: '⏱️', name: 'Stay 1 hour in Room', xp: '+10 XP' },
    { emoji: '💬', name: 'Share Room as a Moments post', xp: '+5 XP' },
    { emoji: '👥', name: 'Successfully on stage', xp: '+15 XP' },
    { emoji: '🎁', name: 'Send an exclusive gift', xp: '+5 XP ∞' },
  ],
};

// lib/models/store_products.dart → vipPlans (in-app vs. 10% off web prices)
export const VIP_PRICES = {
  vip: {
    monthly: { inApp: 9.99, web: 8.99, webProductId: 'linkup_web_vip_monthly' },
    yearly: { inApp: 100, web: 90, webProductId: 'linkup_web_vip_yearly' },
    lifetime: { inApp: 250, web: 225, webProductId: 'linkup_web_vip_lifetime' },
  },
  vipX: {
    monthly: { inApp: 20, web: 18, webProductId: 'linkup_web_vipx_monthly' },
    yearly: { inApp: 200, web: 180, webProductId: 'linkup_web_vipx_yearly' },
    lifetime: { inApp: 500, web: 450, webProductId: 'linkup_web_vipx_lifetime' },
  },
};

// lib/services/vip_feature_service.dart — values: true | false | string
export const FEATURE_MATRIX = [
  { feature: 'AI translations', free: '5 / day', vip: 'Unlimited', vipx: 'Unlimited' },
  { feature: 'Voice & live room time', free: '2 hrs / day', vip: 'Unlimited', vipx: 'Unlimited' },
  { feature: 'Learning languages', free: '1', vip: '3', vipx: '3' },
  { feature: 'Room exposure', free: '1×', vip: '5×', vipx: '10×' },
  { feature: 'Diamonds earned on gifts', free: '10%', vip: 'Up to 60%', vipx: 'Up to 60%' },
  { feature: 'See profile visitors', free: false, vip: true, vipx: true },
  { feature: 'Hide your visits', free: false, vip: true, vipx: true },
  { feature: 'Filter by gender & location', free: false, vip: true, vipx: true },
  { feature: 'Double points days (1st & 15th)', free: false, vip: true, vipx: true },
  { feature: 'Custom chat backgrounds', free: false, vip: true, vipx: true },
  { feature: 'Premium gifts', free: false, vip: true, vipx: true },
  { feature: 'Send a gift with a message', free: false, vip: true, vipx: true },
  { feature: 'Pay-to-unlock posts', free: false, vip: true, vipx: true },
  { feature: 'Self-destructing messages', free: false, vip: true, vipx: true },
  { feature: 'Block Unknown Chat', free: false, vip: true, vipx: true },
  { feature: 'Creator payouts', free: false, vip: true, vipx: true },
  { feature: 'Ad-free', free: false, vip: true, vipx: true },
  { feature: 'AI live captions', free: false, vip: false, vipx: true },
  { feature: 'Save live stream media', free: false, vip: false, vipx: true },
  { feature: 'Matchmaking', free: false, vip: false, vipx: true },
  { feature: 'Message memory & chat sync', free: false, vip: false, vipx: true },
];

// lib/screens/connect/widgets/vip_x_upgrade_sheet.dart + vip_feature_service.dart
export const VIPX_EXTRAS = [
  'AI live captions in Voice & Live rooms',
  'Save live stream media',
  'Unlimited likes & connections',
  'View all photos & extended profiles',
  'Advanced matching & age verification badge',
  'Message memory & chat sync',
  'Priority support',
];
