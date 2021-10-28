import assert from 'assert';
import { ParseOptions, ParseResult, ParseItem, ColorNames, FormattingProperties, Chat } from './types';

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

const parseText = (text: string, options: ParseOptions): ParseResult => {
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
};

const parseChat = (chat: Chat, options: ParseOptions, parent?: Chat): ParseResult => {
    const result: ParseResult = parseText(chat.text, options);

    const item: ParseItem = result[0];

    if (((parent && parent.bold === 'true') && (chat.bold !== 'false' || !chat.bold)) || chat.bold === 'true') {
        item.bold = true;
    }

    if (((parent && parent.italic === 'true') && (chat.italic !== 'false' || !chat.italic)) || chat.italic === 'true') {
        item.italics = true;
    }

    if (((parent && parent.underlined === 'true') && (chat.underlined !== 'false' || !chat.underlined)) || chat.underlined === 'true') {
        item.underline = true;
    }

    if (((parent && parent.strikethrough === 'true') && (chat.strikethrough !== 'false' || !chat.strikethrough)) || chat.strikethrough === 'true') {
        item.strikethrough = true;
    }

    if (((parent && parent.obfuscated === 'true') && (chat.obfuscated !== 'false' || !chat.obfuscated)) || chat.obfuscated === 'true') {
        item.obfuscated = true;
    }

    if (chat.color) {
        if (Object.keys(colorLookupNames).includes(chat.color)) {
            item.color = colorLookupNames[chat.color];
        } else {
            item.color = chat.color as ColorNames;
        }
    }

    result.push(item);

    if (chat.extra) {
        for (const extra of chat.extra) {
            result.push(...parseChat(extra, options, chat));
        }
    }

    return result;
};

export const parse = (input: Chat | string, options?: ParseOptions): ParseResult => {
    assert(typeof input === 'string' || typeof input === 'object', `Expected 'input' to be typeof 'string' or 'object', received '${typeof input}'`);

    const opts = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);

    if (typeof input === 'string') {
        return parseText(input, opts);
    }

    return parseChat(input, opts);
};