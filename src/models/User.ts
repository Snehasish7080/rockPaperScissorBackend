import { prop, getModelForClass } from '@typegoose/typegoose';
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../interfaces/User';
import logging from '../config/logging';

const UserSchema = new Schema(
    {
        userName: { type: String, trim: true, unique: true },
        score: { type: Number, default: 0 }
    },
    { timestamps: true }
);
UserSchema.post<IUser>('save', function () {
    logging.info('Mongo', 'Checkout the user we just saved: ', this);
});
export default mongoose.model<IUser>('User', UserSchema);
