//import yup from 'yup';
import mongoose from 'mongoose';


const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 15,
        match: /[A-Za-z]/
    },
    msgText: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    }
});

messageSchema.set('toJSON',{
    versionKey: false,
    virtuals: true,
    transform: (doc, ret) => { delete ret._id; }
});
// //Data Schema for a New Message
// const messageSchema = yup.object().shape({
//     name: yup
//     .string()
//     .trim()
//     .min(2, 'Your name must be at least ${min} characters.')
//     .max(15, 'Your name cannot be more than ${max} characters.')
//     .matches(/[A-Za-z]/, 'Invalid name. Use Upper and Lowercase letters only.')
//     .required('Your name is required'),
//     msgText: yup
//     .string()
//     .trim()
//     .min(2, 'Your message must be at least ${min} characters.')
//     .max(30, 'Your message must be no more than ${max} characters.')
//     .required('A message is required.')
// });

//export default messageSchema;
export default mongoose.model('message', messageSchema);