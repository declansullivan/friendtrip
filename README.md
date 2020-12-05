# FriendTrip

## Intro
FriendTrip is a collaborative group trip planning website for people looking to have their trip run as smoothly as possible. It provides features to help with creating trips, managing places to visit, organizing things to bring and expenses made, as well as inviting people to join your trip.

## Login Credentials
Empty Test Account:
 - email: emptyTest@gmail.com
 
Populated Test Account:
 - email: master@gmail.com
 
## Requirements
 If running this as a part of CSE 110 verification/grading, please look at the submitted README document for credentials and `.env` file contents to run locally.

 1. Internet Connection.
 2. Database credentials if running locally.
 3. No database credentials if visiting from https://friendtrip-cse110.herokuapp.com/.
 4. This web-app is designed to be run on a computer.
 
## Installation Instructions
 1. Clone the FriendTrip repository from Github.
 2. Open the command line and navigate to the FriendTrip directory.
 3. Run `npm install` at the root level of FriendTrip.
 4. Run `cd api` then `npm install` to install the remaining packages.
 5. Copy paste the information from the provided `.env` file into an `.env` file inside of `friendtrip/api/`.
 6. Run `cd ..` then `npm run build` to generate a new build of FriendTrip.
 7. Run `npm start` to begin the service.
 8. Visit `http://localhost:9000/` to view the site.
 
 Alternatively, visit https://friendtrip-cse110.herokuapp.com/.

## How to Run
 1. Sign in with either your own credentials or testing credentials.

## Known Bugs
 1. There is no form checking for any user input at this point in time. This could potentially be used for malicious intent or leave users with blank information.
 2. For buttons pertaining to actions like leaving a Trip or removing a friend, clicking the button twice quickly can cause problems when the database is cleared of certain information, then the deletion request is processed again, now with that information already missing.
