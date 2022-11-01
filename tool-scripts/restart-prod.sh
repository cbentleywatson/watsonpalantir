#ssh -i ../../configs/second_instance_creation.pem ec2-user@ec2-54-89-197-93.compute-1.amazonaws.com  < restart-prod-commands.txt
#ssh -i ../../configs/second_instance_creation.pem ec2-user@ec2-44-207-255-220.compute-1.amazonaws.com 'docker-compose -f docker-compose-production.yml down; docker-compose -f docker-compose-production.yml up -d; exit'
cd ../pal-clone
docker build -t cbentleywatson/pal-front-end .

cd ../back-end
docker build -t cbentleywatson/pal-back-end .

cd ../tool-scripts
#cd ../
#docker compose up

docker push cbentleywatson/pal-front-end
docker push cbentleywatson/pal-back-end
ssh-keygen -R 44.207.255.220 # Prevents the ssh command from asking for yes on ssh entry
ssh -i ../../configs/second_instance_creation.pem ec2-user@ec2-44-207-255-220.compute-1.amazonaws.com 'docker-compose  down --rmi all; docker-compose up -d; exit'