deploy: build-app cp-files-to-nignx
	./bin/run-app.sh
letsencrypt:
	./bin/run-letsencrypt.sh
cp-files-to-nignx:
	rm -rf ./nginx/build
	cp -R app/build ./nginx/
prepare:
	cd api && npm install && cd ../app && npm install 
run-dev:
	./bin/launch-dev-env.sh
build-app:
	cd app && npm run build
db-local:
	docker-compose -f ./infrastructure/local-db.yml up -d
