# Game of Thrones Back End Configuration

## Schema Design
![schema](./Data/screenShot.png)
>The Schema offers connections between a character to their family members, people they have killed, their order, and their houses.
>This Schema was an early concept for our group, and during the implementation of the app, some of these relationships were not used.  


## Data
The team created and seeded several data tables with Game of Thrones information. Initially, the character data was pulled from an online resource. From there, we edited and modified the data so that we could pull out useful information, such as the House the character belonged and their relationships with other characters. We hard coded the orders information into the data ourselves using the team's combined knowledge of the show and books.  

Most data used within the application came straight from the character data that can be found at the GOT/characters route. This information was pulled into the site, and used to populate character cards.

The houses and orders data were used in a similar fashion to the character data, both were pushed to add information and images to their respective cards to flesh out the site's information.

## Routes
* GET **/GOT/characters**: Retrieve all character's names, houses, orders and images.

* GET **/GOT/houses**: Retrieve list of houses. House data included the name of the house, its coat of arms, and its location in 
Westeros. In addition, after the house data, another object was provided that gave a list of characters and their respective houses.

* GET **/GOT/orders**: This route mirrored the houses route, providing the name and coat of arm of and order, followed by who was in that order. 

* GET **/GOT/tree/:charID**: Retrieve characters siblings, parents, and grandparents. This is not acutally used on the front end of the site, this was to be used in our Tree application that was one of the team's stretch goals to show connections between blood relatives in the show. We did not have time during the project week to implement this.

* GET **/GOT/duel**: Retrieve character's name, attack_value, and images.

## Testing
Tests were used to ensure routes were working and returning data when called.

## Installation
Fork and clone down git repository. npm install to install all packages required to run app backend.
Next create a database with name relevant name:
1. If you are using Docker to store your data prior to deployment, open Docker app and run the container in which you will be storing your data. Will be utilizing the Postgres image in this app. Steps to set up and run a postgres container:
    * docker pull postgres
    * docker run --name (name of container) -e POSTGRES_PASSWORD=(password) -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres
        * if docker container is already created: docker run (container name)
    * docker exec -it (container name) /bin/bash, you are now in the shell of your container
    * psql -U postgres, running your image in your container
    * Now in your container you can CREATE DATABASE (database name) or \c into an already created database. To view tables when in a database: \d or to look at a specific table \dt (table name)
    * When done, ^C to escape out
 2. Make sure to configure knexfile.js with appropriate connection string with the following template: connection: '(image)://(image):(password)@localhost/(database name)'
 3. Once knex is configured and container has been started, npx knex migrate:latest and npx knex seed:run to populate database with character information
 4. npm start to bring your backend up so frontend can connect and retrieve data from it.
