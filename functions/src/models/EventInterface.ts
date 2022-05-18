import { ObjectId } from "mongodb";
// for any of these that had an id: number, I changed them to _id?: ObjectID. Just wanted to note in case it winds up causing any issues.

export default interface Event {
    _id?: ObjectId;
    type: string;
    venue: Venue;
    performers: Performer[];
    datetime_local: string;
    taxonomies: Taxonomies[];
    url: string;
    title: string;
    popularity: number;
    description: string;
}

export interface Venue{
    _id?: ObjectId;
    state: string;
    name_v2: string;
    postal_code: string;
    name: string;
    url: string;
    score: number;
    location: Location;
    address: string;
    country: string;
    has_upcoming_events: boolean;
    num_upcoming_events: number;
    city: string;
    slug: string;
    extended_address: string;
    popularity: number;
    capacity: number;
    display_location: string
}

export interface Performer{
    _id?: ObjectId;
    type: string;
    name: string;
    image: string;
    taxonomies: Taxonomies[];
    url: string;
    score: number;
}

export interface Taxonomies{
    _id?: ObjectId;
    name: string;
    parent_id: number;
    rank: number;
}