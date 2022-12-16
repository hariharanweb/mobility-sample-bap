## Running BAP as Docker

- Build image `docker build -t bap:latest .`
- Run the container `docker run -p 2010:2010 --name bap  -d bap:latest`
- Check the logs `docker logs -f bap`

## Development

- Copy `local.env` to `.env` 
- Run `npm start`
- To run watch mode `npm run watch`