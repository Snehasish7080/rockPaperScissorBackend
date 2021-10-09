import { Document } from 'mongoose';

export interface IUser extends Document {
    userName: string;
    score: number;
}
