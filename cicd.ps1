#prepare back-end
#build image
cd .\backend
docker build -f Dockerfile -t volodymyr92/portfolio-back-end .

#public image
docker push volodymyr92/portfolio-back-end

#deploy to flyctl
flyctl deploy --ha=false

#prepare front-end
#build image
cd ../
docker build -f Dockerfile -t volodymyr92/portfolio-front-end .

#public image
docker push volodymyr92/portfolio-front-end

#deploy to flyctl
flyctl deploy --ha=false