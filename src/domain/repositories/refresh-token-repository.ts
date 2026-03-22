import { RefreshTokenEntity } from "..";

export abstract class RefreshTokenRepository {
  abstract create(args: {
    userId: string;
    token: string;
    expiresAt: Date;
    userAgent?: string;
    ip?: string;
  }): Promise<RefreshTokenEntity>;

  abstract findValid(token: string, userId: string): Promise<RefreshTokenEntity | null>;

  abstract revoke(token: string, userId: string): Promise<void>;

  abstract revokeAll(userId: string): Promise<void>;
}
