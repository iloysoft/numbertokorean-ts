export class NumberToKorean {
    static trimLeadingZeros(s) {
        let pos = 0;
        while (pos < s.length && s.charCodeAt(pos) === NumberToKorean.ascii0) {
            pos += 1;
        }
        return s.substring(pos);
    }
    static isBigIntInInt64Range(n) {
        return n >= NumberToKorean.minInt64 && n <= NumberToKorean.maxInt64;
    }
    static parseNumber(n) {
        if (typeof n === 'number') {
            if (!Number.isSafeInteger(n)) {
                return undefined;
            }
            if (n === 0) {
                return { negative: false, chunks: ['0'] };
            }
        }
        else {
            if (!NumberToKorean.isBigIntInInt64Range(n)) {
                return undefined;
            }
            if (n === BigInt(0)) {
                return { negative: false, chunks: ['0'] };
            }
        }
        let negative = false;
        if (n < 0) {
            negative = true;
            n = -n;
        }
        const chunks = [];
        const s = n.toString();
        let prevPos = s.length;
        for (let i = prevPos - 4;; i = i - 4) {
            if (i < 0) {
                i = 0;
            }
            chunks.push(NumberToKorean.trimLeadingZeros(s.substring(i, prevPos)));
            if (i === 0) {
                break;
            }
            else {
                prevPos = i;
            }
        }
        return { negative, chunks };
    }
    static formatParsedNumber(parsed, removeEmptyString, negativeLabel, formatChunk) {
        const ret = [];
        if (parsed.negative) {
            ret.push(negativeLabel);
        }
        for (let unitIndex = parsed.chunks.length - 1; unitIndex >= 0; unitIndex--) {
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
    static toKoreanUnits(n, options = {}) {
        if (typeof n !== 'number' && typeof n !== 'bigint') {
            return [];
        }
        const parsed = NumberToKorean.parseNumber(n);
        if (parsed === undefined) {
            return [];
        }
        const opts = options ?? {};
        return NumberToKorean.formatParsedNumber(parsed, opts.removeEmptyString ?? true, '-', (chunk, unitIndex) => chunk + NumberToKorean.unitsBig[unitIndex]);
    }
    static digitAt(s, pos) {
        const sourcePos = s.length - 4 + pos;
        if (sourcePos < 0) {
            return 0;
        }
        return s.charCodeAt(sourcePos) - NumberToKorean.ascii0;
    }
    static readPositionalDigit(n, isMonetary) {
        if (isMonetary) {
            return NumberToKorean.numbersExplicit[n];
        }
        return NumberToKorean.numbersImplicit[n];
    }
    static readNumber(s, isManUnitChunk, isMonetary) {
        const thousands = NumberToKorean.digitAt(s, 0);
        const hundreds = NumberToKorean.digitAt(s, 1);
        const tens = NumberToKorean.digitAt(s, 2);
        const ones = NumberToKorean.digitAt(s, 3);
        let ret = '';
        if (thousands > 0) {
            ret += NumberToKorean.readPositionalDigit(thousands, isMonetary);
            ret += NumberToKorean.unitsSmall[0];
        }
        if (hundreds > 0) {
            ret += NumberToKorean.readPositionalDigit(hundreds, isMonetary);
            ret += NumberToKorean.unitsSmall[1];
        }
        if (tens > 0) {
            ret += NumberToKorean.readPositionalDigit(tens, isMonetary);
            ret += NumberToKorean.unitsSmall[2];
        }
        if (ones > 0) {
            if (isMonetary) {
                ret += NumberToKorean.numbersExplicit[ones];
            }
            else {
                if (isManUnitChunk && thousands === 0 && hundreds === 0 && tens === 0) {
                    ret += NumberToKorean.numbersImplicit[ones];
                }
                else {
                    ret += NumberToKorean.numbersExplicit[ones];
                }
            }
        }
        return ret;
    }
    static toKoreanLanguage(n, options = {}) {
        if (typeof n !== 'number' && typeof n !== 'bigint') {
            return [];
        }
        const parsed = NumberToKorean.parseNumber(n);
        if (parsed === undefined) {
            return [];
        }
        if (parsed.chunks.length === 1 && parsed.chunks[0] === '0') {
            return [NumberToKorean.zero];
        }
        const opts = options ?? {};
        return NumberToKorean.formatParsedNumber(parsed, opts.removeEmptyString ?? true, NumberToKorean.minus, (chunk, unitIndex) => NumberToKorean.readNumber(chunk, unitIndex === 1, opts.monetary ?? false) + NumberToKorean.unitsBig[unitIndex]);
    }
}
NumberToKorean.minus = '마이너스';
NumberToKorean.zero = '영';
NumberToKorean.unitsBig = ['', '만', '억', '조', '경'];
NumberToKorean.unitsSmall = ['천', '백', '십'];
NumberToKorean.minInt64 = BigInt('-9223372036854775808');
NumberToKorean.maxInt64 = BigInt('9223372036854775807');
NumberToKorean.numbersImplicit = [
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
NumberToKorean.numbersExplicit = [
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
NumberToKorean.ascii0 = '0'.charCodeAt(0);
//# sourceMappingURL=numbertokorean.js.map