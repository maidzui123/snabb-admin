#!/bin/bash
  
pwd="/home/docker.build/snabb-portal-uat" ; cd $pwd ;
IMAGES_PROD="snabb_portal_uat_auto:latest"
IMAGES_RELEASE="snabb_portal_uat_auto:`date +%F_%H%M`"
IMAGES_AUTO="ezin-www:snabb-portal-uat"

ECR="646171399969.dkr.ecr.ap-southeast-1.amazonaws.com"

if [ "$1" == "auto" ] ; then
   echo "This is snabb-portal-uat .. push Images to ECR Auto. So do it"
   docker tag  $IMAGES_PROD $ECR/$IMAGES_AUTO
   AWS_PROFILE=ezin docker push             $ECR/$IMAGES_AUTO
   echo "Auto URI Images is: $ECR/$IMAGES_AUTO"
   exit 0;
fi


read -r -p "Are you sure you want to push Images to ECR? [y/N] " response
  response=${response,,}    # tolower
  if [[ "$response" =~ ^(no|n)$ ]]
  then
    echo   "Nothing do with switching Blue <=> Green" ;  echo ;
    exit 0
fi

docker tag $IMAGES_PROD $ECR/$IMAGES_RELEASE
AWS_PROFILE=ezin docker push $ECR/$IMAGES_RELEASE


echo ; echo;
echo "Please copy images:tags URI to Prod: $IMAGES_RELEASE"
echo "Full URI Images is: $ECR/$IMAGES_RELEASE"
echo
echo
exit;