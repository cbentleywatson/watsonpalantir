cwd=$(pwd)
# Directory names MUST end with /
PROJECT_PATH="../" # script is in the tool-scripts directory

FRONT_END_DIR="pal-clone/"
FRONT_END_REPO_NAME="cbentleywatson/pal-front-end"

BACK_END_DIR="back-end/"
BACK_END_REPO_NAME="cbentleywatson/pal-back-end"

FRONT_END_INTERNAL_PORT="3000"
FRONT_END_EXTERNAL_PORT="3000"

BACK_END_INTERNAL_PORT="5011"
BACK_END_EXTERNAL_PORT="5011"

FRONT_END_IMAGE_NAME="synchronized-front-end"
BACK_END_IMAGE_NAME="synchronized-back-end"

function build_both(){
cd $PROJECT_PATH$FRONT_END_DIR
docker build -t $FRONT_END_REPO_NAME .
cd $cwd

cd $PROJECT_PATH$BACK_END_DIR
docker build -t $BACK_END_REPO_NAME .
cd $cwd
}



function run_both(){
	docker run -d --name $FRONT_END_IMAGE_NAME -p $FRONT_END_EXTERNAL_PORT:$FRONT_END_INTERNAL_PORT $FRONT_END_REPO_NAME
	docker run -d --name $BACK_END_IMAGE_NAME  -p $BACK_END_EXTERNAL_PORT:$BACK_END_INTERNAL_PORT $BACK_END_REPO_NAME
}

function stop_both(){
	docker stop $FRONT_END_IMAGE_NAME
	docker stop $BACK_END_IMAGE_NAME
}

function rm_both(){
	docker rm $FRONT_END_IMAGE_NAME
	docker rm $BACK_END_IMAGE_NAME
}

# echo $1
if [ $1 == "build" ]; then
	echo "IN BUILD!!!!"
	build_both
fi

if [ $1 == "stop" ]; then
	echo "IN STOP"
	stop_both
fi


if [ $1 == "run" ]; then
	stop_both
	rm_both	
	echo "IN RUN!!!!"
	run_both
fi

if [ $1 == "all" ]; then 
	echo "IN ALL"
	build_both
	run_both
fi

if [ $1 == "local-containers" ]; then 
	echo "IN local_containers"
	stop_both
	rm_both
	build_both
	cd ../
	docker compose up
fi


# echo "Not a valid arg -- Valid args are build, run, stop (actually does a full remove rn), and all"



