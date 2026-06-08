# numbertokorean-ts

[![CI](https://github.com/iloysoft/numbertokorean-ts/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/iloysoft/numbertokorean-ts/actions/workflows/ci.yml)
![Node.js](https://img.shields.io/badge/node-22%20%7C%2024%20%7C%2026-339933?logo=node.js&logoColor=white)

Library to convert `number` and `bigint` values into Sino-Korean `string[]`
representations.

## Install

Supported Node.js versions: 22.x through 26.x.

Install from GitHub:

```sh
npm install github:iloysoft/numbertokorean-ts
```

For local development:

```sh
git clone https://github.com/iloysoft/numbertokorean-ts.git
cd numbertokorean-ts
npm install
npm run build
```

## Usage

ESM:

```js
import {NumberToKorean} from 'numbertokorean-ts';

NumberToKorean.toKoreanUnits(123456789);
// ['1억', '2345만', '6789']

NumberToKorean.toKoreanLanguage(123456789);
// ['일억', '이천삼백사십오만', '육천칠백팔십구']

NumberToKorean.toKoreanLanguage(10000, {monetary: true});
// ['일만']
```

CommonJS:

```js
const {NumberToKorean} = require('numbertokorean-ts');

NumberToKorean.toKoreanUnits(123456789);
// ['1억', '2345만', '6789']
```

Browser bundle with a bundler:

```js
import {NumberToKorean} from 'numbertokorean-ts/numbertokorean.min.js';
```

Browser bundle served directly from this repository:

```js
import {NumberToKorean} from './dist/numbertokorean.min.js';
```

The browser bundle targets ES2020 runtimes. `bigint` input requires native
`BigInt` support.

## API

```ts
NumberToKorean.toKoreanUnits(
  value: number | bigint,
  options?: {
    removeEmptyString?: boolean; // default: true
  },
): string[];

NumberToKorean.toKoreanLanguage(
  value: number | bigint,
  options?: {
    monetary?: boolean; // default: false
    removeEmptyString?: boolean; // default: true
  },
): string[];
```

- `toKoreanUnits()` groups digits by Korean large-number units.
- `toKoreanLanguage()` converts each group into Sino-Korean text.
- `monetary` keeps explicit leading `일` in monetary-style readings.
- `removeEmptyString` removes empty unit groups from the returned array by
  default. Set it to `false` to preserve empty groups:

```js
NumberToKorean.toKoreanLanguage(11000000010000, {removeEmptyString: false});
// ['십일조', '', '만', '']
```

## Input Limits

- `number` inputs must be safe integers.
- `bigint` inputs must be within signed int64 range.
- Invalid inputs, floating-point values, unsafe integers, and out-of-range
  `bigint` values return `[]`.

## Reference

https://github.com/iloysoft/numbertokorean
