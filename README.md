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
