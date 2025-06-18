export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          created_at: string | null
          crop_id: string
          id: string
          user_id: string
          user_name: string
        }
        Insert: {
          content: string
          created_at?: string | null
          crop_id: string
          id?: string
          user_id: string
          user_name: string
        }
        Update: {
          content?: string
          created_at?: string | null
          crop_id?: string
          id?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crops: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          district: string
          expected_sale_date: string
          farmer_id: string
          harvest_date: string
          id: string
          images: string[] | null
          is_organic: boolean | null
          price_per_unit: number
          quantity: number
          status: string
          title: string
          union: string
          unit: string
          upazila: string
          updated_at: string | null
          videos: string[] | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          district: string
          expected_sale_date: string
          farmer_id: string
          harvest_date: string
          id?: string
          images?: string[] | null
          is_organic?: boolean | null
          price_per_unit: number
          quantity: number
          status?: string
          title: string
          union: string
          unit: string
          upazila: string
          updated_at?: string | null
          videos?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          district?: string
          expected_sale_date?: string
          farmer_id?: string
          harvest_date?: string
          id?: string
          images?: string[] | null
          is_organic?: boolean | null
          price_per_unit?: number
          quantity?: number
          status?: string
          title?: string
          union?: string
          unit?: string
          upazila?: string
          updated_at?: string | null
          videos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "crops_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          advance_payment: number
          consumer_id: string
          created_at: string | null
          crop_id: string
          expected_delivery_date: string | null
          farmer_id: string
          id: string
          order_date: string | null
          payment_status: string
          quantity: number
          remaining_payment: number
          status: string
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          advance_payment: number
          consumer_id: string
          created_at?: string | null
          crop_id: string
          expected_delivery_date?: string | null
          farmer_id: string
          id?: string
          order_date?: string | null
          payment_status?: string
          quantity: number
          remaining_payment: number
          status?: string
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          advance_payment?: number
          consumer_id?: string
          created_at?: string | null
          crop_id?: string
          expected_delivery_date?: string | null
          farmer_id?: string
          id?: string
          order_date?: string | null
          payment_status?: string
          quantity?: number
          remaining_payment?: number
          status?: string
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_consumer_id_fkey"
            columns: ["consumer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          district: string
          email: string
          id: string
          is_verified: boolean | null
          name: string
          phone: string
          profile_image: string | null
          role: string
          union: string
          upazila: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          district: string
          email: string
          id: string
          is_verified?: boolean | null
          name: string
          phone: string
          profile_image?: string | null
          role: string
          union: string
          upazila: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          district?: string
          email?: string
          id?: string
          is_verified?: boolean | null
          name?: string
          phone?: string
          profile_image?: string | null
          role?: string
          union?: string
          upazila?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          crop_id: string
          id: string
          rating: number
          user_id: string
          user_name: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          crop_id: string
          id?: string
          rating: number
          user_id: string
          user_name: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          crop_id?: string
          id?: string
          rating?: number
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_providers: {
        Row: {
          available_date: string
          available_districts: string[] | null
          capacity: string
          completed_trips: number | null
          created_at: string | null
          id: string
          is_available: boolean | null
          price_per_km: number
          provider_id: string
          provider_name: string
          provider_phone: string
          rating: number | null
          vehicle_type: string
        }
        Insert: {
          available_date: string
          available_districts?: string[] | null
          capacity: string
          completed_trips?: number | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          price_per_km: number
          provider_id: string
          provider_name: string
          provider_phone: string
          rating?: number | null
          vehicle_type: string
        }
        Update: {
          available_date?: string
          available_districts?: string[] | null
          capacity?: string
          completed_trips?: number | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          price_per_km?: number
          provider_id?: string
          provider_name?: string
          provider_phone?: string
          rating?: number | null
          vehicle_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transport_providers_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
