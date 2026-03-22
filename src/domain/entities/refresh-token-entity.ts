export class RefreshTokenEntity {
  constructor(
    public id: string,
    public userId: string,
    public tokenHash: string,
    public expiresAt: Date,
    public revokedAt: Date | null,
    public userAgent?: string,
    public ip?: string,
  ) {}

  static fromObject(object: { [key: string]: any }): RefreshTokenEntity {
    const { id, _id, userId, tokenHash, expiresAt, revokedAt, userAgent, ip } = object;
    return new RefreshTokenEntity(
      _id ? _id : id,
      userId?.toString?.() ?? userId,
      tokenHash,
      new Date(expiresAt),
      revokedAt ? new Date(revokedAt) : null,
      userAgent,
      ip,
    );
  }
}
