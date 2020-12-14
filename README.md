

  

# NOTES API

A simple REST Api in Node js :)

Sorry for my bad English :(

  
  
  

<details  open="open">
<summary>Content</summary>
<ol>
<li>
<a  href="#about">About</a>
</li>
<li>
<a  href="#setup">Setup</a>
<ul>
<li><a  href="#requirements">Requirements</a></li>
<li><a  href="#installation">Installation</a></li>
</ul>
</li>
<li><a  href="#usage">Usage</a></li>
</ol>
</details>

  

## About

Simple REST Api for creating notes with authentication. This project was built with:

*  [Node js](https://nodejs.org/en/)

*  [Express](https://expressjs.com/)

*  [MongoDb](https://www.mongodb.com/)

*  [Redis](https://redis.io/)

*  [Docker](https://www.docker.com/)

  

## Setup

### Requirements

* Node v14

* Express v4.17

* Mongo v4.4

* Redis v6

* Docker v20.10

  

For the tests

  

* Jest v26.6

* Ajv v6.12

* Redis-mock v0.55

* Supertest v6.0

  

### Installation

Install npm before these steps if you don't have it.

1. Clone the repo.

```
git clone https://github.com/JavierNafa/Notes-REST-Api.git
```

2. Run this command in terminal inside folder project.

```

npm i

```

3. Create a file called .env in the root folder.

  

| Env name | Description |
| :----------- | :----------------------|
MONGO_HOST | The host of mongoDb. If you are going to run this without docker set the remote host or use the default ```localhost```. |
MONGO_PORT | The mongoDb port. Default ```27017```. |
MONGO_DB_NAME | The name of the mongo database. Default ```notes ```. |
REDIS_DB_INDEX | The redis database number. Default ```0```.|
REDIS_HOST | The host of redis. If you are going to run this without docker set the remote host or use the default ```localhost```.|
REDIS_PORT | The redis port. Default ```6379```.|
REDIS_EXPIRATION | The expiration time of each key in seconds. Default ```60```.|
PORT | The REST Api port . Default ``` 8000```.|
TOKEN_KEY | JWT secret key. Example ``` supersecret123```. |
TOKEN_EXPIRATION_TIME | The expiration time of the jwt. Default ``` 1h```. |
|EMAIL_USER| The email to send a test mail.|
|EMAIL_PASSWORD|Email password.|
|EMAIL_SERVICE|The service supported by [nodemailer](https://nodemailer.com/smtp/well-known/)|

  
  

# Usage

### Without docker

1. Create the .env file with the above variables.

2. Make sure mongodb and redis are running first. After that, run ```npm start```

in the root folder.

3. Enter the following url in your favorite browser ```http://localhost:PORT/doc``` to see all routes.

4. Create a user ```/user```.

5. Log in ```/login```.

6. Use the token to authorize you. Example ```Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c```

7. You can now create, read, update and delete notes.

  

### With docker

1. Set the .env file only with ```PORT``` , ```TOKEN_KEY``` and the ```EMAIL``` variables if you want to use the default values.

3. Run ```docker-compose up``` in the root folder.

4. Follow steps 3-7 of the section without docker.

  

### Tests

The tests were maded with Jest.

1. First check that the connection with redis and mongodb is ok.

2. Run ```npm test``` in the root folder.

  

## Thanks for reading this.