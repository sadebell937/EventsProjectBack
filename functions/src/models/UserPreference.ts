import { ObjectId } from "mongodb";

export default interface UserPreference {
    id?: ObjectId;
    postal_code: string;
    event: string[];
    genre?: string[],
    sport?: string[];
}

