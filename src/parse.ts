import assert from 'assert';
import { ParseOptions, ParseResult, ParseItem, ColorNames, FormattingProperties } from './types';

const colorLookupNames: Record<string, ColorNames> = {
    '0': 'black',
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white',
    'g': 'minecoin_gold'
};

const formattingLookupProperties: Record<string, FormattingProperties> = {
    'k': 'obfuscated',
    'l': 'bold',
    'm': 'strikethrough',
    'n': 'underline',
    'o': 'italics'
};

export const parse = (text: string, options?: ParseOptions): ParseResult => {
    assert(typeof text === 'string', `Expected 'text' to be typeof 'string', received '${typeof text}'`);

    options = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);

    const result: ParseItem[] = [{ text: '' }];

    let buf = text;

    while (buf.length > 0) {
        const char = buf.charAt(0);

        if (char === options.formattingCharacter) {
            const formattingCode = buf.charAt(1).toLowerCase();

            let item: ParseItem = result[result.length - 1];

            if (formattingCode === 'r') {
                result.push({ text: '' });
            } else if (Object.prototype.hasOwnProperty.call(colorLookupNames, formattingCode)) {
                const newColor = colorLookupNames[formattingCode];

                if (newColor !== item.color && item.text.length > 0) {
                    result.push({ color: newColor, text: '' });
                } else {
                    item.color = newColor;
                }
            } else if (Object.prototype.hasOwnProperty.call(formattingLookupProperties, formattingCode)) {
                item[formattingLookupProperties[formattingCode]] = true;
            }

            buf = buf.slice(2);
        } else {
            result[result.length - 1].text += char;

            buf = buf.slice(1);
        }
    }

    return result;
}