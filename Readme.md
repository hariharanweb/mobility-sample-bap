## Mobility ONDC BAP

- Add these entries to `/etc/hosts`
```
127.0.0.1 mobility-sample-bap
127.0.0.1 sample-gateway-registry
127.0.0.1 mobility-sample-bpp
```
- This is sample mobility BAP
- Runs on http://mobility-sample-bap:2010

## Running locally

- Copy `local.env` to `.env` 
- Run `npm start`
- To run in watch mode `npm run watch`

## Running BAP as Docker

- Build image `docker build -t mobility-sample-bap:latest .`
- Run the container `docker run -p 2010:2010 --name mobility-sample-bap -d mobility-sample-bap:latest --add-host gateway:127.0.0.1`
- Check the logs `docker logs -f mobility-sample-bap`
