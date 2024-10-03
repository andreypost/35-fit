module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier', // Disables ESLint rules that might conflict with Prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint', // Plugin for TypeScript linting
    'react-hooks', // Plugin for React hooks linting
  ],
  rules: {
    // Custom rules
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return type for functions
    '@typescript-eslint/no-explicit-any': 'off', // Allow usage of 'any' type
    '@typescript-eslint/no-unused-vars': 'off', // Disable no-unused-vars rule for TypeScript
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/no-var-requires': 'off',
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react/react-in-jsx-scope': 'off', // Not necessary with new JSX transform in React 17+
    // 'no-console': 'warn', // Warn on console usage
    semi: ['error', 'never'], // Enforce semicolons
    // 'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
}
