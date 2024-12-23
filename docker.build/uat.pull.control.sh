#!/bin/bash
echo ; echo ;
pwd="/home/docker.build/snabb-portal-uat" ; cd $pwd ;
IMAGES_RELEASE="snabb_portal_uat"
IMAGES_AUTO="ezin-www:snabb-portal-uat"
AWS_ECR="646171399969.dkr.ecr.ap-southeast-1.amazonaws.com"

blue="/etc/nginx/conf.d/blue_core_admin_uat.conf"
green="/etc/nginx/conf.d/green_core_admin_uat.conf"

date=`date +%F_%H%M` ;
oldConfig="" ; newConfig="";

reloadNginx (){
  systemctl reload nginx
}

doStatus () {
  if [ -e $blue ]; then    echo "ActiveSite is: Blue, need build at only Green => test then Switch to Green" ;
    IMAGES=$IMAGES_GREEN ; oldConfig=$blue  ; newConfig=$green ;
  elif [ -e $green ]; then echo "ActiveSite is: Green, need build at only Blue => test then Switch to Blue"
    IMAGES=$IMAGES_BLUE  ; oldConfig=$green ; newConfig=$blue  ;
  else
    echo "Error ! No active site ";
    exit 1;
  fi
    echo; echo "Main site: https://portal.pvi.digital   || Stag site: https://portal-stag.pvi.digital " ;  echo ; echo ; echo ;
}

switch2GreenBlue () {
  doStatus
  if [ "$2" == "auto" ] ; then
     response="y"
  else
     read -r -p "Are you sure you want to switch? [y/N] " response
     response=${response,,}    # tolower
  fi

  if [[ "$response" =~ ^(yes|y)$ ]]
  then
    echo   "Switching Blue <=> Green" ;  echo ;
    rm -rf $oldConfig
    touch  $newConfig
    reloadNginx
    doStatus
  fi
  exit 0
}


doBuild () {
    # doStatus
    if [ "$2" == "auto" ] ; then
       echo "I sure .. you want to pull Images to ECR Auto. So do it"
       response=$IMAGES_AUTO;
       #########################################
       #########################################
       #########################################
       #ssh root@54.255.126.192  '/home/docker.build/api-ezin-vn/01.control.sh auto'
       AWS_PROFILE=ezin docker pull   $AWS_ECR/$IMAGES_AUTO
       #########################################
       #########################################
    else
     read -r -p "Which Images ECR 646171399969 want to switch? [vd: ezin-api:2022-04-21_1129] " response
     response=${response,,}    # tolower
    fi

    if [[ "$response" != "" ]]
     then
      echo   "Switching Images ECR Blue <=> Green with $response" ;  echo ;
      cp     docker-compose.yml                 .docker-compose.yml.backup.`date +%F_%N`
      cp     docker-compose.yml.template        docker-compose.yml

      sed -e "s/IMAGES_RELEASE/$response/g"     docker-compose.yml -i ;
      # if [ -e $blue ]; then    echo "ActiveSite is: Blue, need build Green then you test STAG to switch to Green"
      #    IMAGES=$IMAGES_GREEN ; oldConfig=$blue  ; newConfig=$green ;
      #    sed -e "s/IMAGES_RELEASE_GREEN/$response/g"     docker-compose.yml -i ;
      # elif [ -e $green ]; then echo "ActiveSite is: Green, need build Blue then you test STAG to switch to Blue"
      #    IMAGES=$IMAGES_BLUE  ; oldConfig=$green ; newConfig=$blue  ;
      #    sed -e "s/IMAGES_RELEASE_BLUE/$response/g"      docker-compose.yml -i ;
      # else
      #    echo "Error ! No active site "; exit;
      # fi
      #rm -rf $oldConfig
      #touch  $newConfig
    fi
    # IMAGES=$IMAGES_BLUE
    docker-compose up -d $IMAGES_RELEASE
    # docker-compose up -d $IMAGES_CRON
    #reloadNginx
    #doStatus

}
doCheckServerStatus () {
  if [ "$2" == "auto" ] ; then
     response="y"
  else
     read -r -p "Are you sure you want to check server status and switch? [y/N] " response
     response=${response,,}    # tolower
  fi

  if [[ "$response" =~ ^(yes|y)$ ]]; then
    echo "Checking server status"
    while true; do
      status=$(curl -LI https://portal-stag.pvi.digital -o /dev/null -w '%{http_code}\n' -s)
      echo $status
      if [ "$status" = "200" ]; then
        echo "Server is $status, then switching server"
        switch2GreenBlue "$1" "$2"
        break
      else
        echo "Server is not ready, then waiting 3s before send new request to server"
        sleep 3
      fi
    done
      echo "Switch server completed"
  fi
}

doUpdate () {
    #doStatus
    #sed "/ENV UpdateBuild=/c\ENV UpdateBuild=${date}" Dockerfile -i
    #docker-compose build $IMAGES
    #docker-compose up -d $IMAGES
    echo "Nothing doing  now ... yet !"
}
# Now some action
case "$1" in
    build)
      doBuild $1 $2
      ;;
    update)
      doUpdate
      ;;
    switch)
      doCheckServerStatus $1 $2
      ;;
    status)
      doStatus
      ;;
    *)
      echo "Arg: status || build || update || switch || status" ; echo
      doStatus
      ;;
esac
exit