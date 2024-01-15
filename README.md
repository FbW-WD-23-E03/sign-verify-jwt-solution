# Signing and verifying JSON Web Tokens (JWT)

This assignment will have you building a backend service, which signs and verifies tokens (JWT)

## What you will be doing

## Tasks

### Task 1 - Installing the jsonwebtoken library

Read the documentation for, and install the npm library [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

> Note: Some libraries will tell you to use `require()`, but since we are using ES6 modules, we can use the `import` keyword

### Task 2 - Creating a secret key

Since signing our tokens requires a secret key, we will use the dotenv library and a .env file to store our secret

1. Install the npm library [dotenv](https://www.npmjs.com/package/dotenv)
2. Create a new file `.env`, and create the property `SECRET_KEY` with a random string
3. Import and run the dotenv `config()` function inside `server.js`

### Task 3 - Generating the token

1. Create a `utils` folder in the root of your project
2. Create the file `jwt.js`
3. Import the `jsonwebtoken` library

### Task 4 - Generating the token (continued)

Now write a `signToken` function which;

1. Has a **user** (object) as a parameter
2. Creates a `payload` variable which contains the `email` and `_id` properties from the **user** object
3. Uses the `sign` method from the `jsonwebtoken` library to create a token with the `payload` variable
4. Use the following configuration object to set an expiry date of 1 hour from now `{ expiresIn: '1h' }`

> Don't forget to use the value stored at `process.env.SECRET_KEY` to sign your token!
> Also, include your `payload` variable in the token when signing it

#### Example

```js
jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
```

### Task 5 - Verifying a token

In the same file, create a `verifyToken` function which;

1. Receives a token (string) parameter
2. Uses the `verify` method from the `jsonwebtoken` library to verify the token
3. Returns the value from the `verify` function

> You will also need the `process.env.SECRET_KEY` property when verifying your token!

### Task 6

Export your functions `signToken` and `verifyToken` from `jwt.js`

### Task 7 - Handling the login behavior

In the file `routes/user.js`, in the request handler for the endpoint `"/login"`;

1. Search for the user in the array exported from `database.js`, using the JSON **body** `email` property
2. If the user can not be found, or the properties `email` or `password` do not exist;
   - Return a **404** error to the user
3. If the user can be found;
   - Check the passwords match using the JSON **body** `password` property
   - Import and use the function `signToken` to create a **JSON web token**, and return the **token** to the user in your response

### Task 8 - Handling the verify behavior

In the file `routes/user.js`, in the request handler for your endpoint `"/verify"`;

1. Import and use the function `verifyToken`
2. Extract the JSON **body** `token` property, and run it through the `verifyToken` function
3. If the `verifyToken` function throws an error, or the `token` property does not exist;
   - **catch** the error and,
   - Return a **401** "unauthorized" error to the user
4. If the `verifyToken` function does not throw an error, it will return the token payload
   - Return the payload to the user

### Task 9 - Testing

Test your application with an API testing tool, sending the correct JSON data as required per endpoint

The _login_ path should be `http://localhost:3001/login`, and expects a JSON object like this:

```json
{
   "email": "nbiffen8@ycombinator.com",
   "password: "jfmdkdir"
}
```

The _verify_ path should be `http://localhost:3001/verify` and expects a JSON object like this:

```json
{
  "token": "r9i395i9fw04309tgajgoiajgd09gq59jgeaihpoifdjaeprhgduzihiea"
}
```

> Make sure you are sending POST requests!
