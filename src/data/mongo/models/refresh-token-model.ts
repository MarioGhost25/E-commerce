import { Schema, model } from "mongoose";

const RefreshTokenSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', required: true, 
    index: true 
  },
  tokenHash: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true 
  },
  expiresAt: { 
    type: Date, 
    required: true, 
    index: true 
  },
  revokedAt: { 
    type: Date, 
    default: null 
  },
  userAgent: { 
    type: String 
  },
  ip: { 
    type: String 
  },
}, { timestamps: true });

//RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshTokenModel = model('RefreshToken', RefreshTokenSchema);
