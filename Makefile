install:
	npm install
lint:
	npx eslint .
test:
	npm test
test-watch:
	npm run test:watch
coverage:
	npm run coverage
publish:
	npm publish --dry-run


