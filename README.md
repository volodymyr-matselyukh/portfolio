
# build image
docker build -f Dockerfile -t server .

# scale down machines
fly scale count 0

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

# setting up domain
https://fly.io/docs/app-guides/custom-domains-with-fly/#teaching-your-app-about-custom-domains

flyctl ips list

flyctl certs create portfolioapi.matseliukh.com

creating CNAME record(type CNAME, name: portfolioapi., value: matseliukh-portfolio-back-end.fly.dev)

# tailwind styles build
npx tailwindcss -i ./src/tailwind/input.css -o ./src/tailwind/tailwind.css --watch

# modifying files in bash
https://www.howtoforge.com/faq/how-to-edit-files-on-the-command-line

# setting up ssl for localhost
https://medium.com/@praveenmobdev/localhost-as-https-with-reactjs-app-on-windows-a1270d7fbd1f

