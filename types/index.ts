// Equipment Types
export interface Equipment {
  id: string;
  title: string;
  slug: string;
  brand: string;
  model: string;
  categoryId: string;
  category?: Category;
  price: number;
  priceUnit: string;
  condition: 'new' | 'refurbished' | 'demo';
  status: 'available' | 'sold' | 'reserved';
  year: number;
  warranty?: string;
  stock: number;
  description: string;
  specifications?: Record<string, string>;
  features: string[];
  thumbnail: string;
  images: string[];
  viewCount: number;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
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

