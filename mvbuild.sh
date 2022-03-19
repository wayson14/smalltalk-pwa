#!/bin/bash

version=$(cat package.json | jq .version | sed 's/"//g')
(npm run build;
cp -r build ../smalltalk-build/;
cd $pwd/../smalltalk-build;
git add .; git commit -m "$version"; git push -u origin main)

# sudo rm -rf /var/www/html/smalltalk/*
# cd
# sudo cp -r /home/ubuntu/smalltalk-build/build/* /var/www/html/smalltalk/
# sudo nginx -s reload
# sudo systemctl reload nginx