# EventsProjectBack

EventsProjectBack is the back end folder for our final project, the Event Finder, which handles routes for the front end of the app to communicate with our MongoDB database. 

The folder that contains the routes, functions/src/routes/preferences.tsx, contains get, post, put, and delete calls to modify data housed in one of the three database collections: favorites, preferences, and reviews. 

The models folder contains a file called EventInterface.ts, which holds the back end interface Event, as well as interfaces Venue, Performer, Taxonomies, UserFavorites, UserPreference, Review, and EventReviews. These interfaces are communicated to the front end via routes, and then used to add structure to objects throughout the project.

The repository for the front end can be found here:
https://github.com/sadebell937/EventsProjectFront
