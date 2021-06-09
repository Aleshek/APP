# plain-javascript-in-docker
JavaScript + HTML to render Hello Page 


IMPORTANT NOTES:

    1. The backend endpoint host url can be accessed using "API_URL" property (mentioned in env.js). An example is shown in index.js.
    2. PLEASE USE THIS PROPERTY ("API_URL") WHEN YOU ARE TRYING TO CALL A BACKEND API. 
    3. When testing in your local environment, please change API_URL to http://localhost:8080.
    4. Before committing your solution, ENSURE THAT YOU CHANGE THE API_URL TO 'http://restapi:8080' ELSE YOUR SUBMISSION WILL NOT BE SCORED.
    5. Also, ensure that env.js must be the first file that must be loaded so that API_URL is accessible in subsequent files.

PROJECT START STEPS:

    Pre-requisites:
    1. Install http-server module (https://www.npmjs.com/package/http-server).

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following command(s) in the terminal/command line:    
            - http-server ./ -p 4200 -a 0.0.0.0
    
    2. Go to http://localhost:4200 in your browser to view it.
