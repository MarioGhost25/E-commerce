import { RefreshTokenDatasource, RefreshTokenRepository, RefreshTokenEntity } from "../../domain";

export class RefreshTokenRepositoryImpl implements RefreshTokenRepository {
  constructor(private readonly datasource: RefreshTokenDatasource) {}

  create(args: { userId: string; token: string; expiresAt: Date; userAgent?: string; ip?: string; }): Promise<RefreshTokenEntity> {
    return this.datasource.create(args);
  }

  findValid(token: string, userId: string): Promise<RefreshTokenEntity | null> {
    return this.datasource.findValid(token, userId);
  }

  revoke(token: string, userId: string): Promise<void> {
    return this.datasource.revoke(token, userId);
  }

  revokeAll(userId: string): Promise<void> {
    return this.datasource.revokeAll(userId);
  }
}
