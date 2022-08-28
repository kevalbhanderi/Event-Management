# Event-Management

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) and NPM
- A MongoDb database.

### 1.2 Project configuration

Start by cloning this project on your workstation.

``` sh
git clone git@github.com:kevalbhanderi/Event-Management.git my-project
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./my-project
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
cp .env.example .env
vi .env
```

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# Launch the development server
npm run start:dev
```

You can now head to `http://localhost:3000/api` and see your API Swagger docs. The example register API is located at the `http://localhost:3000/api/v1/register` endpoint.

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── modules
│   ├── app.module.ts
│   ├── auth/  # The auth module contains authentiction service used in the whole application
|   |   ├── register/
|   |   ├── login/
│   ├── event/  # A module example that manages "event"
│   │   ├── controller/
│   │   │   └── event.controller.ts
│   │   ├── event.module.ts
│   │   ├── service/
│   │   │   └── event.service.ts
|   |   profile/ # A module that manages "user profile"
|   |   ├── controller/
│   │   │   └── profile.controller.ts
│   │   ├── profile.module.ts
│   │   ├── service/
│   │   │   └── profile.service.ts
└── main.ts
```

## 3. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application using the transpiled NodeJS
npm run start
# Run the application using "ts-node"
npm run start:dev
# Transpile the TypeScript files
npm run build
```
