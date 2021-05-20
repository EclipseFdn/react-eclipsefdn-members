compile-java: validate-spec;
	mvn clean compile package
compile-react: install-react;
	cd src/main/www && yarn build
compile: clean compile-react compile-java;
	docker build -f src/main/docker/Dockerfile.jvm -t eclipsefdn/membership-rest-api .
clean:;
	mvn clean
	rm -rf src/main/resources/META-INF/*
install-react:;
	cd src/main/www && yarn install --frozen-lockfile
install-spec:;
	cd spec && yarn install --frozen-lockfile
validate-spec: install-spec;
	cd spec && yarn test


