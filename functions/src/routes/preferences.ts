import express from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import {Event, EventReviews, Review} from '../models/EventInterface';
import {UserPreference} from '../models/EventInterface';
import { UserFavorites } from '../models/EventInterface';


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
    const userId = req.params.id;
    try {
        const client = await getClient();
        const results = await client.db()
                                .collection<UserFavorites>('favorites')
                                .findOne({id: userId})
        res.json(results);                        
    } catch (err) {
        console.error('Error',err)
        res.status(500).json({message:'Internal Server Error'})
    }
})

routes.post('/favorites', async (req,res) => {
    const favorite = req.body as UserFavorites;
    try {
        const client = await getClient();
        await client.db()
            .collection<UserFavorites>('favorites')
            .insertOne(favorite);
        res.status(201).json(favorite)
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
})


routes.put('/favorites/:id', async(req,res) => {
    const id = req.params.id;
    const data = req.body as Event;
    try {
        const client = await getClient();
        const result = await client.db().collection<UserFavorites>('favorites')
                       .updateOne({id:id},{$push:{favoriteEvents:data}});
        if (result.modifiedCount === 0) {
            res.status(404).json({message:"Not Found"});

        } else {
            res.json(data);
        }
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
    
})

routes.delete('/favorites/:id/:eventId', async(req,res) => {
    const id = req.params.id;
    const removedEvent = Number(req.params.eventId);
    try {
        const client = await getClient();
        const result = await client.db().collection<UserFavorites>('favorites')
                       .updateOne({id:id},{$pull:{favoriteEvents:{id:removedEvent}}});
        if (result.modifiedCount === 0) {
            res.status(404).json({message:"Not Found"});
        } else {
            res.status(204).end();
        } 
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    } 
})


routes.get('/preferences/:id', async (req,res) => {
    const userId = req.params.id;
    try {
        const client = await getClient();
        const results = await client.db()
                        .collection<UserPreference>('preferences')
                        .findOne({id: userId})
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

routes.put('/preferences/:id', async(req,res) => {
    const id = req.params.id;
    const changedPreference = req.body as UserPreference;
    try {
        const client = await getClient();
        const result = await client.db().collection<UserPreference>('preferences')
                       .replaceOne({id:id}, changedPreference);
        if (result.modifiedCount === 0) {
            res.status(404).json({message:"Not Found"});

        } else {
            res.json(changedPreference);
        }
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
    
})

//Get all reviews for event
routes.get('/reviews/:eventId', async (req,res) => {
    const eventId = Number(req.params.eventId);
    try {
        const client = await getClient();
        const results = await client.db()
                        .collection<EventReviews>('reviews')
                        .findOne({eventId: eventId})
        res.json(results);           
    } catch(err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }

})

//Get user's review for event
routes.get('/reviews/:id/:eventId', async (req,res) => {
   // const id = req.params.id;
    const eventId = Number(req.params.eventId);
    try {
        const client = await getClient();
        const results = await client.db()
                        .collection<EventReviews>('reviews')
                        .findOne({id:eventId})
        res.json(results);           
    } catch(err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }

})
//Add user's review
routes.post('/reviews', async (req,res) => {
    const review = req.body as EventReviews;
    try {
        const client = await getClient();
        await client.db()
            .collection<EventReviews>('reviews')
            .insertOne(review);
        res.status(201).json(review)
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
})


routes.put('/reviews/:eventId', async(req,res) => {
    const id = Number(req.params.eventId);
    const data = req.body as Review;
    try {
        const client = await getClient();
        const result = await client.db().collection<EventReviews>('reviews')
                       .updateOne({eventId:id},{$push:{reviews:data}});
        if (result.modifiedCount === 0) {
            res.status(404).json({message:"Not Found"});

        } else {
            res.json(data);
        }
    } catch (err) {
        console.error('Error',err);
        res.status(500).json({message: 'Internal Server Error'})
    }
    
})

export default routes;