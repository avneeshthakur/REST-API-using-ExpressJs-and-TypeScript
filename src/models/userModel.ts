import { model, Schema } from 'mongoose';

const UserSchema : Schema = new Schema({

    name: { 
      type:String,
      required:true,
      lowercase:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
});

export default model("User",UserSchema);
