type ParsedNumber = {
  negative: boolean;
  chunks: string[];
};

export type ToKoreanUnitsOptions = {
  removeEmptyString?: boolean;
};

export type ToKoreanLanguageOptions = ToKoreanUnitsOptions & {
  monetary?: boolean;
};

export abstract class NumberToKorean {
  private static readonly minus = '마이너스';
  private static readonly zero = '영';
  private static readonly unitsBig = ['', '만', '억', '조', '경']; // in reverse order
  private static readonly unitsSmall = ['천', '백', '십'];
  private static readonly numbersImplicit = [
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
  private static readonly numbersExplicit = [
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
  private static readonly ascii0 = '0'.charCodeAt(0);

  private static trimLeadingZeros(s: string): string {
    let pos = 0;
    while (pos < s.length && s.charCodeAt(pos) === this.ascii0) {
      pos += 1;
    }

    return s.substring(pos);
  }

  private static isBigIntInInt64Range(n: bigint): boolean {
    return (
      n >= BigInt('-9223372036854775808') && n <= BigInt('9223372036854775807')
    );
  }

  private static parseNumber(n: number | bigint): ParsedNumber | undefined {
    if (typeof n === 'number') {
      if (!Number.isSafeInteger(n)) {
        return undefined;
      }
      if (n === 0) {
        return {negative: false, chunks: ['0']};
      }
    } else {
      if (!this.isBigIntInInt64Range(n)) {
        // out of int64 range
        return undefined;
      }
      if (n === BigInt(0)) {
        return {negative: false, chunks: ['0']};
      }
    }

    let negative = false;
    if (n < 0) {
      negative = true;
      n = -n;
    }

    const chunks: string[] = [];

    const s = n.toString();

    let prevPos = s.length;
    for (let i = prevPos - 4; ; i = i - 4) {
      if (i < 0) {
        i = 0;
      }

      chunks.push(this.trimLeadingZeros(s.substring(i, prevPos)));

      if (i === 0) {
        break;
      } else {
        prevPos = i;
      }
    }

    return {negative, chunks};
  }

  private static formatParsedNumber(
    parsed: ParsedNumber,
    removeEmptyString: boolean,
    negativeLabel: string,
    formatChunk: (chunk: string, unitIndex: number) => string,
  ): string[] {
    const ret: string[] = [];

    if (parsed.negative) {
      ret.push(negativeLabel);
    }

    for (
      let unitIndex = parsed.chunks.length - 1;
      unitIndex >= 0;
      unitIndex--
    ) {
      const chunk = parsed.chunks[unitIndex];
      if (chunk === '') {
        if (!removeEmptyString) {
          ret.push('');
        }
        continue;
      }

      ret.push(formatChunk(chunk, unitIndex));
    }

    return ret;
  }

  public static toKoreanUnits(
    n: number | bigint,
    options: ToKoreanUnitsOptions = {},
  ): string[] {
    if (typeof n !== 'number' && typeof n !== 'bigint') {
      return [];
    }

    const parsed = this.parseNumber(n);
    if (parsed === undefined) {
      return [];
    }

    return this.formatParsedNumber(
      parsed,
      options.removeEmptyString ?? true,
      '-',
      (chunk, unitIndex) => chunk + this.unitsBig[unitIndex],
    );
  }

  private static digitAt(s: string, pos: number): number {
    const sourcePos = s.length - 4 + pos;
    if (sourcePos < 0) {
      return 0;
    }

    return s.charCodeAt(sourcePos) - this.ascii0;
  }

  private static readPositionalDigit(n: number, isMonetary: boolean): string {
    if (isMonetary) {
      return this.numbersExplicit[n];
    }

    return this.numbersImplicit[n];
  }

  private static readNumber(
    s: string,
    isManUnitChunk: boolean,
    isMonetary: boolean,
  ): string {
    const thousands = this.digitAt(s, 0);
    const hundreds = this.digitAt(s, 1);
    const tens = this.digitAt(s, 2);
    const ones = this.digitAt(s, 3);

    let ret = '';

    if (thousands > 0) {
      ret += this.readPositionalDigit(thousands, isMonetary);
      ret += this.unitsSmall[0];
    }
    if (hundreds > 0) {
      ret += this.readPositionalDigit(hundreds, isMonetary);
      ret += this.unitsSmall[1];
    }
    if (tens > 0) {
      ret += this.readPositionalDigit(tens, isMonetary);
      ret += this.unitsSmall[2];
    }

    if (ones > 0) {
      if (isMonetary) {
        ret += this.numbersExplicit[ones];
      } else {
        if (isManUnitChunk && thousands === 0 && hundreds === 0 && tens === 0) {
          // In non-monetary readings, 10001 is read as "만 일", not "일만 일".
          ret += this.numbersImplicit[ones];
        } else {
          ret += this.numbersExplicit[ones];
        }
      }
    }

    return ret;
  }

  public static toKoreanLanguage(
    n: number | bigint,
    options: ToKoreanLanguageOptions = {},
  ): string[] {
    if (typeof n !== 'number' && typeof n !== 'bigint') {
      return [];
    }

    const parsed = this.parseNumber(n);

    if (parsed === undefined) {
      return [];
    }

    if (parsed.chunks.length === 1 && parsed.chunks[0] === '0') {
      return [this.zero];
    }

    return this.formatParsedNumber(
      parsed,
      options.removeEmptyString ?? true,
      this.minus,
      (chunk, unitIndex) =>
        this.readNumber(chunk, unitIndex === 1, options.monetary ?? false) +
        this.unitsBig[unitIndex],
    );
  }
}
