import assert from 'assert';
import { ParseResult, HTMLOptions, ColorNames, FormattingProperties, SerializerElementOption } from './types';

const defaultSerializers: Record<ColorNames | FormattingProperties, SerializerElementOption> = {
    'black': { styles: { color: '#000000' } },
    'dark_blue': { styles: { color: '#0000AA' } },
    'dark_green': { styles: { color: '#00AA00' } },
    'dark_aqua': { styles: { color: '#00AAAA' } },
    'dark_red': { styles: { color: '#AA0000' } },
    'dark_purple': { styles: { color: '#AA00AA' } },
    'gold': { styles: { color: '#FFAA00' } },
    'gray': { styles: { color: '#AAAAAA' } },
    'dark_gray': { styles: { color: '#555555' } },
    'blue': { styles: { color: '#5555FF' } },
    'green': { styles: { color: '#55FF55' } },
    'aqua': { styles: { color: '#55FFFF' } },
    'red': { styles: { color: '#FF5555' } },
    'light_purple': { styles: { color: '#FF55FF' } },
    'yellow': { styles: { color: '#FFFF55' } },
    'white': { styles: { color: '#FFFFFF' } },
    'minecoin_gold': { styles: { color: '#DDD605' } },
    'obfuscated': { classes: ['minecraft-formatting-obfuscated'] },
    'bold': { styles: { 'font-weight': 'bold' } },
    'strikethrough': { styles: { 'text-decoration': 'line-through' } },
    'underline': { styles: { 'text-decoration': 'underline' } },
    'italics': { styles: { 'font-style': 'italic' } }
}

export const toHTML = (tree: ParseResult, options?: HTMLOptions): string => {
    assert(Array.isArray(tree), `Expected 'tree' to be typeof 'array', received '${typeof tree}'`);

    const opts = Object.assign({
        serializers: defaultSerializers,
        rootTag: 'span'
    }, options);

    let result = `<${opts.rootTag}>`;

    for (const item of tree) {
        const classes = [];
        const styles = {};

        if (item.color) {
            classes.push(...(opts.serializers[item.color].classes ?? []));

            Object.assign(styles, opts.serializers[item.color].styles ?? {});
        }

        if (item.bold) {
            classes.push(...(opts.serializers.bold.classes ?? []));

            Object.assign(styles, opts.serializers.bold.styles ?? {});
        }

        if (item.italics) {
            classes.push(...(opts.serializers.italics.classes ?? []));

            Object.assign(styles, opts.serializers.italics.styles ?? {});
        }

        if (item.underline) {
            classes.push(...(opts.serializers.underline.classes ?? []));

            Object.assign(styles, opts.serializers.underline.styles ?? {});
        }

        if (item.strikethrough) {
            classes.push(...(opts.serializers.strikethrough.classes ?? []));

            Object.assign(styles, opts.serializers.strikethrough.styles ?? {});
        }

        if (item.obfuscated) {
            classes.push(...(opts.serializers.obfuscated.classes ?? []));

            Object.assign(styles, opts.serializers.obfuscated.styles ?? {});
        }

        const content = item.text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        result += `<span${classes.length > 0 ? ` class="${classes.join(' ')}"` : ''}${Object.keys(styles).length > 0 ? ` style="${Object.entries(styles).map((style) => `${style[0]}: ${style[1]};`).join(' ')}"` : ''}>${content}</span>`;
    }

    result += `</${opts.rootTag}>`;

    return result;
}