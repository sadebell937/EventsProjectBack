import express from 'express';
import { getClient } from '../db';

import UserPreference from '../models/UserPreference';

const routes = express.Router();

routes.get('/preferences', async (req,res) => {
    const postal_code = String(req.query.postal_code || "");
    const event = String(req.query.event || "");
    const genre = String(req.query.genre || "");
    const sport = String(req.query.sport || "");
    try {
        const client = await getClient();
        const results = await client.db()
                        .collection<UserPreference>('preferences')
                        .find({postal_code:postal_code, event: event,genre:genre,sport:sport})
                        .toArray();
        res.json(results);           
    } catch(err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }

})

routes.post('/preferences', async (req,res) => {
    const preference = req.body as UserPreference;
    try {
        const client = await getClient();
        await client.db()
            .collection<UserPreference>('preferences')
            .insertOne(preference);
        res.status(201).json(preference)
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
})


export default routes;