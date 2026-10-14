import type { User } from "@/entities/user/model/types";

export type { User };

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
