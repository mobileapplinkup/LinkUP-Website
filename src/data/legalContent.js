// Synced from the LinkUp Flutter app:
// C:\Users\casas\Desktop\voiceroom\lib\screens\profile\settings\legal_documents_screen.dart
import { APP } from './linkupData.js';

export const LEGAL_META = {
  company: 'LinkUp',
  website: APP.websiteUrl,
  effectiveDate: 'November 15, 2026',
  minAge: 18,
};

export const LEGAL_DOCS = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    sections: [
      {
        h: 'LinkUp Privacy Policy',
        p: [
          `Effective Date: ${LEGAL_META.effectiveDate}\nWebsite: ${LEGAL_META.website}\nSupport Email: ${APP.supportEmail}`,
          'LinkUp ("we", "us", or "our") is located and operated within the United States. We respect your privacy and are committed to transparent data practices. This Privacy Policy explains how we collect, use, store, and share your information when you use the LinkUp mobile application, website (linkupmobile.xyz), and related services (the "Services").',
        ],
      },
      {
        h: '1. Information We Collect',
        p: ['We collect information necessary to provide language exchange, Voice Rooms, Live Streams, Moments, Shorts, Connect, and messaging features:'],
        list: [
          'Account & Profile Information: Username (@handle), display name, email address, date of birth, gender, native/known languages, learning languages, bio, profile photos, and optional profile attributes (zodiac, blood type, hobbies).',
          'User Content & Communications: Messages, voice notes, photos, videos, Moments, Shorts, comments, gifts, and user reports (including screenshot/video proof submitted for moderation).',
          'Device & Security Identifier: A unique device identifier used solely to enforce our One Device, One Account safety policy, prevent ban evasion, and protect accounts against unauthorized access.',
          'Location Information (Optional): When you enable Location Services, we detect your approximate city, region, country, and local time zone to power cultural exchange and Connect discovery. You can disable location sharing at any time in Settings.',
          'Age Verification Data: When verifying 18+ eligibility, our verification partner processes your ID document and selfie liveness check; LinkUp receives the verification decision and verified date of birth.',
        ],
      },
      {
        h: '2. Companies Whose SDKs and APIs We Use',
        p: ['To deliver real-time voice/video communication, cloud infrastructure, AI translation, age verification, and payments, LinkUp integrates SDKs and APIs provided by the following companies:'],
        list: [
          'Google LLC — Firebase Platform (Authentication, Cloud Firestore, Cloud Functions, Cloud Storage, Firebase Cloud Messaging, Firebase App Check): Provides secure user authentication, real-time database storage, serverless backend logic, media hosting, push notifications, and app attestation.',
          'Google LLC — Google Sign-In SDK & Google Play In-App Billing API: Enables optional one-tap sign-in with your Google account and processes token and VIP subscription purchases on Android devices.',
          'Apple Inc. — Sign in with Apple SDK & Apple StoreKit / In-App Purchase API: Enables optional sign-in with your Apple ID and processes token and VIP subscription purchases on iOS devices.',
          'Google LLC — Google Cloud Vertex AI (Gemini API): Powers on-demand message translation, Moment/Short post translation, voice message transcription, and AI live room caption translation.',
          'Agora, Inc. — Agora RTC Engine SDK & Agora Real-Time Speech-to-Text (STT) API: Powers real-time audio in Voice Rooms, live video/audio streaming in Live Stream Rooms, 1-on-1 voice and video calls in Direct Messages, and live speech transcription captions.',
          'Stripe, Inc. — Stripe API & Stripe Connect: Processes creator payout onboarding, KYC verification for withdrawals, and bank payouts when redeeming earned Diamonds.',
          'Veriff OÜ — Veriff Identity & Age Verification API: Conducts secure 18+ government ID and biometric age verification for age-restricted features.',
          'Frankfurter / European Central Bank (ECB) Exchange Rate API (api.frankfurter.app): Provides public foreign currency exchange rates so store prices can be previewed in your local currency.',
        ],
      },
      {
        h: '3. How We Use Your Information',
        p: ['We use the information we collect for the following purposes:'],
        list: [
          'To operate, maintain, and personalize your language exchange, Voice Room, Live Stream, Moments, Shorts, and Connect experience.',
          'To process virtual currency transactions, gifts, unlocks, subscriptions, and creator payouts.',
          'To provide AI translations and transcriptions when requested by you.',
          'To review user reports (including screenshot and video evidence), enforce our Terms of Service, and protect users against harassment, child exploitation, stalking, and threats.',
        ],
      },
      {
        h: '4. Data Sharing & Disclosure',
        p: ['We do not sell your personal information to third parties. We share data only with the service providers listed in Section 2 to operate the Services, when required by United States law or valid legal process, or when necessary to prevent imminent physical harm or child exploitation.'],
      },
      {
        h: '5. Data Retention, Account Deletion & Your Privacy Rights',
        p: [
          'You can control your profile visibility (including hiding your country, city, age, online status, local time, visits, and gifting level) directly within Settings > Privacy.',
          'You may permanently delete your account at any time in Settings > Account > Delete Account. Upon account deletion, your public profile, posts, and personal data are removed from active display, except where retention is required for fraud prevention, device ban enforcement, financial audit records, or legal compliance.',
        ],
      },
      {
        h: '6. Location & Contact Information',
        p: [
          'LinkUp is located within the United States.',
          `If you have any questions, privacy requests, or concerns regarding this Privacy Policy or our data practices, please visit ${LEGAL_META.website} or email us at ${APP.supportEmail}.`,
        ],
      },
    ],
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    sections: [
      {
        h: 'LinkUp Terms of Service',
        p: [
          `Effective Date: ${LEGAL_META.effectiveDate}\nWebsite: ${LEGAL_META.website}\nSupport Email: ${APP.supportEmail}`,
          'Welcome to LinkUp! These Terms of Service ("Terms") govern your access to and use of the LinkUp mobile application, website (linkupmobile.xyz), and related language exchange, social networking, Voice Room, Live Stream, Moments, Shorts, Connect, and messaging services (collectively, the "Services") operated by LinkUp ("we", "us", or "our") within the United States.',
          'By creating an account, accessing, or using LinkUp, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use the Services.',
        ],
      },
      {
        h: '1. Eligibility & Account Registration',
        p: [
          `LinkUp is a global language learning, cultural exchange, and social community designed for adults. You must be at least ${LEGAL_META.minAge} years of age to create an account or use LinkUp. Certain features (such as the Connect / Matchmaking section) require completed 18+ identity verification.`,
          'To maintain community integrity and prevent ban evasion, LinkUp enforces a strict One Device, One Account policy. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.',
        ],
      },
      {
        h: '2. Freedom of Speech & Open Expression',
        p: [
          'Users on LinkUp have freedom of speech. We believe that authentic language practice, cultural exchange, and meaningful global connection thrive when users are free to express their thoughts, ideas, viewpoints, and beliefs openly across Voice Rooms, Live Streams, Moments, Shorts, and Direct Messages.',
          'LinkUp does not censor lawful personal opinions, political or cultural discussions, or respectful debate. However, freedom of speech does not protect targeted abuse, unlawful conduct, or severe safety violations described in Section 3 below.',
        ],
      },
      {
        h: '3. Prohibited Conduct & Permanent Account Deletion',
        p: ['While we uphold freedom of speech, we are committed to protecting our users from real harm. We reserve the right to suspend (including 3-day or 7-day bans) or permanently delete a user\'s account immediately and without refund if we determine that the user is engaging in any of the following:'],
        list: [
          'Harassment: Harassing, bullying, or engaging in targeted, malicious abuse against other users.',
          'Child Exploitation (Zero Tolerance): Any form of child sexual exploitation and abuse (CSAE), child sexual abuse material (CSAM), grooming, or any conduct that endangers minors.',
          'Stalking: Stalking, cyberstalking, non-consensual tracking, doxxing, or persistent unwanted contact with another user.',
          'Threats & Violence: Making threats of violence, physical harm, death, extortion, or intimidation against any person or group.',
          'Fraud, Scams & Impersonation: Deceiving users for financial gain, phishing, or impersonating another individual or LinkUp staff.',
        ],
      },
      {
        h: '4. User Reporting & Mandatory Proof Requirement',
        p: [
          'To protect users from false accusations and ensure fair, accurate moderation, users must provide screenshot or video recording proof when reporting a user on the platform for us to review.',
          'When submitting a report in the app, you are required to provide a clear report title, a detailed description of the ongoing issue, and uploaded photo (screenshot) or video recording evidence. Our Admin and Support team reviews submitted reports and evidence and may issue a 3-day ban, a 7-day ban (accompanied by an official Direct Message explaining the offense), permanently delete the offending account, or dismiss the report if the evidence does not substantiate a violation.',
        ],
      },
      {
        h: '5. User Content, Voice Rooms, Live Streams, Moments & Shorts',
        p: [
          'You retain ownership of the text, photos, videos, audio recordings, Moments, Shorts, and live broadcasts ("User Content") you post or stream on LinkUp. By posting or streaming User Content, you grant LinkUp a worldwide, non-exclusive, royalty-free license to host, store, transcode, display, translate, and distribute your User Content solely for operating and improving the Services.',
          'LinkUp provides optional Pay-to-Unlock media features in Direct Messages and Moments. You represent and warrant that you hold all necessary rights to any media you upload and that it complies with Section 3 of these Terms.',
        ],
      },
      {
        h: '6. Virtual Currency (LINK Tokens & Diamonds), VIP & Subscriptions',
        p: ['LinkUp offers virtual items including LINK Tokens, virtual Gifts, Entrance Effects, Avatar Frames, Chat Bubbles, Boosts, and VIP / VIP-X memberships.'],
        list: [
          'LINK Tokens & Virtual Items: LINK Tokens are a limited, non-transferable license to use virtual features within LinkUp. All purchases of LINK Tokens and virtual items through the Apple App Store or Google Play Store are final and non-refundable, except as required by applicable law.',
          'VIP & VIP-X Subscriptions: Recurring subscriptions automatically renew through your Apple App Store or Google Play Store account unless canceled at least 24 hours before the end of the current billing period.',
          'Creator Diamonds & Payouts: Eligible users who receive virtual gifts earn Diamonds, which may be converted to LINK Tokens or withdrawn via Stripe Connect subject to identity verification, minimum withdrawal thresholds, and compliance with these Terms. Accounts terminated for violations of Section 3 forfeit any unwithdrawn balances.',
        ],
      },
      {
        h: '7. Disclaimers & Limitation of Liability',
        p: ['THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE MAXIMUM EXTENT PERMITTED BY UNITED STATES LAW, LINKUP SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR GOODWILL ARISING OUT OF USER INTERACTIONS OR YOUR USE OF THE SERVICES.'],
      },
      {
        h: '8. Governing Law & Contact Us',
        p: [
          'These Terms are governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.',
          `If you have any questions about these Terms of Service, please visit our website at ${LEGAL_META.website} or contact us at ${APP.supportEmail}.`,
        ],
      },
    ],
  },
  {
    id: 'safety',
    title: 'Community & Safety',
    sections: [
      { h: 'Our standard', p: ['LinkUp is for meeting people across languages and cultures. Treat everyone with respect, on stage, in chat, and in your posts.'] },
      {
        h: 'Not allowed',
        list: [
          'Anyone under the minimum age, or any content that sexualizes minors. We report child sexual abuse material to the authorities.',
          'Harassment, hate speech, threats, or bullying.',
          'Nudity or sexual content in rooms, Moments, or profile photos.',
          'Scams, fraud, selling tokens or accounts, or asking for money outside LinkUp.',
          'Impersonation or fake profiles.',
          'Violence, self-harm promotion, or illegal activity.',
        ],
      },
      { h: 'Age verification', p: ['LinkUp uses Veriff to verify age and identity for features such as creator payouts. Verified members can show an age verification badge.'] },
      { h: 'Tools that protect you', list: ['Report and block any user from their profile, a room, or a chat.', 'Block Unknown Chat (VIP) makes strangers send a gift before they can message you.', 'Room hosts and moderators can mute, remove, and manage people in their rooms.', 'Hide your visits (VIP) so others do not see that you viewed their profile.'] },
      { h: 'Reporting', p: [`Use the in-app report button, or go to Profile → Settings → Help & Support. For urgent safety concerns, contact ${APP.supportEmail}. If someone is in immediate danger, contact local emergency services.`] },
    ],
  },
  {
    id: 'support',
    title: 'Support & Account Deletion',
    sections: [
      { h: 'Get help', p: ['In the app, go to Profile → Settings → Help & Support to send a ticket. Our team replies in the app.', `You can also email ${APP.supportEmail}.`] },
      {
        h: 'Delete your account',
        list: [
          'Open LinkUp and go to Profile → Settings → Help & Support.',
          'Send a ticket titled "Delete my account" from the account you want deleted.',
          `Can't sign in? Email ${APP.supportEmail} from the address on your account and include your @username.`,
        ],
      },
      { h: 'What gets deleted', p: ['Your profile, photos, posts, Shorts, and messages are deleted. Unused tokens, unclaimed diamonds, and active subscriptions are lost and cannot be refunded, so cancel subscriptions in the App Store or Google Play first. Some records may be kept as described in the Privacy Policy.'] },
      { h: 'Purchases and refunds', p: ['Tokens and subscriptions are bought through Apple or Google. To ask for a refund, use Apple\'s "Report a Problem" page or Google Play\'s order history.'] },
      { h: 'Restore purchases', p: ['If a purchase is missing, open the VIP or token store in the app and tap "Restore purchases".'] },
    ],
  },
];
