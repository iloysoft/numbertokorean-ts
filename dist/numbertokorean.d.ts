export declare abstract class NumberToKorean {
    private static readonly minus;
    private static readonly zero;
    private static readonly unitsBig;
    private static readonly unitsSmall;
    private static readonly numbersImplicit;
    private static readonly numbersExplicit;
    private static readonly ascii0;
    private static trimLeft;
    private static parseNumber;
    static toKoreanUnits(n: number | bigint, removeEmptyString?: boolean): string[];
    private static splitNumberByDigits;
    private static readNumber;
    static toKoreanLanguage(n: number | bigint, isMonetary?: boolean, removeEmptyString?: boolean): string[];
}
//# sourceMappingURL=numbertokorean.d.ts.map