

# Deploying to Google Cloud:
- Our code is deployed using a decoupled methodology keeping the client and server seperate in terms of compute and addresses.


## Path Ways:
`/Login` is used to login and take the Quiz if you are not logged in you are not able to take the Quiz
`/QuizFront` is a landing page for the Quiz 
`/Quiz` is where the actual Quiz is 
`/Results` is the returned value of Results
`/AccountHistory` is the past 5 Quiz results for a auth and logged in user

## Application Structure:

```
├── client
│   ├── public                  --> Holds our React public files (images static files) 
│   ├── src                     --> Contains our React app code 
│   ├── .gcloudignore           --> config for ignoring node_modules and builds for GCP.
│   ├── package-lock.json       --> NPM dependency state 
│   └── package.json            --> NPM dependency defined 
├── server
│   ├── .gcloudignore           --> config for ignoring node_modules and builds  
│   ├── app.yaml                --> config to start our Express.js server 
│   ├── index.js                --> Entry point for our Express.js server 
│   ├── package-lock.json       --> NPM dependency state  
│   └── package.json            --> NPM dependency defined  
├── .dockerignore               --> config for ignoring files for Docker 
├── .gcloudignore               --> config for ignoring node_modules and builds for GCP. 
├── .gitignore                  --> config for ignoring files in our git repo  
├── Dockerfile                  --> Docker file  
├── README.md                   --> This current file your reading now!  
├── app.yaml                    --> Config to start our react frotend for App engine.  
└── nginx.conf                  --> Config for nginx  
```


## Application Architecture:
- We are using 2 App Engine services for the frontend and backend.
- We are additionally using secrets manager to hold our API key and call it within the code.
- Firebase allows us to use Auth to store use credentials and their data

![App Struct](https://github.com/soniakhan7/bhealth-app/blob/main/app_struct.png)



## Google Cloud Services Used:
- [App Engine](https://cloud.google.com/appengine): Host our services and provide compute
- [Secrets Manager](https://cloud.google.com/secret-manager): Store our secrets safely for our API.

## Client:
- Holds the React Frontend and client calls for our API wrapper in the server code.
- Our client will call our backend API and display the returned JSON payload from Open.AI on our frontend.

### Client app.yaml:

- Using Node 18 because it is the current long term support build of node.
- We use regular expression to upload all the static files from our build of the react app.
- We use the index.html as the entry point to the rest of the app including static images. 

```
runtime: nodejs18

entrypoint: node index.js

handlers:
  # Serve static files from the "build" directory
  - url: /(.*\.(js|css|png|jpg|gif|ico|html|json|svg|eot|otf|ttf|woff|woff2))$
    static_files: client/build/\1
    upload: client/build/(.*\.(js|css|png|jpg|gif|ico|html|json|svg|eot|otf|ttf|woff|woff2))$

  # Serve the index.html file for all other requests
  - url: /.*
    static_files: client/build/index.html
    upload: client/build/index.html

  # Serve API requests from the Express.js server
  - url: /api/.*
    script: auto
```

### Client commands
0. `npm install`
1. `npm run build`
2. cd into root directory and run `gcloud app deploy` NOTE: must be authed in gcloud locally or using a service account


## Server:
- Runs the Express.js server where we make calls to Open.AI along with our secret manager request to keep our code secure.

### Server app.yaml:
- Using Node 18 because it is the current long term support build of node.
- We define our app route root which is `/api/`
- We use the index.js as the entry point in our express server.
- the service: defines the name of the service in gcp. 


```
runtime: nodejs18
service: apiserver

entrypoint: node index.js

handlers:
  # serve API requests from the Express.js server
  - url: /api/.*
    script: auto
 ```

### Server commands:
0. `npm install`
1. `gcloud app deploy`

### API Routes:

We define our api routes using best pratices of having a route `api` then following command. 
ex. `/api/hello`



#### GET `/api/hello`:
Returns: A string HTML 
Purpose: a health check to see if our API is up without hitting our other endpoints.

```
app.get('/api/hello', async(req, res) => {
    res.send("hello from express server");
});
```

#### POST `api/post-prompt`:
Returns: JSON payload from OpenAI after giving a prompt response.
Purpose: To handle our Response from OpenAI and serving to our frontend.

```
 app.post("/api/post-prompt", async (req, res) => {
        const { prompt } = req.body;

        const completion = await openai.createCompletion ({
            model: 'text-davinci-003',
            max_tokens: 400, 
            temperature: 0, 
            prompt: prompt,

        });
```




### Secret Handling:

We use an async function that returns a promise (an object we wait to retrive) that retrives our API key and uses in our API endpoint. 

This allows us to keep our secrets secured and usable by other services.

```
async function useApi() {
    try {
        const client = new SecretManagerServiceClient();
        const [version] = await client.accessSecretVersion({
            name: "projects/857505229555/secrets/chat_gpt_api_key/versions/latest",
        });
        const apiKey = version.payload.data.toString();
        return apiKey
    } catch (err) {
        console.error(err);
        return null;
    }
}



```







## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
