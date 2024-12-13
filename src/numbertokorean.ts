export abstract class NumberToKorean {
  private static minus = '마이너스';
  private static zero = '영';
  private static unitsBig = ['', '만', '억', '조', '경']; // in reverse order
  private static unitsSmall = ['천', '백', '십'];
  private static numbersImplicit = [
    '',
    '',
    '이',
    '삼',
    '사',
    '오',
    '육',
    '칠',
    '팔',
    '구',
  ];
  private static numbersExplicit = [
    '',
    '일',
    '이',
    '삼',
    '사',
    '오',
    '육',
    '칠',
    '팔',
    '구',
  ];

  private static trimLeft(s: string, cut: string): string {
    if (cut.length > s.length) {
      return s;
    }

    while (s.startsWith(cut)) {
      s = s.substring(cut.length);
    }

    return s;
  }

  private static parseNumber(n: number | bigint): string[] {
    if (typeof n === 'number') {
      if (!Number.isSafeInteger(n)) {
        return [];
      }
      if (n === 0) {
        return ['0'];
      }
    } else if (typeof n === 'bigint') {
      if (
        n < BigInt('-9223372036854775808') ||
        n > BigInt('9223372036854775807')
      ) {
        // out of int64 range
        return [];
      }
      if (n === BigInt(0)) {
        return ['0'];
      }
    }

    let neg = false;
    if (n < 0) {
      neg = true;
      n = -n;
    }

    const ret: string[] = [];

    const s = n.toString();

    let prevPos = s.length;
    for (let i = prevPos - 4; ; i = i - 4) {
      if (i < 0) {
        i = 0;
      }

      ret.push(this.trimLeft(s.substring(i, prevPos), '0'));

      if (i === 0) {
        break;
      } else {
        prevPos = i;
      }
    }

    if (neg) {
      ret.push('-');
    }

    return ret;
  }

  public static toKoreanUnits(
    n: number | bigint,
    removeEmptyString = false,
  ): string[] {
    if (typeof n !== 'number' && typeof n !== 'bigint') {
      return [];
    }

    let ret = this.parseNumber(n);
    let dst = 0;

    for (let src = 0; src < ret.length; src++) {
      if (!removeEmptyString) {
        dst = src;
      }

      if (ret[src] !== '') {
        if (ret[src] !== '-') {
          ret[dst] = ret[src] + this.unitsBig[src];
        } else {
          ret[dst] = '-';
        }
        dst += 1;
      }
    }

    if (removeEmptyString) {
      for (let i = dst; i < ret.length; i++) {
        ret[i] = '';
      }
      ret = ret.slice(0, dst);
    }

    ret.reverse();

    return ret;
  }

  private static ascii(c: string): number {
    return c.charCodeAt(0);
  }

  private static splitNumberByDigits(s: string): number[] {
    const ascii0 = this.ascii('0');
    switch (s.length) {
      case 4:
        return [
          this.ascii(s[0]) - ascii0,
          this.ascii(s[1]) - ascii0,
          this.ascii(s[2]) - ascii0,
          this.ascii(s[3]) - ascii0,
        ];
      case 3:
        return [
          0,
          this.ascii(s[0]) - ascii0,
          this.ascii(s[1]) - ascii0,
          this.ascii(s[2]) - ascii0,
        ];
      case 2:
        return [0, 0, this.ascii(s[0]) - ascii0, this.ascii(s[1]) - ascii0];
      case 1:
        return [0, 0, 0, this.ascii(s[0]) - ascii0];
      default:
        return [0, 0, 0, 0];
    }
  }

  private static readNumber(
    s: string,
    isSecondPart: boolean,
    isMonetary: boolean,
  ): string {
    const nums = this.splitNumberByDigits(s);

    let ret = '';

    for (let i = 0; i < 3; i++) {
      if (nums[i] > 0) {
        if (isMonetary) {
          ret += this.numbersExplicit[nums[i]];
        } else {
          ret += this.numbersImplicit[nums[i]];
        }
        ret += this.unitsSmall[i];
      }
    }

    if (nums[3] > 0) {
      if (isMonetary) {
        ret += this.numbersExplicit[nums[3]];
      } else {
        if (isSecondPart && nums[0] === 0 && nums[1] === 0 && nums[2] === 0) {
          // NOTE
          // special case....
          ret += this.numbersImplicit[nums[3]];
        } else {
          ret += this.numbersExplicit[nums[3]];
        }
      }
    }

    return ret;
  }

  public static toKoreanLanguage(
    n: number | bigint,
    isMonetary = false,
    removeEmptyString = false,
  ): string[] {
    if (typeof n !== 'number' && typeof n !== 'bigint') {
      return [];
    }

    let ret = this.parseNumber(n);
    let dst = 0;

    if (ret.length === 1 && ret[0] === '0') {
      return [this.zero];
    }

    for (let src = 0; src < ret.length; src++) {
      if (!removeEmptyString) {
        dst = src;
      }

      if (ret[src] !== '') {
        if (ret[src] !== '-') {
          let s = this.readNumber(ret[src], src === 1, isMonetary);
          s = s + this.unitsBig[src];
          ret[dst] = s;
        } else {
          ret[dst] = this.minus;
        }
        dst += 1;
      }
    }

    if (removeEmptyString) {
      for (let i = dst; i < ret.length; i++) {
        ret[i] = '';
      }
      ret = ret.slice(0, dst);
    }

    ret.reverse();

    return ret;
  }
}
