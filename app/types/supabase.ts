export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      guests: {
        Row: {
          attending: boolean | null;
          considering: boolean | null;
          created_at: string | null;
          email: string | null;
          firstname: string;
          id: number;
          lastname: string;
          member_of: number | null;
          notes: string | null;
          plusOne: boolean | null;
          responded_at: string | null;
        };
        Insert: {
          attending?: boolean | null;
          considering?: boolean | null;
          created_at?: string | null;
          email?: string | null;
          firstname: string;
          id?: number;
          lastname: string;
          member_of?: number | null;
          notes?: string | null;
          plusOne?: boolean | null;
          responded_at?: string | null;
        };
        Update: {
          attending?: boolean | null;
          considering?: boolean | null;
          created_at?: string | null;
          email?: string | null;
          firstname?: string;
          id?: number;
          lastname?: string;
          member_of?: number | null;
          notes?: string | null;
          plusOne?: boolean | null;
          responded_at?: string | null;
        };
      };
      parties: {
        Row: {
          created_at: string | null;
          id: number;
          international: boolean;
          name: string | null;
          pin: string;
          visited_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          international?: boolean;
          name?: string | null;
          pin?: string;
          visited_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          international?: boolean;
          name?: string | null;
          pin?: string;
          visited_at?: string | null;
        };
      };
      std_form: {
        Row: {
          created_at: string | null;
          email: string | null;
          firstname: string;
          id: number;
          lastname: string;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          firstname: string;
          id?: number;
          lastname: string;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          firstname?: string;
          id?: number;
          lastname?: string;
        };
      };
    };
    Views: {
      parties_with_names: {
        Row: {
          created_at: string | null;
          generated_name: string | null;
          id: number | null;
          international: boolean | null;
          name: string | null;
          pin: string | null;
          visited_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          generated_name?: never;
          id?: number | null;
          international?: boolean | null;
          name?: string | null;
          pin?: string | null;
          visited_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          generated_name?: never;
          id?: number | null;
          international?: boolean | null;
          name?: string | null;
          pin?: string | null;
          visited_at?: string | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
