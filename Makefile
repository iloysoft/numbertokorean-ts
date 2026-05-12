all: build

.PHONY: all build fix lint test smoke-entrypoints coverage clean pack-dry-run

build:
	npm run build

fix:
	npm run fix

lint:
	npm run lint

test:
	npm run test

smoke-entrypoints:
	npm run smoke:entrypoints

coverage:
	npm run coverage

pack-dry-run:
	npm pack --dry-run --ignore-scripts

clean:
	npm run clean
