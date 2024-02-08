docker build -t my-first-image .
docker run -dt --name my-first-container my-first-image
docker ps -a
docker images
docker tag my-first-image user-name/my-first-repo:latest
docker push user-name/my-first-repo:latest
