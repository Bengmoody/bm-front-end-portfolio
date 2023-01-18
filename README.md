# Ben Moody Portfolio Website

## Overview

This website is an example of the work of Ben Moody.

This particular hosted website is a front end built using HTML, CSS, JSX and React.
View the hosted version at:
[hosted front-end](https://bmoody-portfolio.netlify.app/).

This front end was designed to display the information accessible via a separately hosted back-end API, also built by Ben Moody.
This is available to view at:
[hosted back-end](https://bmoody-portfolio.onrender.com/api/).
The back-end repo is available on github 
[here](https://github.com/Bengmoody/bm-back-portfolio).

The web-app makes CRUD queries to the back-end api utilising Axios.

Consideration has been given to the user experience, with the app including features such as:

- design responsive to viewport width, with consideration for common mobile screen sizes (done with media queries in CSS).

- use of animations and conditional rendering to improve the UX, for instance by:
    - hiding or blocking page components in response to user interaction.
    - utilising colour changes and animations to guide user attention.

- useful user feedback and prompts given, e.g.
    - prompt to login in order to post comments

- optimistic rendering with asynchronous corrections, where appropriate.

- error handling implemented to handle server errors and also user interference with URL path.

## Download and installation
To download this repo please run the following command:

`git clone https://github.com/Bengmoody/bm-front-end-portfolio.git`

Once you have done this, cd into the directory with the command:

`cd bm-front-end-portfolio`

Once inside, please install all dependencies with the command:

`npm install`

Current non-core dependencies include:
- [axios](https://axios-http.com/docs/intro): ^1.2.2
- [framer-motion](https://www.framer.com/motion/): ^8.4.0
- [gsap](https://greensock.com/docs/v3/GSAP): ^3.11.4
- [react-transition-group](https://reactcommunity.org/react-transition-group/): ^4.4.5

Current core dependencies include:
- testing-library/jest-dom: ^5.16.5
- testing-library/react: ^13.4.0
- testing-library/user-event: ^13.5.0
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.6.1
- react-scripts: 5.0.1
- web-vitals: ^2.1.4

This package was made using node v19.0.0, so please use a version no earlier than this.

## Currently available sections
In the current build, sections are available as follows:

### 1. Header 
Present on all pages.
- Has a login box, which queries the API to check for valid username in database.  If not found, rejects entry and prompts to retry.  If successful, logs user in and holds this in state for use throughout the rest of the website.
- Logo which redirects to landing page (/) on click.

### 2. Navbar
Present on all pages.  Currently has the following links:
- **Reviews**: queries API and displays data to show information about *all reviews*, i.e. removes any queries.
- **Categories**: queries API and displays data to list all available queries.  
- **Users**: currently a placeholder, links to /reviews/
- **Add review**: currently a placeholder, links to /reviews/
- **About**: currently a placeholder, links to /reviews/

### 3. Footer
Present on all pages. 
Contains minimal information around site ownership.

### 4. Main
This is the main element of the website, and is rendered depending on interaction with the user. 

In the following section, any non-functional placeholder elements will be flagged with a footnote[^1].

- **Reviews**:
    - Has a stick header component containing relevant prompts for UX.
    - Has a query section available for searching.
    - Has a list section, displaying sorted response tiles, as per user interaction.
    - Clicking a tile displays a single review, with additional information and features:
        - access to comments via a clickable button.
        - comments section is responsive to viewport size.
        - ability to upvote/downvote a review, which renders optimistically then patches the back-end, updating accordingly.
        - if you are logged in as a user, you can add comments, and delete your own comments (try logging in as *grumpy19*, for e.g.). 
        - ability to vote on comments is currently a placeholder[^1].


- **Categories**
    - Has a list of clickable tiles which links to a queried list of reviews, for that specific category:
        - This page has an updated header to contain category information.
        - Again, sortable via query tile.
        - Clicking a tile displays a single review, as above.

- **Landing page**
    - Contains a brief welcome message and a link to a list of back-end endpoints, rendered from the endpoints.json file on the back-end endpoint /api/.
    This is currently a placeholder[^1].

[^1]: Currently a non-functioning placeholder.


## Known bugs

- Currently there is a bug in the back-end, such that a 500 response is given when retrieving comments associated with a review that has only 1 comment, e.g. review_id 8, 11 etc.


## Planned updates
In no particular order:

-[X] Improve formatting of landing page (/) and footer.
-[X] Change the logo from plain-text to a scalable SVG logo, and set limitations on scaling through media queries.
-[X] Update landing page to be more attractive, including framer-motion animations upon site load.
-[ ] Add the ability to vote on comments.
-[X] Improve website fonts.
-[ ] Add the ability to add a review.
-[ ] Add information on the back-end to "About", such that users can see all available endpoints.  
-[ ] Fixing back-end error 500.

last code update: 18/1/22


