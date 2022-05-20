import { ObjectId } from "mongodb";

export default interface UserPreference {
    id?: ObjectId;
    postal_code: string;
    event: string[];
    taxonomies:{genre?: string[],
                sport?: string[]};
    
    event_size?: number;
}

