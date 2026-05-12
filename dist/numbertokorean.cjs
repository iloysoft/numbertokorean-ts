"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/numbertokorean.js
var numbertokorean_exports = {};
__export(numbertokorean_exports, {
  NumberToKorean: () => NumberToKorean
});
module.exports = __toCommonJS(numbertokorean_exports);
var NumberToKorean = class {
  static trimLeadingZeros(s) {
    let pos = 0;
    while (pos < s.length && s.charCodeAt(pos) === this.ascii0) {
      pos += 1;
    }
    return s.substring(pos);
  }
  static isBigIntInInt64Range(n) {
    return n >= BigInt("-9223372036854775808") && n <= BigInt("9223372036854775807");
  }
  static parseNumber(n) {
    if (typeof n === "number") {
      if (!Number.isSafeInteger(n)) {
        return void 0;
      }
      if (n === 0) {
        return { negative: false, chunks: ["0"] };
      }
    } else {
      if (!this.isBigIntInInt64Range(n)) {
        return void 0;
      }
      if (n === BigInt(0)) {
        return { negative: false, chunks: ["0"] };
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
    return { negative, chunks };
  }
  static formatParsedNumber(parsed, removeEmptyString, negativeLabel, formatChunk) {
    const ret = [];
    if (parsed.negative) {
      ret.push(negativeLabel);
    }
    for (let unitIndex = parsed.chunks.length - 1; unitIndex >= 0; unitIndex--) {
      const chunk = parsed.chunks[unitIndex];
      if (chunk === "") {
        if (!removeEmptyString) {
          ret.push("");
        }
        continue;
      }
      ret.push(formatChunk(chunk, unitIndex));
    }
    return ret;
  }
  static toKoreanUnits(n, options = {}) {
    if (typeof n !== "number" && typeof n !== "bigint") {
      return [];
    }
    const parsed = this.parseNumber(n);
    if (parsed === void 0) {
      return [];
    }
    return this.formatParsedNumber(parsed, options.removeEmptyString ?? true, "-", (chunk, unitIndex) => chunk + this.unitsBig[unitIndex]);
  }
  static digitAt(s, pos) {
    const sourcePos = s.length - 4 + pos;
    if (sourcePos < 0) {
      return 0;
    }
    return s.charCodeAt(sourcePos) - this.ascii0;
  }
  static readPositionalDigit(n, isMonetary) {
    if (isMonetary) {
      return this.numbersExplicit[n];
    }
    return this.numbersImplicit[n];
  }
  static readNumber(s, isManUnitChunk, isMonetary) {
    const thousands = this.digitAt(s, 0);
    const hundreds = this.digitAt(s, 1);
    const tens = this.digitAt(s, 2);
    const ones = this.digitAt(s, 3);
    let ret = "";
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
          ret += this.numbersImplicit[ones];
        } else {
          ret += this.numbersExplicit[ones];
        }
      }
    }
    return ret;
  }
  static toKoreanLanguage(n, options = {}) {
    if (typeof n !== "number" && typeof n !== "bigint") {
      return [];
    }
    const parsed = this.parseNumber(n);
    if (parsed === void 0) {
      return [];
    }
    if (parsed.chunks.length === 1 && parsed.chunks[0] === "0") {
      return [this.zero];
    }
    return this.formatParsedNumber(parsed, options.removeEmptyString ?? true, this.minus, (chunk, unitIndex) => this.readNumber(chunk, unitIndex === 1, options.monetary ?? false) + this.unitsBig[unitIndex]);
  }
};
NumberToKorean.minus = "\uB9C8\uC774\uB108\uC2A4";
NumberToKorean.zero = "\uC601";
NumberToKorean.unitsBig = ["", "\uB9CC", "\uC5B5", "\uC870", "\uACBD"];
NumberToKorean.unitsSmall = ["\uCC9C", "\uBC31", "\uC2ED"];
NumberToKorean.numbersImplicit = [
  "",
  "",
  "\uC774",
  "\uC0BC",
  "\uC0AC",
  "\uC624",
  "\uC721",
  "\uCE60",
  "\uD314",
  "\uAD6C"
];
NumberToKorean.numbersExplicit = [
  "",
  "\uC77C",
  "\uC774",
  "\uC0BC",
  "\uC0AC",
  "\uC624",
  "\uC721",
  "\uCE60",
  "\uD314",
  "\uAD6C"
];
NumberToKorean.ascii0 = "0".charCodeAt(0);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NumberToKorean
});
