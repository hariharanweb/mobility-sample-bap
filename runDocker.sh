docker network inspect ondc-network --format {{.Id}} 2>/dev/null || docker network create ondc-network
docker build -t mobility-sample-bap:latest .
docker stop mobility-sample-bap || true && docker rm mobility-sample-bap || true
docker run --network=ondc-network -p 2010:2010 --name mobility-sample-bap --env-file docker.env -d mobility-sample-bap:latest 