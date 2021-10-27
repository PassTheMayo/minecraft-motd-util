export type ColorNames = 'black'
    | 'dark_blue'
    | 'dark_green'
    | 'dark_aqua'
    | 'dark_red'
    | 'dark_purple'
    | 'gold'
    | 'gray'
    | 'dark_gray'
    | 'blue'
    | 'green'
    | 'aqua'
    | 'red'
    | 'light_purple'
    | 'yellow'
    | 'white'
    | 'minecoin_gold';

export type FormattingProperties = 'bold' | 'italics' | 'underline' | 'strikethrough' | 'obfuscated';

export interface ParseItem {
    color?: ColorNames,
    bold?: boolean,
    italics?: boolean,
    underline?: boolean,
    strikethrough?: boolean,
    obfuscated?: boolean,
    text: string
}

export type ParseResult = ParseItem[];

export interface ParseOptions {
    formattingCharacter?: string
}

export interface CleanOptions {
    formattingCharacter?: string
}

export interface SerializerElementOption {
    classes?: string[],
    styles?: Record<string, string>
}

export interface HTMLOptions {
    serializers?: Record<ColorNames | FormattingProperties, SerializerElementOption>,
    mergeSimilar?: boolean
}