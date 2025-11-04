import {NumberToKorean} from './numbertokorean';

test('NumberToKorean.toKoreanUnits()', () => {
  type inout = {
    value: number | bigint;
    removeEmptyString: boolean;
    expected: string[];
  };

  const inputs: inout[] = [
    // number range
    {
      value: Number.MIN_SAFE_INTEGER - 1,
      removeEmptyString: false,
      expected: [],
    },
    {
      value: Number.MIN_SAFE_INTEGER,
      removeEmptyString: false,
      expected: ['-', '9007조', '1992억', '5474만', '991'],
    },
    {
      value: Number.MAX_SAFE_INTEGER,
      removeEmptyString: false,
      expected: ['9007조', '1992억', '5474만', '991'],
    },
    {
      value: Number.MAX_SAFE_INTEGER + 1,
      removeEmptyString: false,
      expected: [],
    },

    // bigint range
    {
      value: BigInt(Number.MIN_SAFE_INTEGER) - BigInt(2),
      removeEmptyString: false,
      expected: ['-', '9007조', '1992억', '5474만', '993'],
    },
    {
      value: BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1),
      removeEmptyString: false,
      expected: ['-', '9007조', '1992억', '5474만', '992'],
    },
    {
      value: BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1),
      removeEmptyString: false,
      expected: ['9007조', '1992억', '5474만', '992'],
    },
    {
      value: BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2),
      removeEmptyString: false,
      expected: ['9007조', '1992억', '5474만', '993'],
    },

    // int64 range
    {
      value: BigInt('-9223372036854775808') - BigInt(1),
      removeEmptyString: false,
      expected: [],
    },
    {
      value: BigInt('-9223372036854775808'),
      removeEmptyString: false,
      expected: ['-', '922경', '3372조', '368억', '5477만', '5808'],
    },
    {
      value: BigInt('-9223372036854775808') + BigInt(1),
      removeEmptyString: false,
      expected: ['-', '922경', '3372조', '368억', '5477만', '5807'],
    },
    {
      value: BigInt('9223372036854775807') - BigInt(1),
      removeEmptyString: false,
      expected: ['922경', '3372조', '368억', '5477만', '5806'],
    },
    {
      value: BigInt('9223372036854775807'),
      removeEmptyString: false,
      expected: ['922경', '3372조', '368억', '5477만', '5807'],
    },
    {
      value: BigInt('9223372036854775807') + BigInt(1),
      removeEmptyString: false,
      expected: [],
    },

    // near 0
    {
      value: -3,
      removeEmptyString: false,
      expected: ['-', '3'],
    },
    {
      value: -2,
      removeEmptyString: false,
      expected: ['-', '2'],
    },
    {
      value: -1,
      removeEmptyString: false,
      expected: ['-', '1'],
    },
    {
      value: 0,
      removeEmptyString: false,
      expected: ['0'],
    },
    {
      value: 1,
      removeEmptyString: false,
      expected: ['1'],
    },
    {
      value: 2,
      removeEmptyString: false,
      expected: ['2'],
    },
    {
      value: 3,
      removeEmptyString: false,
      expected: ['3'],
    },

    // floating numbers
    {
      value: -0.5,
      removeEmptyString: false,
      expected: [],
    },
    {
      value: 0.0,
      removeEmptyString: false,
      expected: ['0'],
    },
    {
      value: 0.5,
      removeEmptyString: false,
      expected: [],
    },
    {
      value: 1.0,
      removeEmptyString: false,
      expected: ['1'],
    },

    // removeEmptyString
    {
      value: -100010001,
      removeEmptyString: false,
      expected: ['-', '1억', '1만', '1'],
    },
    {
      value: -100010001,
      removeEmptyString: true,
      expected: ['-', '1억', '1만', '1'],
    },
    {
      value: -100010000,
      removeEmptyString: false,
      expected: ['-', '1억', '1만', ''],
    },
    {
      value: -100010000,
      removeEmptyString: true,
      expected: ['-', '1억', '1만'],
    },
    {
      value: -100000001,
      removeEmptyString: false,
      expected: ['-', '1억', '', '1'],
    },
    {
      value: -100000001,
      removeEmptyString: true,
      expected: ['-', '1억', '1'],
    },
  ];

  inputs.forEach(input => {
    expect(
      NumberToKorean.toKoreanUnits(input.value, input.removeEmptyString),
    ).toStrictEqual(input.expected);
  });
});

test('NumberToKorean.toKoreanLanguage()', () => {
  type inout = {
    value: number | bigint;
    isMonetary: boolean;
    removeEmptyString: boolean;
    expected: string[];
  };

  const inputs: inout[] = [
    // number range
    {
      value: Number.MIN_SAFE_INTEGER - 1,
      isMonetary: false,
      removeEmptyString: false,
      expected: [],
    },
    {
      value: Number.MIN_SAFE_INTEGER,
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '마이너스',
        '구천칠조',
        '천구백구십이억',
        '오천사백칠십사만',
        '구백구십일',
      ],
    },
    {
      value: Number.MAX_SAFE_INTEGER,
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '구천칠조',
        '천구백구십이억',
        '오천사백칠십사만',
        '구백구십일',
      ],
    },
    {
      value: Number.MAX_SAFE_INTEGER + 1,
      isMonetary: false,
      removeEmptyString: false,
      expected: [],
    },

    {
      value: BigInt(Number.MIN_SAFE_INTEGER) - BigInt(2),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '마이너스',
        '구천칠조',
        '천구백구십이억',
        '오천사백칠십사만',
        '구백구십삼',
      ],
    },
    {
      value: BigInt(Number.MIN_SAFE_INTEGER) - BigInt(1),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '마이너스',
        '구천칠조',
        '천구백구십이억',
        '오천사백칠십사만',
        '구백구십이',
      ],
    },
    {
      value: BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '구천칠조',
        '천구백구십이억',
        '오천사백칠십사만',
        '구백구십이',
      ],
    },
    {
      value: BigInt(Number.MAX_SAFE_INTEGER) + BigInt(2),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '구천칠조',
        '천구백구십이억',
        '오천사백칠십사만',
        '구백구십삼',
      ],
    },

    {
      value: BigInt('-9223372036854775808') - BigInt(1),
      isMonetary: false,
      removeEmptyString: false,
      expected: [],
    },
    {
      value: BigInt('-9223372036854775808'),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '마이너스',
        '구백이십이경',
        '삼천삼백칠십이조',
        '삼백육십팔억',
        '오천사백칠십칠만',
        '오천팔백팔',
      ],
    },
    {
      value: BigInt('-9223372036854775808') + BigInt(1),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '마이너스',
        '구백이십이경',
        '삼천삼백칠십이조',
        '삼백육십팔억',
        '오천사백칠십칠만',
        '오천팔백칠',
      ],
    },
    {
      value: BigInt('0'),
      isMonetary: false,
      removeEmptyString: false,
      expected: ['영'],
    },
    {
      value: BigInt('9223372036854775807') - BigInt(1),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '구백이십이경',
        '삼천삼백칠십이조',
        '삼백육십팔억',
        '오천사백칠십칠만',
        '오천팔백육',
      ],
    },
    {
      value: BigInt('9223372036854775807'),
      isMonetary: false,
      removeEmptyString: false,
      expected: [
        '구백이십이경',
        '삼천삼백칠십이조',
        '삼백육십팔억',
        '오천사백칠십칠만',
        '오천팔백칠',
      ],
    },
    {
      value: BigInt('9223372036854775807') + BigInt(1),
      isMonetary: false,
      removeEmptyString: false,
      expected: [],
    },

    // near 0
    {
      value: -3,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['마이너스', '삼'],
    },
    {
      value: -2,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['마이너스', '이'],
    },
    {
      value: -1,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['마이너스', '일'],
    },
    {
      value: 0,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['영'],
    },
    {
      value: 1,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['일'],
    },
    {
      value: 2,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['이'],
    },
    {
      value: 3,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['삼'],
    },

    // isMonetary and removeEmptyString
    {
      value: 10000,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['만', ''],
    },
    {
      value: 10000,
      isMonetary: false,
      removeEmptyString: true,
      expected: ['만'],
    },
    {
      value: 10000,
      isMonetary: true,
      removeEmptyString: false,
      expected: ['일만', ''],
    },
    {
      value: 10000,
      isMonetary: true,
      removeEmptyString: true,
      expected: ['일만'],
    },
    {
      value: 10001,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['만', '일'],
    },
    {
      value: 10001,
      isMonetary: false,
      removeEmptyString: true,
      expected: ['만', '일'],
    },
    {
      value: 10001,
      isMonetary: true,
      removeEmptyString: false,
      expected: ['일만', '일'],
    },
    {
      value: 10001,
      isMonetary: true,
      removeEmptyString: true,
      expected: ['일만', '일'],
    },
    {
      value: 11111,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['만', '천백십일'],
    },
    {
      value: 11111,
      isMonetary: false,
      removeEmptyString: true,
      expected: ['만', '천백십일'],
    },
    {
      value: 11111,
      isMonetary: true,
      removeEmptyString: false,
      expected: ['일만', '일천일백일십일'],
    },
    {
      value: 11111,
      isMonetary: true,
      removeEmptyString: true,
      expected: ['일만', '일천일백일십일'],
    },

    {
      value: 113560,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['십일만', '삼천오백육십'],
    },
    {
      value: 113560,
      isMonetary: false,
      removeEmptyString: true,
      expected: ['십일만', '삼천오백육십'],
    },
    {
      value: 113560,
      isMonetary: true,
      removeEmptyString: false,
      expected: ['일십일만', '삼천오백육십'],
    },
    {
      value: 113560,
      isMonetary: true,
      removeEmptyString: true,
      expected: ['일십일만', '삼천오백육십'],
    },

    {
      value: 315678,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['삼십일만', '오천육백칠십팔'],
    },
    {
      value: 315678,
      isMonetary: false,
      removeEmptyString: true,
      expected: ['삼십일만', '오천육백칠십팔'],
    },
    {
      value: 315678,
      isMonetary: true,
      removeEmptyString: false,
      expected: ['삼십일만', '오천육백칠십팔'],
    },
    {
      value: 315678,
      isMonetary: true,
      removeEmptyString: true,
      expected: ['삼십일만', '오천육백칠십팔'],
    },

    {
      value: 1765000,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['백칠십육만', '오천'],
    },
    {
      value: 1765000,
      isMonetary: false,
      removeEmptyString: true,
      expected: ['백칠십육만', '오천'],
    },
    {
      value: 1765000,
      isMonetary: true,
      removeEmptyString: false,
      expected: ['일백칠십육만', '오천'],
    },
    {
      value: 1765000,
      isMonetary: true,
      removeEmptyString: true,
      expected: ['일백칠십육만', '오천'],
    },

    {
      value: 11000000010000,
      isMonetary: false,
      removeEmptyString: false,
      expected: ['십일조', '', '만', ''],
    },
    {
      value: 11000000010000,
      isMonetary: false,
      removeEmptyString: true,
      expected: ['십일조', '만'],
    },
    {
      value: 11000000010000,
      isMonetary: true,
      removeEmptyString: false,
      expected: ['일십일조', '', '일만', ''],
    },
    {
      value: 11000000010000,
      isMonetary: true,
      removeEmptyString: true,
      expected: ['일십일조', '일만'],
    },
  ];

  inputs.forEach(input => {
    expect(
      NumberToKorean.toKoreanLanguage(
        input.value,
        input.isMonetary,
        input.removeEmptyString,
      ),
    ).toStrictEqual(input.expected);
  });
});
