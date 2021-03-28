// Using .js to allow comments
module.exports = {
  parser: `@typescript-eslint/parser`, // Specifies the ESLint parser
  extends: [
    `eslint:recommended`,
    `plugin:react/recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:prettier/recommended`,
  ],
  settings: {
    react: {
      version: `detect`,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  plugins: [`@typescript-eslint`, `react`],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: `module`, // Allows for the use of imports
  },
  rules: {
    "react/prop-types": `off`, // Disable prop-types as we use TypeScript for type checking
    "@typescript-eslint/explicit-function-return-type": `off`,
    "@typescript-eslint/ban-ts-comment": `off`,
    "@typescript-eslint/ban-ts-ignore": `off`,
    "@typescript-eslint/no-explicit-any": "off",
  },
  overrides: [
    // Override some TypeScript rules just for .js files
    {
      files: [`*.js`],
      rules: {
        "@typescript-eslint/no-var-requires": `off`,
        quotes: [`error`, `backtick`],
        "react/prop-types": 0,
      },
    },
  ],
};
