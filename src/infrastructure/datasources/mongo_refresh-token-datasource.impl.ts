import crypto from "crypto";
import { RefreshTokenDatasource, RefreshTokenEntity } from "../../domain";
import { RefreshTokenModel } from "../../data";

const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

export class MongoRefreshTokenDatasourceImpl implements RefreshTokenDatasource {
  async create(args: { userId: string; token: string; expiresAt: Date; userAgent?: string; ip?: string; }): Promise<RefreshTokenEntity> {
    const { userId, token, expiresAt, userAgent, ip } = args;
    const doc = await RefreshTokenModel.create({
      userId,
      tokenHash: hashToken(token),
      expiresAt,
      userAgent,
      ip,
    });
    return RefreshTokenEntity.fromObject(doc);
  }

  async findValid(token: string, userId: string): Promise<RefreshTokenEntity | null> {
    const doc = await RefreshTokenModel.findOne({
      userId,
      tokenHash: hashToken(token),
      revokedAt: null,
      expiresAt: { $gt: new Date() },
    });
    return doc ? RefreshTokenEntity.fromObject(doc) : null;
  }

  async revoke(token: string, userId: string): Promise<void> {
    await RefreshTokenModel.updateOne(
      { userId, tokenHash: hashToken(token), revokedAt: null },
      { $set: { revokedAt: new Date() } }
    );
  }

  async revokeAll(userId: string): Promise<void> {
    await RefreshTokenModel.updateMany(
      { userId, revokedAt: null },
      { $set: { revokedAt: new Date() } }
    );
  }
}
