#!/bin/bash
#sftp -b sftp-commands.txt -i ../../configs/second_instance_creation.pem ec2-user@ec2-54-89-197-93.compute-1.amazonaws.com
sftp -b sftp-commands.txt -i ../../configs/second_instance_creation.pem ec2-user@ec2-44-207-255-220.compute-1.amazonaws.com

#scp -P 23 /home/kalenpw/.m2/repository/com/Khalidor/TestPlugin/0.0.1-SNAPSHOT/TestPlugin-0.0.1-SNAPSHOT.jar kalenpw@184.155.136.254:/home/kalenpw/TestWorld/plugins
