//import messageSchema from '../models/message-schema.js';
import mongoose from 'mongoose';

const messageModel = mongoose.model('message');

// let messages = [{name: "Bill", msgText : "Hi All!", id: 0}, {name: "Ann", msgText : "ICS 221 is fun!", id: 1}, {name: "Johnny", msgText : "I'm stranded!", id: 2}, 
// {name: "Barb", msgText : "Hi", id: 3}, {name: "Frank", msgText : "Who's tired?", id: 4}, {name: "Sarah", msgText : "I heart React", id: 5}];

const getAllMessages = async (req, res)=>{
    try{
        let messages = await messageModel.find( {}, '', {sort: { _id: -1 }}).exec();
        res.status(200).json(messages);
    } catch (err){
        res.status(400).send('Bad Request');
    }
};

const addNewMessage = async (req, res) => {
    try{
        //let message = await messageSchema.validate(req.body);
        //message.id = messages.length;
        //messages.unshift(message);
        let message = await messageModel.create(req.body);
        res.status(201).json(message);
    } catch(err) {
        res
            .status(400)
            .send(`Bad Request. The message in the body of the Request is either missing or malformed.\n${err}`);
    }
};

const updateMessage = async (req, res) =>{
    try{
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message){
            res.sendStatus(404);
        } else{
            if (message.name === req.user.username){
                message.msgText = req.body.msgText;
                try{
                    await message.save();
                    res.sendStatus(204);
                } catch (err){
                    res.status(400).send('Failed to update. Invalid message text.');
                }
            } else {
                res.sendStatus(401);
            }
        }
    } catch (err){
        res.sendStatus(400);
    }
};

const removeMessage = async (req, res) =>{
    try{
        let message = await messageModel.findById(req.params.messageId).exec();
        if (!message){
            res.sendStatus(404);
        } else{
            if (message.name === req.user.username){
                try{
                    await message.remove();
                    res.sendStatus(204);
                } catch (err){
                    res.sendStatus(400);
                }
            } else {
                res.sendStatus(401);
            }
        }
    } catch (err){
        res.sendStatus(400);
    }
};


export default { getAllMessages, addNewMessage, updateMessage, removeMessage};