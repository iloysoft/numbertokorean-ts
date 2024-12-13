
all: build

.PHONY: build
build:
	npm run build

.PHONY: fix
fix:
	npm run fix

.PHONY: lint
lint:
	npm run lint

.PHONY: test
test:
	npm run test

.PHONY: coverage
coverage:
	npm run coverage

.PHONY: clean
clean:
	rm -f dist/*

