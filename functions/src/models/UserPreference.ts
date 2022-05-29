import { ObjectId } from "mongodb";

export default interface UserPreference {
    id?: string;
    postal_code: string;
    event: string[];
    genre?: string[],
    sport?: string[];
}

