import express from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import Event from '../models/EventInterface';
import UserPreference from '../models/UserPreference';
import { UserFavorites } from '../models/UserFavorites';

const routes = express.Router();

routes.get('/events', async (req,res) => {
    try {
        const client = await getClient();
        const results = await client.db()
                                .collection<Event>('events')
                                .find().toArray();
        res.json(results);                        
    } catch (err) {
        console.error('Error',err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

routes.get('/events/:id', async (req,res) => {
    const id = req.params.id;
    try {
        const client = await getClient();
        const event = await client.db().collection<Event>('events').findOne({_id: new ObjectId(id)});
        if(event) {
            res.json(event);
        } else {
            res.status(404).json({message:'Not Found'});
        }
    } catch(err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
})

routes.get('/favorites/:id', async (req,res) => {
    const id =req.params.id;
    try {
        const client = await getClient();
        const results = await client.db()
                                .collection<UserFavorites>('favorites')
                                .find({id:id}).toArray();
        res.json(results);                        
    } catch (err) {
        console.error('Error',err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

routes.post('/favorites/', async (req,res) => {
    const favorite = req.body as UserPreference;
    try {
        const client = await getClient();
        await client.db()
            .collection<UserPreference>('favorites')
            .insertOne(favorite);
        res.status(201).json(favorite)
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
})











export default routes