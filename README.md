docker build -t my-first-image . <br>
docker run -dt --name my-first-container my-first-image <br>
docker ps -a <br>
docker images <br>
docker tag my-first-image user-name/my-first-repo:latest <br>
docker push user-name/my-first-repo:latest <br>
ansible-playbook -i inventory playbook.yml
