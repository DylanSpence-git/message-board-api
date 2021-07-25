//import yup from 'yup';
import mongoose from 'mongoose';


const labSchema = new mongoose.Schema({
    labNo: {
        type: Number,
        required: true
    },
    topic: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 80
    }
});

labSchema.set('toJSON', {
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { 
        ret.id = ret._id
        delete ret._id; }
});

export default mongoose.model('lab', labSchema);