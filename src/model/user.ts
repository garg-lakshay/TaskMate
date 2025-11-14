import mongoose ,{Document ,Schema} from 'mongoose';

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    resetOtp?: string | null;
    resetOtpExpiry?: Date | null;
}

const userSchema : Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    resetOtp: {type: String, default: null},
    resetOtpExpiry: {type: Date, default: null}
},
{ timestamps: true }
);
export default mongoose.model<IUser>("User", userSchema);
