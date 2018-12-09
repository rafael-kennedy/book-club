# Book Club Application

This is a fairly basic and currently incomplete book club application.

## Development instructions
There are currently two ways to develop this application

In a local environment, you can run both the front-end and backend with NODE_ENV=development

1. `> npm i` 
2. `> npm run dev`
3. `> npm run start:dev-server`

There is also an included docker compose file that will build the application in development mode. Currently, the front-end container does not install any dependencies to allow for rapid development without rebuilding the containers, but this requires you to install the dependencies manually

1. `> npm i`
2. `> docker-compose up`

Note that both of these options will run the backend server with inspect-brk on, so the backend will not respond until you have connected to the process with a debugger and issued a run command. This makes it possible to easily debug issues related to application initialization, but can be confusing on the first run.

The backend debugger is exposed at port 5533 so as not to conflict with the default node debugger port.
