# Ticket-System
### """ Netlify, Vercel, Render as hosting platforms???   """
IT help desk ticket system that allows people to submit tickets for things such as account help and repair requests.

The system should support automatic assignment of tickets to individual IT staff members and have a built-in calendar that can support the large quantity of tickets our department receives. Additionally, the system should include both asynchronous and live chat between the ticket submitter and IT staff.

### Specifications:
Implements user authentication
Implements a dynamic database of user and item data
Implements one or more “operations” involving some form of frontend-backend-database communication
### Expectations:
Databases can use any existing dataset or have dummy data. Databases using datasets should have at least 100 items. There can be exceptions based on the specific project.
New User creation/registration should be available
UI design should contain elements commonly found or expected such as a user profile, login, logout.
Consideration for design aesthetics
System should be dynamic and responsive

### Key Features:
- User Authentication: Secure login and registration for users and IT staff, ensuring data privacy and personalized access.
- Database: Efficient management of user and ticket data, supporting over 100 items, with dummy data for testing.
- Automatic Ticket Assignment: Tickets are automatically assigned to the first available IT staff member, with manual override capabilities for administrators.
- Built-in Calendar: Integrated calendar for IT staff to manage and schedule tickets, with NO user interaction.
- UI Design: User-friendly interface with essential elements like user profile, login, logout, and aesthetic design considerations.
- Ticket questionnaire form: Users have to fill out the form providing their issue description.
- Ticket Categories: Users can select tickets from predefined categories.
- Admin Controls: Administrators can change schedules, assign availability hours, and manually override ticket assignments.
- Chat Functionality:
  - Asynchronous Chat: Allow users and IT staff to communicate regarding ticket status and details.
  - Live Chat: Separate window feature for real-time communication between users and IT staff ( We might implement it at the very end)


### Installation
#### *Full MERN set up and deployment to Render*
+ Create backend folder - mkdir server
+ Install dependencies - npm install express mongoose dotenv cors
+ Create .env file
+ Create app.js
+ Add MongoDB database URI
##### + Setting-up Frontend
+ go to root directory - cd ..
+  initialze ReactJS boilerplate - npx create-react-app client
    + npm start
      + Starts the development server.
   + npm start
     + Starts the development server.
   + npm run build
     + Bundles the app into static files for production.
   + npm test
     + Starts the test runner.
   + npm run eject
     + Removes this tool and copies build dependencies, configuration files
       and scripts into the app directory. If you do this, you can’t go back!
+ inside the App.js file make a fetch request to the backend to show the message
+ Delete the .git folder inside the client folder to prevent any conflicts during the deployment process, also delete .gitignore
###### + Setting-up Root folder for Deployment 
+ Create package.json file for the root folder - npm init -y
+ Create a .gitignore to not push all created dependencies and libraries
+ add scripts to package.json to install our server and client dependencies, start our server and client separately, and build our client for deployment

##### Deploy to Render 
+ "New" -> "Web service"
+ Runtime: Node
+ Build Command: npm run install-server
+ Start Command: npm run start-server
+ Open Advanced option, and add environment variables.
+ Click on "Create Web Service" to deploy your backend.
+ Add Backend URL to Frontend to client/App.js file

##### Deploy Frontend
+ "New" -> "Static Site"
+ Runtime: Node
+ Build Command: npm run install-client && npm run build-client
+ Publish directory: ./client/build
+ Add Frontend URL to Backend to backend/app.js