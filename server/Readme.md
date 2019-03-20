### Used Model:

# username (unique), email (unique), password (hashed), first_name, last_name

###Routes:

## Login

# /login (username, password)

When a user is logging in, it recives a token

## Register

# /register (username, email, password, first_name, last_name)

When a user is registering, it will provide an unique username, unique email, password, a first name and a last name.
// If I have time I will do a proper error status with the right messages.

###

### Project
// Only the admin can create, update, delete a project
// Before a project is created, read, deleted it checks the token for the admin role, after that allowing the admin to make a change (I asociated the project with the Admin)

## Create Project
# /projects

## Read Projects
# /projects 
// Will be ordered by the last to first

## Update Project
# /projects/:project_id

## Delete Project
# /projects/:project_id