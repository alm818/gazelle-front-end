'use strict';

const request = require('request');
const url = require('url');

const email = "emilgoldsmith94@gmail.com";
const password = "k6bhyf9zptfc";
const client_id = "ghost-admin";
const client_secret = "3a5d2cb8ca31";

const body = {
  "grant_type": "password",
  "username": email,
  "password": password,
  "client_id": client_id,
  "client_secret": client_secret,
};

let access_token;

request.post({url: "http://localhost:2368/ghost/api/v0.1/authentication/token", form: body}, (error, response, body) => {
  if (error) {
    console.error(error);
  }
  else if (response.statusCode === 200) {
    body = JSON.parse(body);
    access_token = body.access_token;
    console.log("successfully received token");
    request.get({url: 'http://localhost:2368/ghost/api/v0.1/users/me/', auth: {bearer: access_token}, followRedirect: false}, (error, response, body) => {
      console.log(response.statusCode);
      console.log(body);
    });
  }
  else {
    console.log("statuscode is not 200");
    console.log("Code is " + response.statusCode.toString());
    console.log("Body:");
    console.log(body);
  }
});
