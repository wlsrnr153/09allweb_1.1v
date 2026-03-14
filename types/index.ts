// Equipment Types
export interface Equipment {
  id: string;
  title: string;
  slug: string;
  brand: string;
  model: string;
  categoryId: string;
  category?: {
    id?: string;
    name: string;
    slug: string;
  };
  price: string | number; // 숫자 또는 "별도협의", "문의" 등
  priceUnit: string;
  condition: 'new' | 'refurbished' | 'demo';
  status: 'available' | 'sold' | 'reserved';
  year: number;
  warranty?: string | null;
  stock: number;
  description: string;
  specifications?: Record<string, any> | null;
  features: string[];
  thumbnail: string;
  images: string[];
  viewCount: number;
  isPublished: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  equipmentCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Portfolio Types
export interface Portfolio {
  id: string;
  clientName: string;
  title: string;
  equipmentList: string[];
  images: string[];
  description?: string;
  completedAt: Date;
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Inquiry Types
export interface Inquiry {
  id: string;
  name: string;
  company?: string;
  phone: string;
  email: string;
  category: string;
  equipmentId?: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// FAQ Types
export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Filter Types
export interface EquipmentFilter {
  category?: string[];
  brand?: string[];
  priceRange?: { min: number; max: number };
  condition?: string[];
  year?: { min: number; max: number };
  keyword?: string;
}

// Form Types
export interface InquiryForm {
  name: string;
  company?: string;
  phone: string;
  email: string;
  category: string;
  equipmentId?: string;
  message: string;
  privacyAgreed: boolean;
}

// Hero Slide Types
export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  order: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface AdminSession {
  user: User;
  expires: string;
}

// 불용물품 처리 서비스 관련 타입

export type ServiceType = 'PURCHASE' | 'DISPOSAL' | 'MIXED'

export type DisposalReason = 
  | 'NOT_WORKING'       // 작동 불가
  | 'TOO_OLD'          // 노후화
  | 'NO_MARKET_VALUE'  // 시장가치 없음
  | 'DAMAGED'          // 파손
  | 'HAZARDOUS'        // 위험물질
  | 'MANDATORY'        // 법적 의무

export type DisposalMethod = 
  | 'RECYCLE'     // 재활용
  | 'INCINERATE'  // 소각
  | 'LANDFILL'    // 매립
  | 'SPECIAL'     // 특수 처리

export interface Quote {
  id: string
  serviceType: ServiceType
  
  // 고객 정보
  customerName: string
  customerPhone: string
  customerEmail: string
  company?: string
  
  // 장비 정보
  equipmentList: string // JSON string
  
  // 매입 정보
  purchaseAmount?: number
  purchaseItems?: string // JSON
  
  // 폐기 정보
  disposalCost?: number
  disposalItems?: string // JSON
  disposalReason?: DisposalReason
  
  // 최종 정산
  finalAmount: number
  discount?: number
  
  // 상태
  status: string
  notes?: string
  
  createdAt: Date
  updatedAt: Date
}

export interface DisposalRecord {
  id: string
  quoteId?: string
  
  // 장비 정보
  equipmentName: string
  equipmentModel?: string
  equipmentBrand?: string
  
  // 폐기 정보
  disposalMethod: DisposalMethod
  disposalReason: DisposalReason
  hazardousMaterial: boolean
  
  // 처리 내역
  certificateNumber: string
  disposalDate: Date
  cost: number
  weight?: number
  
  // 처리 업체
  processorName: string
  processorLicense: string
  
  // 인증
  certifiedBy?: string
  certificateUrl?: string
  
  notes?: string
  
  createdAt: Date
  updatedAt: Date
}

export interface QuoteRequest {
  customerName: string
  customerPhone: string
  customerEmail: string
  company?: string
  equipmentList: {
    name: string
    model?: string
    brand?: string
    condition: 'working' | 'partial' | 'broken'
    year?: number
    notes?: string
  }[]
  serviceType?: ServiceType
}
