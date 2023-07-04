# React e-commerce Starter

This is a basic starter for building an e-commerce site using tRPC and ReactJS.

The end goal here is a full fledged monorepo that will include examples using tRPC, a GraphQL endpoint, and a REST endpoint to allow the developer to choose which data-getting method makes sense on a per project basis.

tRPC will be the first backend to be implemented.

## Development Instructions

This project assumes that you have a postgres database running and reachable by the server code via prisma.

Reference the provided `docker-compose.yml` and `example.env` files in order to get this up and running.

Once the database is running the `yarn start` command in the root of the project will start both the server and client.

## To-do

### Server

- [ ] Add user sign up / login
- [ ] Role assignment in admin
- [ ] DB seeding script
- [ ] WS Subscriptions
- [ ] GraphQL endpoint
- [ ] Redis cache setup

### Client

- [ ] Login/signup page
- [ ] Admin (user management) dashboard
- [ ] Item & product management dashboard
- [ ] Branding / MD parsing
