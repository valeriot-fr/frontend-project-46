install:
	npm ci
publish:
	npm publish --dry-run
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.DEFAULT_GOAL := build-run

setup:
	./gradlew wrapper --gradle-version 8.5

clean:
	./gradlew clean

build:
	./gradlew clean build

run-dist:
	./build/install/java-package/bin/java-package

run:
	./gradlew run

report:
	./gradlew jacocoTestReport

check-deps:
	./gradlew dependencyUpdates -Drevision=release


build-run: build run

.PHONY: build