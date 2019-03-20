### SERVER
# Run
$ npm install
$ node server.js || nodemon // Server is on port :8081
## Connect to the Db from server/db/config/config.json // It will run in development mode

## to populate the DB
# Run
$ npm run seed  
// Note: The db I've used was postgres
// Sometimes, when I run npm run seed, I get this weird error:
// I'm not sure why, but it works most of the time.
# Unhandled rejection SequelizeForeignKeyConstraintError: insert or update on table "Projects" violates foreign key constraint 

### UI
// For the ui, I felt more comfortable using Vue insted of Ejs or Handlebars, because this is what I've been using lately.
# Run
$ npm install
$ npm run serve // Server is on port :8080

### Small Map

##  User: username: test1 password: 12345678
#   Register (with credentials, on default Role === User) => 
#   Login => ProfilePage || Projects

##  Admin: username: admin password: admin123
#   Login => Users (all users) || Projects Panel (CRUD) || Projects

##  Everybody:
#   Projects
