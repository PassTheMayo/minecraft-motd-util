import assert from 'assert';
import { ParseResult, HTMLOptions, ColorNames, SerializerElementOption, FormattingProperties } from './types';

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
};

const formattingProps: FormattingProperties[] = ['bold', 'italics', 'underline', 'strikethrough', 'obfuscated'];

export const toHTML = (tree: ParseResult, options?: HTMLOptions): string => {
    assert(Array.isArray(tree), `Expected 'tree' to be typeof 'array', received '${typeof tree}'`);

    const opts = Object.assign({
        serializers: defaultSerializers,
        rootTag: 'span'
    }, options);

    let result = `<${opts.rootTag}>`;

    for (const item of tree) {
        const classes = [];
        const styles: Record<string, string[]> = {};

        if (item.color) {
            const serializer = opts.serializers[item.color];

            classes.push(...(serializer.classes ?? []));

            if (serializer.styles) {
                for (const style in serializer.styles) {
                    const value = serializer.styles[style];

                    if (style in styles) {
                        styles[style].push(value);
                    } else {
                        styles[style] = [value]
                    }
                }
            }
        }

        for (const key of formattingProps) {
            if (item[key]) {
                const serializer = opts.serializers[key];

                if (serializer.classes && serializer.classes.length > 0) {
                    classes.push(...serializer.classes);
                }

                if (serializer.styles) {
                    for (const style in serializer.styles) {
                        const value = serializer.styles[style];

                        if (style in styles) {
                            styles[style].push(value);
                        } else {
                            styles[style] = [value]
                        }
                    }
                }
            }
        }

        const content = item.text.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        result += `<span${classes.length > 0 ? ` class="${classes.join(' ')}"` : ''}${Object.keys(styles).length > 0 ? ` style="${Object.entries(styles).map((style) => `${style[0]}: ${style[1].join(' ')};`).join(' ')}"` : ''}>${content}</span>`;
    }

    result += `</${opts.rootTag}>`;

    return result;
}