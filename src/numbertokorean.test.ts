import {NumberToKorean} from './numbertokorean';

test('NumberToKorean.toKoreanUnits()', () => {
  // number range
  expect(
    NumberToKorean.toKoreanUnits(Number.MIN_SAFE_INTEGER - 1),
  ).toStrictEqual([]);
  expect(NumberToKorean.toKoreanUnits(Number.MIN_SAFE_INTEGER)).toStrictEqual([
    '-',
    '9007조',
    '1992억',
    '5474만',
    '991',
  ]);
  expect(NumberToKorean.toKoreanUnits(Number.MAX_SAFE_INTEGER)).toStrictEqual([
    '9007조',
    '1992억',
    '5474만',
    '991',
  ]);
  expect(
    NumberToKorean.toKoreanUnits(Number.MAX_SAFE_INTEGER + 1),
  ).toStrictEqual([]);

  // bigint range
  expect(
    NumberToKorean.toKoreanUnits(BigInt(Number.MIN_SAFE_INTEGER) - BigInt(2)),
  ).toStrictEqual(['-', '9007조', '1992억', '5474만', '993']);
  expect(
    NumberToKorean.toKoreanUnits(BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1)),
  ).toStrictEqual(['-', '9007조', '1992억', '5474만', '992']);
  expect(
    NumberToKorean.toKoreanUnits(BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1)),
  ).toStrictEqual(['9007조', '1992억', '5474만', '992']);
  expect(
    NumberToKorean.toKoreanUnits(BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2)),
  ).toStrictEqual(['9007조', '1992억', '5474만', '993']);

  // int64 range
  expect(
    NumberToKorean.toKoreanUnits(BigInt('-9223372036854775808') - BigInt(1)),
  ).toStrictEqual([]);
  expect(
    NumberToKorean.toKoreanUnits(BigInt('-9223372036854775808')),
  ).toStrictEqual(['-', '922경', '3372조', '368억', '5477만', '5808']);
  expect(
    NumberToKorean.toKoreanUnits(BigInt('-9223372036854775808') + BigInt(1)),
  ).toStrictEqual(['-', '922경', '3372조', '368억', '5477만', '5807']);
  expect(
    NumberToKorean.toKoreanUnits(BigInt('9223372036854775807') - BigInt(1)),
  ).toStrictEqual(['922경', '3372조', '368억', '5477만', '5806']);
  expect(
    NumberToKorean.toKoreanUnits(BigInt('9223372036854775807')),
  ).toStrictEqual(['922경', '3372조', '368억', '5477만', '5807']);
  expect(
    NumberToKorean.toKoreanUnits(BigInt('9223372036854775807') + BigInt(1)),
  ).toStrictEqual([]);

  expect(NumberToKorean.toKoreanUnits(-3)).toStrictEqual(['-', '3']);
  expect(NumberToKorean.toKoreanUnits(-2)).toStrictEqual(['-', '2']);
  expect(NumberToKorean.toKoreanUnits(-1)).toStrictEqual(['-', '1']);
  expect(NumberToKorean.toKoreanUnits(0)).toStrictEqual(['0']);
  expect(NumberToKorean.toKoreanUnits(1)).toStrictEqual(['1']);
  expect(NumberToKorean.toKoreanUnits(2)).toStrictEqual(['2']);
  expect(NumberToKorean.toKoreanUnits(3)).toStrictEqual(['3']);

  expect(NumberToKorean.toKoreanUnits(-0.5)).toStrictEqual([]);
  expect(NumberToKorean.toKoreanUnits(0.0)).toStrictEqual(['0']);
  expect(NumberToKorean.toKoreanUnits(0.5)).toStrictEqual([]);
  expect(NumberToKorean.toKoreanUnits(1.0)).toStrictEqual(['1']);

  expect(NumberToKorean.toKoreanUnits(-100010001)).toStrictEqual([
    '-',
    '1억',
    '1만',
    '1',
  ]);
  expect(NumberToKorean.toKoreanUnits(-100010001, true)).toStrictEqual([
    '-',
    '1억',
    '1만',
    '1',
  ]);
  expect(NumberToKorean.toKoreanUnits(-100010000)).toStrictEqual([
    '-',
    '1억',
    '1만',
    '',
  ]);
  expect(NumberToKorean.toKoreanUnits(-100010000, true)).toStrictEqual([
    '-',
    '1억',
    '1만',
  ]);
  expect(NumberToKorean.toKoreanUnits(-100000001)).toStrictEqual([
    '-',
    '1억',
    '',
    '1',
  ]);
  expect(NumberToKorean.toKoreanUnits(-100000001, true)).toStrictEqual([
    '-',
    '1억',
    '1',
  ]);
});

test('NumberToKorean.toKoreanLanguage()', () => {
  // number range
  expect(
    NumberToKorean.toKoreanLanguage(Number.MIN_SAFE_INTEGER - 1),
  ).toStrictEqual([]);
  expect(
    NumberToKorean.toKoreanLanguage(Number.MIN_SAFE_INTEGER),
  ).toStrictEqual([
    '마이너스',
    '구천칠조',
    '천구백구십이억',
    '오천사백칠십사만',
    '구백구십일',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(Number.MAX_SAFE_INTEGER),
  ).toStrictEqual([
    '구천칠조',
    '천구백구십이억',
    '오천사백칠십사만',
    '구백구십일',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(Number.MAX_SAFE_INTEGER + 1),
  ).toStrictEqual([]);

  // bigint range
  expect(
    NumberToKorean.toKoreanLanguage(
      BigInt(Number.MIN_SAFE_INTEGER) - BigInt(2),
    ),
  ).toStrictEqual([
    '마이너스',
    '구천칠조',
    '천구백구십이억',
    '오천사백칠십사만',
    '구백구십삼',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(
      BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1),
    ),
  ).toStrictEqual([
    '마이너스',
    '구천칠조',
    '천구백구십이억',
    '오천사백칠십사만',
    '구백구십이',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(
      BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1),
    ),
  ).toStrictEqual([
    '구천칠조',
    '천구백구십이억',
    '오천사백칠십사만',
    '구백구십이',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(
      BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2),
    ),
  ).toStrictEqual([
    '구천칠조',
    '천구백구십이억',
    '오천사백칠십사만',
    '구백구십삼',
  ]);

  // int64 range
  expect(
    NumberToKorean.toKoreanLanguage(BigInt('-9223372036854775808') - BigInt(1)),
  ).toStrictEqual([]);
  expect(
    NumberToKorean.toKoreanLanguage(BigInt('-9223372036854775808')),
  ).toStrictEqual([
    '마이너스',
    '구백이십이경',
    '삼천삼백칠십이조',
    '삼백육십팔억',
    '오천사백칠십칠만',
    '오천팔백팔',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(BigInt('-9223372036854775808') + BigInt(1)),
  ).toStrictEqual([
    '마이너스',
    '구백이십이경',
    '삼천삼백칠십이조',
    '삼백육십팔억',
    '오천사백칠십칠만',
    '오천팔백칠',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(BigInt('9223372036854775807') - BigInt(1)),
  ).toStrictEqual([
    '구백이십이경',
    '삼천삼백칠십이조',
    '삼백육십팔억',
    '오천사백칠십칠만',
    '오천팔백육',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(BigInt('9223372036854775807')),
  ).toStrictEqual([
    '구백이십이경',
    '삼천삼백칠십이조',
    '삼백육십팔억',
    '오천사백칠십칠만',
    '오천팔백칠',
  ]);
  expect(
    NumberToKorean.toKoreanLanguage(BigInt('9223372036854775807') + BigInt(1)),
  ).toStrictEqual([]);

  expect(NumberToKorean.toKoreanLanguage(-3)).toStrictEqual(['마이너스', '삼']);
  expect(NumberToKorean.toKoreanLanguage(-2)).toStrictEqual(['마이너스', '이']);
  expect(NumberToKorean.toKoreanLanguage(-1)).toStrictEqual(['마이너스', '일']);
  expect(NumberToKorean.toKoreanLanguage(0)).toStrictEqual(['영']);
  expect(NumberToKorean.toKoreanLanguage(1)).toStrictEqual(['일']);
  expect(NumberToKorean.toKoreanLanguage(2)).toStrictEqual(['이']);
  expect(NumberToKorean.toKoreanLanguage(3)).toStrictEqual(['삼']);

  expect(NumberToKorean.toKoreanLanguage(113560, false, false)).toStrictEqual([
    '십일만',
    '삼천오백육십',
  ]);
  expect(NumberToKorean.toKoreanLanguage(113560, false, true)).toStrictEqual([
    '십일만',
    '삼천오백육십',
  ]);
  expect(NumberToKorean.toKoreanLanguage(113560, true, false)).toStrictEqual([
    '일십일만',
    '삼천오백육십',
  ]);
  expect(NumberToKorean.toKoreanLanguage(113560, true, true)).toStrictEqual([
    '일십일만',
    '삼천오백육십',
  ]);

  expect(NumberToKorean.toKoreanLanguage(315678, false, false)).toStrictEqual([
    '삼십일만',
    '오천육백칠십팔',
  ]);
  expect(NumberToKorean.toKoreanLanguage(315678, false, true)).toStrictEqual([
    '삼십일만',
    '오천육백칠십팔',
  ]);
  expect(NumberToKorean.toKoreanLanguage(315678, true, false)).toStrictEqual([
    '삼십일만',
    '오천육백칠십팔',
  ]);
  expect(NumberToKorean.toKoreanLanguage(315678, true, true)).toStrictEqual([
    '삼십일만',
    '오천육백칠십팔',
  ]);

  expect(NumberToKorean.toKoreanLanguage(1765000, false, false)).toStrictEqual([
    '백칠십육만',
    '오천',
  ]);
  expect(NumberToKorean.toKoreanLanguage(1765000, false, true)).toStrictEqual([
    '백칠십육만',
    '오천',
  ]);
  expect(NumberToKorean.toKoreanLanguage(1765000, true, false)).toStrictEqual([
    '일백칠십육만',
    '오천',
  ]);
  expect(NumberToKorean.toKoreanLanguage(1765000, true, true)).toStrictEqual([
    '일백칠십육만',
    '오천',
  ]);

  expect(
    NumberToKorean.toKoreanLanguage(11000000010000, false, false),
  ).toStrictEqual(['십일조', '', '만', '']);
  expect(
    NumberToKorean.toKoreanLanguage(11000000010000, false, true),
  ).toStrictEqual(['십일조', '만']);
  expect(
    NumberToKorean.toKoreanLanguage(11000000010000, true, false),
  ).toStrictEqual(['일십일조', '', '일만', '']);
  expect(
    NumberToKorean.toKoreanLanguage(11000000010000, true, true),
  ).toStrictEqual(['일십일조', '일만']);
});
