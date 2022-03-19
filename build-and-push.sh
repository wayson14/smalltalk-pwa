#!/bin/bash

version=$(cat package.json | jq .version | sed 's/"//g')
# (
    npm run build;
    cp -r build ../smalltalk-build/;
    cd ../smalltalk-build;
    echo $PWD &&
    git add . && git commit -m "$version" && git push -u origin main &&
    cd ../smalltalk-pwa;
# )

# sudo rm -rf /var/www/html/smalltalk/*
# cd
# sudo cp -r /home/ubuntu/smalltalk-build/build/* /var/www/html/smalltalk/
# sudo nginx -s reload
# sudo systemctl reload nginx