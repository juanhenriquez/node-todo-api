import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { db } from './../db';

import { User as UserInterface, Token as TokenInterface } from './../interfaces/user.interface';
import { UserSchema } from './../schemas/user.schema';

export interface UserModel extends UserInterface, Document {
  toJson: () => any,
  generateAuthToken: () => TokenInterface,
};

export interface UserModelStatic extends Model<UserModel> {
  findByIdAndToken: (id: string, token: string) => Promise<any>,
}

export const User = mongoose.model<UserModel, UserModelStatic>('User', UserSchema);