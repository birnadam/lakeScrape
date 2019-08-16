# lakeScrape

## What it is
lakeScrape is an application that scrapes data from Lakers Bleacher Report and appends them on the page for the user. 
<br>Aside from scraping the data for the user to view, the user can also leave comments on an article
<br>and this will allow them to access the article easily again later through the "commented" tab.  

## How it was made
lakeScrape was created using **Express, Express-Handlebars, Mongoose, Cheerio, and Axios**. 

The application uses Mongoose for data, Axios for user interaction, Cheerio for scraping the target website
<br>Express for all the files and folders to communicate with each other and Express-Handlebars for displaying the page.
<br>The first thing done following initial structuring were creating the models for our data via MongoDB.
<br>This is where we build Schemas for how the data should look when we GET or POST.
<br><br>
Then routes were created to ensure proper functionality. Cheerio was used in the function to scrap for news articles from
<br>Lakers Bleacher Report, in order to properly do so, visit Lakers Bleacher Report directly and inspect for the element.
<br> Used containing classes and ids to properly grab the data necessary for the application. 
<br><br>
Bootstrap and Handlebars were used to append the data onto the page in a meaningful way.
<br>User is allowed to load more articles, delete articles, post comments, and delete comments 

## How it works
Visit the deployed site and view your Lakers news right away: https://laker-scraper.herokuapp.com/
<br> 
*OR*
1. Clone this repository: https://github.com/birnapwnsu/lakeScrape.git
2. Pull up console in the downloaded folder and type "npm init -y" to intialize your package.json
3. Type in "npm install" to install all the proper modules
4. Type "npm run server" to start up the application
5. Lastly, open up your browser and go to localhost:3000 to visit the application
