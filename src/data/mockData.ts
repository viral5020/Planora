import type { EventItem, CommunityItem, PersonItem, GuestRequest, ChatMessage, NotificationItem } from '../types';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'midnight-vinyl',
    title: 'Midnight Vinyl & Tapas Social',
    subtitle: 'Rooftop Acoustic Sessions & Tapas',
    category: 'Music & Nightlife',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    date: 'Saturday, Oct 21',
    time: '8:00 PM - 1:00 AM',
    venue: 'Skyline Terrace Lounge, 7th Floor, Vesu, Surat',
    city: 'Surat',
    price: 499,
    totalCapacity: 45,
    attendingCount: 37,
    host: {
      name: 'Aakash Verma',
      handle: '@aakash_music',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      badge: 'Super Host & Vinyl Collector'
    },
    vibeDescription: 'A relaxed rooftop soiree for vinyl lovers, audiophiles, and tapas cravers. Featuring analog rotary mixer sets, imported Spanish small bites, and panoramic terrace views over the Surat skyline.',
    vibeTags: ['Analog Vinyl', 'Spanish Tapas', 'Terrace Views', 'Craft Beverages', 'Strict 21+'],
    rules: [
      'Age restriction: 21+ (ID checked at entry)',
      'Zero tolerance for harassment or disruptive behavior',
      'Smart casual / evening aesthetic dress code'
    ],
    status: 'none',
    isCurated: true,
    hasHostApproval: true
  },
  {
    id: 'rooftop-sunset-beats',
    title: 'Rooftop Social & Sunset Beats',
    subtitle: 'Golden hour deep house and curated cocktails',
    category: 'Nightlife & Clubs',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    date: 'Tonight',
    time: '6:30 PM - 11:30 PM',
    venue: 'Amber Rooftop Lounge, Dumas Road, Surat',
    city: 'Surat',
    price: 350,
    totalCapacity: 50,
    attendingCount: 42,
    host: {
      name: 'Rohan K.',
      handle: '@rohan_beats',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      badge: 'Curator'
    },
    vibeDescription: 'Sunset acoustic rhythms transitioning into melodic deep house. Unwind after work with curated cocktails and fellow music explorers.',
    vibeTags: ['Sunset Vibe', 'Deep House', 'Cocktails'],
    rules: ['Casual chic', 'Pre-registration mandatory'],
    status: 'approved',
    isCurated: true,
    hasHostApproval: true
  },
  {
    id: 'badminton-doubles',
    title: 'Weekend Badminton Doubles (Intermediates)',
    subtitle: 'Fast-paced friendly matches & post-game smoothies',
    category: 'Sports & Turf',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80',
    date: 'Sunday, Oct 22',
    time: '7:00 AM - 9:30 AM',
    venue: 'Smash Arena, Adajan, Surat',
    city: 'Surat',
    price: 150,
    totalCapacity: 16,
    attendingCount: 14,
    host: {
      name: 'Kavit Mehta',
      handle: '@kavit_sports',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      badge: 'Sports Anchor'
    },
    vibeDescription: 'Competitive yet welcoming badminton doubles. High energy, warmups included, followed by fresh fruit smoothies nearby.',
    vibeTags: ['Badminton', 'Fitness', 'Sunday Morning'],
    rules: ['Non-marking shoes mandatory', 'Bring your own racquet'],
    status: 'none',
    isCurated: false,
    hasHostApproval: false
  },
  {
    id: 'coffee-crawl',
    title: 'Sunday Specialty Coffee Crawl',
    subtitle: 'Exploring 3 artisanal roasters in Surat',
    category: 'Coffee & Cafes',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    date: 'Sunday, Oct 22',
    time: '10:00 AM - 1:00 PM',
    venue: 'Meeting at The Bean Lab, Piplod, Surat',
    city: 'Surat',
    price: 250,
    totalCapacity: 12,
    attendingCount: 12,
    host: {
      name: 'Tanya Patel',
      handle: '@tanya_brews',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      badge: 'Coffee Sommelier'
    },
    vibeDescription: 'Tasting pour-overs, cold drips, and single-origin aeropress brews across Surat with passionate baristas.',
    vibeTags: ['Specialty Coffee', 'Pour Over', 'Conversations'],
    rules: ['Arrive on time for brewing sessions'],
    status: 'none',
    isCurated: true,
    hasHostApproval: true
  }
];

export const INITIAL_COMMUNITIES: CommunityItem[] = [
  {
    id: 'surat-vinyl',
    name: 'Surat Vinyl & Indie Music Circle',
    category: 'Music & Arts',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80',
    membersCount: 438,
    gatheringsCount: 18,
    rating: 4.9,
    description: 'Surat’s home for vinyl collectors, analog audio enthusiasts, and indie music seekers. We host bi-weekly rooftop listening sessions, record swaps, and intimate live acoustic sets.',
    tags: ['#VinylCommunity', '#IndieMusic', '#HiFiAudio', '#ListeningSessions'],
    upcomingEvents: ['Midnight Vinyl & Tapas Social', 'D-Groves & Ambient Lounge'],
    members: [
      { name: 'Aarav M.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', role: 'Host' },
      { name: 'Devika S.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80' },
      { name: 'Kavit P.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
      { name: 'Tanya P.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'foodies-surat',
    name: 'Foodies of Surat & Late Night Cravers',
    category: 'Food & Rooftops',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    membersCount: 890,
    gatheringsCount: 42,
    rating: 4.8,
    description: 'Exploring hidden street food gems, legendary midnight locho spots, rooftop dining, and culinary experiments across the city.',
    tags: ['#SuratStreetFood', '#MidnightEats', '#FoodLovers'],
    upcomingEvents: ['Midnight Street Food Crawl - Zampa Bazaar'],
    members: [
      { name: 'Nikhil C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
      { name: 'Pooja S.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'surat-turf',
    name: 'Surat Turf Football & Sports League',
    category: 'Sports & Turf',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    membersCount: 312,
    gatheringsCount: 35,
    rating: 4.9,
    description: '5v5 and 7v7 turf matches under floodlights every Tuesday and Thursday evening. Friendly, competitive, and welcoming to all skill levels.',
    tags: ['#TurfFootball', '#SuratSports', '#UnderTheLights'],
    upcomingEvents: ['Thursday Night Floodlight 7v7'],
    members: [
      { name: 'Arjun P.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80' }
    ]
  },
  {
    id: 'specialty-brews',
    name: 'Specialty Brews & Filter Coffee Club',
    category: 'Coffee & Cafes',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    membersCount: 260,
    gatheringsCount: 14,
    rating: 4.95,
    description: 'Home baristas, specialty bean cuppings, manual brew gear explorations, and cafe hops.',
    tags: ['#CoffeeCulture', '#V60', '#AeroPress'],
    upcomingEvents: ['Espresso & Manual Brew Masterclass'],
    members: []
  },
  {
    id: 'surat-founders',
    name: 'Surat Founders & Creative Tech Salon',
    category: 'Tech & Networking',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    membersCount: 520,
    gatheringsCount: 22,
    rating: 4.85,
    description: 'Unfiltered, casual roundtable discussions on building software, design, and hardware in Surat.',
    tags: ['#TechFounders', '#ProductDesign', '#SuratStartups'],
    upcomingEvents: ['Demo Night & Rooftop Mixer'],
    members: []
  }
];

export const INITIAL_PEOPLE: PersonItem[] = [
  {
    id: 'devika-shah',
    name: 'Devika Shah',
    age: 24,
    profession: 'Architect & Interior Designer',
    bio: 'Obsessed with brutalist architecture, indie vinyl records, and finding the quietest coffee corners in Surat.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    vibeMatch: 94,
    interests: ['Analog Vinyl', 'Art & Design', 'Coffee & Cafes', 'House Parties'],
    location: 'Vesu, Surat'
  },
  {
    id: 'arjun-parekh',
    name: 'Arjun Parekh',
    age: 26,
    profession: 'AI Engineer & Footballer',
    bio: 'Coding neural nets by day, running down turf flanks at night. Looking for weekend jam partners.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    vibeMatch: 89,
    interests: ['Sports & Turf', 'Tech & Startups', 'Nightlife', 'Live Music'],
    location: 'Adajan, Surat'
  },
  {
    id: 'meera-joshi',
    name: 'Meera Joshi',
    age: 23,
    profession: 'Illustrator & Ceramic Artist',
    bio: 'Sketching life around Tapi river promenade. Always up for art gallery walks and thrift hunting.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    vibeMatch: 86,
    interests: ['Art Walks', 'Coffee & Cafes', 'Vintage & Thrifting'],
    location: 'Ghod Dod Road, Surat'
  }
];

export const INITIAL_GUEST_REQUESTS: GuestRequest[] = [
  {
    id: 'guest-1',
    name: 'Devika Shah',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    profession: 'Architect • 3 mutuals',
    timeAgo: '12m ago',
    mutualCount: 3,
    note: 'Hey! Huge fan of 70s Japanese jazz fusion & vinyl. Would love to join tonight!',
    status: 'pending'
  },
  {
    id: 'guest-2',
    name: 'Kavit Mehta',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    profession: 'Product Lead @ Zerodha • 5 mutuals',
    timeAgo: '45m ago',
    mutualCount: 5,
    note: 'Bringing along my rare 1981 Casiopea LP if you have a turntable slot open!',
    status: 'pending'
  },
  {
    id: 'guest-3',
    name: 'Tanya Patel',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    profession: 'Coffee Roaster & Curator • 2 mutuals',
    timeAgo: '1h ago',
    mutualCount: 2,
    note: 'Looking forward to meeting other music heads in Vesu.',
    status: 'pending'
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Aakash Verma',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: 'Welcome everyone to Midnight Vinyl & Tapas! Rotary mixer is warmed up and tonight’s chef tapas specials are looking incredible.',
    timestamp: '7:15 PM',
    isHost: true
  },
  {
    id: 'msg-2',
    senderName: 'Vatsal Patel',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    text: 'Skyline Terrace looks insane tonight! Any parking spots left in the basement?',
    timestamp: '7:28 PM'
  },
  {
    id: 'msg-3',
    senderName: 'Aakash Verma',
    senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    text: 'Yes! Basement levels B1 and B2 have dedicated valet for Planora guests. Just flash your RSVP QR code at the gate.',
    timestamp: '7:30 PM',
    isHost: true
  },
  {
    id: 'msg-4',
    senderName: 'Ishan K.',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    text: 'Just walked in, the sound system calibration is perfection. Grabbed a spot by the terrace bar.',
    timestamp: '7:42 PM'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'approval',
    title: 'Host approved your request!',
    description: 'Aakash approved your RSVP for Midnight Vinyl & Tapas Social. Your guest pass is ready.',
    timeAgo: '10m ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    read: false,
    actionScreen: 'my_events'
  },
  {
    id: 'notif-2',
    type: 'invite',
    title: 'Devika invited you to a gathering',
    description: 'Sunday Specialty Coffee Crawl at The Bean Lab, Piplod.',
    timeAgo: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    read: false,
    actionScreen: 'event_detail'
  },
  {
    id: 'notif-3',
    type: 'community',
    title: 'Surat Vinyl Circle posted an update',
    description: 'New vinyl lineup announced for next Saturday rooftop session.',
    timeAgo: '1d ago',
    avatar: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=200&q=80',
    read: true,
    actionScreen: 'community_detail'
  }
];
