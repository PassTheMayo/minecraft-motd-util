import assert from 'assert';
import { CleanOptions } from './types';

export const clean = (text: string, options?: CleanOptions): string => {
    assert(typeof text === 'string', `Expected 'text' to be typeof 'string', received '${typeof text}'`);

    options = Object.assign({
        formattingCharacter: '\u00A7'
    }, options);

    return text.replace(new RegExp(`${options.formattingCharacter}[0-9a-gk-or]`, 'g'), '');
}