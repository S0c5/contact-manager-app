deploy: build-app cp-files-to-nginx
	./bin/run-app.sh
letsencrypt:
	./bin/run-letsencrypt.sh
cp-files-to-nginx:
	rm -rf ./infrastructure/nginx/build
	cp -R app/build ./infrastructure/nginx/
prepare:
	cd api && npm install && cd ../app && npm install 
run-dev:
	./bin/launch-dev-env.sh
build-app:
	cd app && npm run build
db-local:
	docker-compose -f ./infrastructure/database/local-db.yml up -d
