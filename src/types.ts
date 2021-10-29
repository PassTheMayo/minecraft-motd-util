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

export type ColorCodes = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g';

export type FormattingProperties = 'bold' | 'italics' | 'underline' | 'strikethrough' | 'obfuscated';

export interface ParseItem {
    color: ColorNames,
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

export interface FormatOptions {
    formattingCharacter?: string
}

export interface SerializerElementOption {
    classes?: string[],
    styles?: Record<string, string>
}

export interface HTMLOptions {
    serializers?: Record<ColorNames | FormattingProperties, SerializerElementOption>,
    rootTag?: string
}

export interface Chat {
    text: string,
    color?: ColorNames | ColorCodes,
    bold?: string,
    italic?: string,
    underlined?: string,
    strikethrough?: string,
    obfuscated?: string,
    extra?: Chat[]
}