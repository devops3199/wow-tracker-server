module.exports = {
    trailingComma: 'all',
    tabWidth: 2,
    semi: false,
    singleQuote: true,
    printWidth: 120,
    endOfLine: 'lf',
    bracketSpacing: true,
    arrowParens: 'always',
    overrides: [ 
        {
            files: '{**/.vscode/*.json}',
            options: {
                parser: 'json5',
                quoteProps: 'preserve',
                singleQuote: false,
                trailingComma: 'all',
            },
        },
    ],
};