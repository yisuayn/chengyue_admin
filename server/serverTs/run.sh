# !/usr/bin/env bash
export PORT=3000
export TZ=Asia/Shanghai
# 运行环境
export SERVER_ENV=test
export HOSTNAME=paramecium
export VERSION=v1.1.0
export NUM_CPUS=1

if [ "$1" = "test" ]
then
	export SERVER_ENV=test
	export APOLLO_HOST=
	export APOLLO_CLUSTER=test
	export APOLLO_APP_ID=
	export APOLLO_SECRET=
	npm start
fi

if [ "$1" = "dev" ]
then 
	export SERVER_ENV=local
	export EGG_SERVER_ENV=test
	export APOLLO_HOST=http://localhost:8080
	export APOLLO_APP_ID=paramecium
	export APOLLO_SECRET=871faa1f8eb247e0a421436aacbb403b
	npm run dev
fi
