#TheCookGrimoire

##Initial Setup
* Add Landing Page
* Add Recipes Page that lists all recipes

Each Recipe has:
   * Name
   * Image

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New Recipes
* Setup new recipe POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the recipes page
* Add a better header/title
* Make recipes display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new recipe form

##Add Mongoose
* Install and configure Mongoose
* Setup recipe model
* Use recipe model inside of our routes

##Show Page
* Review the RESTful routes we've seen so far
* Add description to our recipe model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts - disabled

##Add the Comment model!
* Make our errors go away!
* Display comments on recipe show page

##Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form
*Change creation to be in-page

##Style Show Page
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

##Refactor The Routes
* Use Express router to reoragnize all routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + Recipes
* Prevent an unauthenticated user from creating a recipe
* Save username+id to newly created recipe

# Editing Recipes
* Add Method-Override
* Add Edit Route for Recipes
* Add Link to Edit Page
* Add Update Route

#Deleting Recipes
* Add Destroy Route
* Add Delete button

#Authorization Part 1: Recipes
* User can only edit his/her recipes
* User can only delete his/her recipes
* Hide/Show edit and delete buttons

#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

<!--/recipes/:id/edit-->
<!--/recipes/:id/comments/:comment_id/edit-->

#Deleting Comments
* Add Destroy route
* Add Delete button

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

#Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header


RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /recipes      GET   Display a list of all recipes
NEW     /recipes/new  GET   Displays form to make a new recipe
CREATE  /recipes      POST  Add new recipe to DB
SHOW    /recipes/:id  GET   Shows info about one recipe

INDEX   /recipes
NEW     /recipes/new
CREATE  /recipes
SHOW    /recipes/:id

NEW     recipes/:id/comments/new    GET
CREATE  recipes/:id/comments      POST
