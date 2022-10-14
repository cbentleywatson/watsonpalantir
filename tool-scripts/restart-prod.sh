#ssh -i ../../configs/second_instance_creation.pem ec2-user@ec2-54-89-197-93.compute-1.amazonaws.com  < restart-prod-commands.txt
ssh -i ../../configs/second_instance_creation.pem ec2-user@ec2-44-207-255-220.compute-1.amazonaws.com 'docker-compose -f docker-compose-production.yml down; docker-compose -f docker-compose-production.yml up -d; exit'
