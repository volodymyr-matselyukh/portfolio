
# build image
docker build -f Dockerfile -t server .

# run container
docker run -p 3000:3000 server

# shell into container
docker exec -it clientserver /bin/bash

# installing curl
apk update
apk upgrade
apk add curl
https://www.cyberciti.biz/faq/how-to-install-curl-on-alpine-linux/

# set secrets
flyctl secrets set [flags] NAME=VALUE NAME=VALUE ...

# connect to shell
fly ssh console

