Install nodemon:
```
$ npm install -g nodemon
```

Install npm dependencies:
```
$ npm install
```

Run server:
```
$ nodemon app.js
```

Open your localhost page, using 8002 port. 

### URLs

/register – POST query with 'login' and 'password' params, registration
/auth - POST query with 'login' and 'password' params, authorization, returns 'id' parameter of the authorized user
/logout - POST query without params, logout
/user?id - GET query with 'id' param, returns current user's information (login, password, id)

### Misc
Static Files Directory: src/static
Layout Page: src/views/index.html

