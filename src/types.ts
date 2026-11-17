export const PLANORA_VERSION = '1.0.0';

export type ScreenId =
  | 'splash'
  | 'landing'
  | 'auth_phone'
  | 'onboarding_interests'
  | 'onboarding_location'
  | 'home'
  | 'event_detail'
  | 'people'
  | 'communities'
  | 'community_detail'
  | 'create_step1_type'
  | 'create_step2_details'
  | 'create_step3_curate'
  | 'create_step4_success'
  | 'host_management'
  | 'inbox'
  | 'event_chat'
  | 'notifications'
  | 'my_events'
  | 'profile'
  | 'settings_safety'
  | 'become_host'
  | 'host_login'
  | 'admin_login'
  | 'admin';

export type EventVerificationStatus = 'pending' | 'approved' | 'rejected';
export type HostStatus = 'none' | 'pending' | 'approved' | 'rejected';

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  totalCapacity: number;
  attendingCount: number;
  host: {
    name: string;
    handle: string;
    avatar: string;
    rating: number;
    badge: string;
    id?: string;
  };
  vibeDescription: string;
  vibeTags: string[];
  rules: string[];
  status?: 'none' | 'pending' | 'approved';
  isCurated?: boolean;
  hasHostApproval?: boolean;
  verificationStatus?: EventVerificationStatus;
  rejectionReason?: string;
}

export interface HostApplicationItem {
  id: string;
  userId?: string;
  userName: string;
  userEmail?: string;
  phone?: string;
  category: string;
  experienceBio: string;
  paymentAmount: number;
  paymentStatus: 'paid' | 'pending';
  paymentReference?: string;
  hostId?: string;
  hostPassword?: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
  createdAt: string;
}

export interface CommunityItem {
  id: string;
  name: string;
  category: string;
  image: string;
  membersCount: number;
  gatheringsCount: number;
  rating: number;
  description: string;
  tags: string[];
  upcomingEvents: string[];
  members?: Array<{
    name: string;
    avatar: string;
    role?: string;
  }>;
}

export interface PersonItem {
  id: string;
  name: string;
  age: number;
  bio: string;
  avatar: string;
  vibeMatch: number;
  interests: string[];
  location: string;
  profession: string;
}

export interface GuestRequest {
  id: string;
  eventId?: string;
  eventTitle?: string;
  name: string;
  avatar: string;
  profession: string;
  timeAgo: string;
  mutualCount: number;
  note: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isHost?: boolean;
  isCurrentUser?: boolean;
  imageAttachment?: string;
}

export interface NotificationItem {
  id: string;
  type: 'approval' | 'invite' | 'community' | 'safety' | 'host_approved';
  title: string;
  description: string;
  timeAgo: string;
  avatar?: string;
  read: boolean;
  actionScreen?: ScreenId;
}
