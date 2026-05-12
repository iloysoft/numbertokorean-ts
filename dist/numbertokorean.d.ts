export type ToKoreanUnitsOptions = {
    removeEmptyString?: boolean;
};
export type ToKoreanLanguageOptions = ToKoreanUnitsOptions & {
    monetary?: boolean;
};
export declare abstract class NumberToKorean {
    private static readonly minus;
    private static readonly zero;
    private static readonly unitsBig;
    private static readonly unitsSmall;
    private static readonly minInt64;
    private static readonly maxInt64;
    private static readonly numbersImplicit;
    private static readonly numbersExplicit;
    private static readonly ascii0;
    private static trimLeadingZeros;
    private static isBigIntInInt64Range;
    private static parseNumber;
    private static formatParsedNumber;
    static toKoreanUnits(n: number | bigint, options?: ToKoreanUnitsOptions): string[];
    private static digitAt;
    private static readPositionalDigit;
    private static readNumber;
    static toKoreanLanguage(n: number | bigint, options?: ToKoreanLanguageOptions): string[];
}
