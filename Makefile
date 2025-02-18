install:
	npm ci
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx jest --coverage
test-coverage:
	npm test -- --coverage --coverageProvider=v8