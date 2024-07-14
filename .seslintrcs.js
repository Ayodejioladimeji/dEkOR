module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    // Enforce consistent indentation (2 spaces)
    'indent': ['error', 2],

    // Require the use of === and !==
    'eqeqeq': ['error', 'always'],

    // Disallow the use of console
    'no-console': 'warn',

    // Disallow unused variables
    '@typescript-eslint/no-unused-vars': ['error'],

    // Enforce consistent line breaks inside braces
    'object-curly-newline': ['error', { 'multiline': true, 'consistent': true }],

    // Enforce a maximum line length
    'max-len': ['error', { 'code': 100 }],

    // Enforce camelCase naming convention
    'camelcase': ['error', { 'properties': 'never' }],

    // Disallow multiple empty lines
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],

    // Require a capital letter for constructors
    'new-cap': ['error'],

    // Enforce consistent spacing before and after keywords
    'keyword-spacing': ['error', { 'before': true, 'after': true }],

    // Disallow trailing spaces at the end of lines
    'no-trailing-spaces': 'error',

    // Require using Error objects as Promise rejection reasons
    'prefer-promise-reject-errors': ['error', { 'allowEmptyReject': true }],

    // Enforce consistent line breaks after opening and before closing block
    'block-spacing': ['error', 'always'],

    // Require or disallow semicolons instead of ASI
    'semi': ['error', 'always'],

    // Disallow the use of alert, confirm, and prompt
    'no-alert': 'warn',

    // Enforce consistent spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],

    // Enforce consistent spacing inside single-line blocks
    'block-spacing': ['error', 'always'],

    // Enforce consistent comma spacing
    'comma-spacing': ['error', { 'before': false, 'after': true }],

    // Enforce consistent spacing before and after function names
    'func-call-spacing': ['error', 'never'],

    // Disallow assignment operators in return statements
    'no-return-assign': ['error', 'always'],

    // Require parentheses around immediate function invocations
    'wrap-iife': ['error', 'inside'],

    // Disallow unnecessary concatenation of literals or template literals
    'no-useless-concat': 'error',

    // Disallow whitespace before properties
    'no-whitespace-before-property': 'error',

    // Require spacing around infix operators
    'space-infix-ops': 'error'
  }
};
