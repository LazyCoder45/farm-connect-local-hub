
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'consumer';
  phone: string;
  district: string;
  upazila: string;
  union: string;
  profileImage?: string;
  isVerified: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
