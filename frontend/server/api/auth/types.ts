import type { User } from "@/types/index";

export interface Response {
    accessToken: string;
    refreshToken: string;
    user: User;
}
