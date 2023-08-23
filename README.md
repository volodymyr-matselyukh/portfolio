
# build image
docker build -f Dockerfile -t server .

# run container
docker run -p 3000:3000 server
