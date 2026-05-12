import assert from 'node:assert/strict';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

const esm = await import('numbertokorean-ts');
assert.deepEqual(esm.NumberToKorean.toKoreanLanguage(10001), [
  '만',
  '일',
]);

const cjs = require('numbertokorean-ts');
assert.deepEqual(cjs.NumberToKorean.toKoreanUnits(10001), ['1만', '1']);

const browser = await import('numbertokorean-ts/numbertokorean.min.js');
assert.deepEqual(
  browser.NumberToKorean.toKoreanLanguage(123456789),
  ['일억', '이천삼백사십오만', '육천칠백팔십구'],
);
