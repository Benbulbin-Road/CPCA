import express, { Request, Response, NextFunction } from 'express';

import users from './users.json';

const app = express();
const port = 3001;

/**
 * const exampleUser = {
    "id": 1,
    "avatar": "https://robohash.org/porroenimfugiat.png?size=100x100&set=set1",
    "first_name": "Erroll",
    "last_name": "Pritchard",
    "email": "epritchard0@acquirethisname.com",
    "emailVerified": false,
    "dob": "1982-10-24",
    "company": { 
      "name": "Jaloo",
      "department": "Human Resources"
    },
    "skills": [
      "TPNS",
      "DDIC",
      "Data Warehousing"
    ]
  }
 */

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  emailVerified: boolean;
  dob: string;
  company: Company;
  skills: Array<string>;
};

interface Company {
  name: string;
  department: string;
}

const userArray:User[] = users as User[];

const getUsers = (request: Request, response: Response, next: NextFunction) => {
  // Using only to avoid CORS issues over different servers
  response.setHeader("Access-Control-Allow-Origin", "*")
  response.setHeader("Access-Control-Allow-Credentials", "true");
  // Some input validation from the request. Return error 400 if syntax is incorrect
  try{
    if(request.params.id) {
      switch(isNaN(+request.params.id) || +request.params.id < 0) {
        case false:
          response.status(200).json(userArray.filter(obj => { 
            return obj.id === +request.params.id
          }));
        case true:
          response.status(400).send("Your request was malformed. Only positive whole numbers allowed: " + request.params.id)
      }
      return;
    }
  
    // If no id specified in params, return full User list
    response.status(200).json(userArray);
  } catch (e: unknown) {
    // Catch with either an HTTP response or some logging and metrics to alert on
  }
};

app.get('/users/:id', getUsers);
app.get('/users', getUsers);

app.listen(port, () => {
  console.log(`Now running the CoolPlanet awesome backend on port ${port}.`);
});