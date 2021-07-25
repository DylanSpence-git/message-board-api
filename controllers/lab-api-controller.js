//import messageSchema from '../models/message-schema.js';
import mongoose from 'mongoose';

const labModel = mongoose.model('lab');
const admin = "admin"

const alreadyExists = async (labNo) =>(
    await labModel.exists({
        '$or': [
            { labNo: labNo }
        ]
    })
);

const getAllLabs = async (req, res)=>{
    try{
        let labs = await labModel.find( {}, '').sort('labNo').exec();
        res.status(200).json(labs);
    } catch (err){
        res.status(400).send('Bad Request');
    }
};

const addNewLab = async (req, res) => {
    try{
        if(req.user.username == admin){
            if( await alreadyExists(req.body.labNo) ){
                res.status(403).send("Lab number already exists.");
            } else{
                let lab = await labModel.create(req.body);
                res.status(201).json(lab);
            }
        }
        else{
            res.sendStatus(401);
        }
    } catch(err) {
        res
            .status(400)
            .send(`Bad Request. The message in the body of the Request is either missing or malformed.\n${err}`);
    }
};

const updateLab = async (req, res) =>{
    try{
        let lab = await labModel.findById(req.params.labId).exec();
        if (!lab){
            res.sendStatus(404);
        } else{
            if (admin === req.user.username){
                lab.topic = req.body.topic;
                try{
                    await lab.save();
                    res.sendStatus(204);
                } catch (err){
                    res.status(400).send('Failed to update. Invalid topic text.');
                }
            } else {
                res.sendStatus(401);
            }
        }
    } catch (err){
        res.sendStatus(400);
    }
};

export default { getAllLabs, addNewLab, updateLab };