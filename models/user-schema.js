import mongoose from 'mongoose';
import argon2 from 'argon2';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        lowercase: true,
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    username:{
        type: String,
        required: true,
        match: /[A-Za-z0-9_]/,
        minLength: 3,
        maxLength: 15
    },
    password:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 64
    }
});

userSchema.set('toJSON',{
    versionKey: false,
    virtuals: true,
    transform: (doc, ret)=>{ delete ret.id }
});

userSchema.pre('save', async function(){
    try{
        const hash = await argon2.hash(this.password, {
            type: argon2.argon2id
        });
        this.password = hash;
    } catch (err){
        console.log("Error in hashing password" + err);
    }
});

userSchema.methods.verifyPassword = async function(plainTextPassword){
    const dbHashedPassword = this.password;
    try{
        return await argon2.verify(dbHashedPassword, plainTextPassword);
    }catch (err){
        console.log("Error verifying password" + err);
    }
}

export default mongoose.model('user', userSchema);