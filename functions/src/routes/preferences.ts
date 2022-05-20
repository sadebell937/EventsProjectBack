import express from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import UserPreference from '../models/UserPreference';

const routes = express.Router();

routes.get('/preferences', async (req,res) => {
    const postal_code = String(req.query.postal_code || "");
    const event = String(req.query.event || "");
    const event_size = parseInt(req.query.event_size as string);

    try {
        const client = await getClient();
        const results = await client.db()
                        .collection<UserPreference>('preferences')
                        .find({postal_code:postal_code, event: event,event_size: {$gte:event_size,$lte:event_size}})
                        .toArray();
        res.json(results); 
                       
    } catch(err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }

})