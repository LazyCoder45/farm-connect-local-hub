
export interface Crop {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: {
    district: string;
    upazila: string;
    union: string;
  };
  title: string;
  description: string;
  quantity: number;
  unit: string; // kg, ton, piece, etc.
  pricePerUnit: number;
  images: string[];
  videos?: string[];
  harvestDate: Date;
  expectedSaleDate: Date;
  category: string; // rice, vegetables, fruits, etc.
  isOrganic: boolean;
  status: 'available' | 'sold' | 'reserved';
  ratings: Rating[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: Date;
}
