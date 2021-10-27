import assert from 'assert';
import { FormatOptions, ParseResult, ColorNames, ColorCodes } from './types';

const colorLookupCodes: Record<ColorNames, ColorCodes> = {
    'black': '0',
    'dark_blue': '1',
    'dark_green': '2',
    'dark_aqua': '3',
    'dark_red': '4',
    'dark_purple': '5',
    'gold': '6',
    'gray': '7',
    'dark_gray': '8',
    'blue': '9',
    'green': 'a',
    'aqua': 'b',
    'red': 'c',
    'light_purple': 'd',
    'yellow': 'e',
    'white': 'f',
    'minecoin_gold': 'g'
};

export const format = (tree: ParseResult, options?: FormatOptions): string => {
    assert(Array.isArray(tree), `Expected 'tree' to be typeof 'array', got '${typeof tree}'`);

    const opts = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);

    let result = '';

    for (const item of tree) {
        if (item.color) {
            result += opts.formattingCharacter + colorLookupCodes[item.color];
        }

        if (item.bold) {
            result += opts.formattingCharacter + 'l';
        }

        if (item.italics) {
            result += opts.formattingCharacter + 'o';
        }

        if (item.underline) {
            result += opts.formattingCharacter + 'n';
        }

        if (item.strikethrough) {
            result += opts.formattingCharacter + 'm';
        }

        if (item.obfuscated) {
            result += opts.formattingCharacter + 'k';
        }

        result += item.text;
    }

    return result;
}