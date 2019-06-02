module.exports = {
  "parserOptions": {
      "ecmaVersion": 8,
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
  },
  "env": {
    "browser": true,
    "es6": true,
  },
  globals: {
    atom: true
  },
  "extends": "eslint:recommended",
  "rules": {
    "semi": ["error", "always"],
    "one-var": ["off", "always"],
    "new-cap": "off",
    "no-mixed-operators": "off",
    "no-useless-escape": "warn",
    "camelcase": "warn",
    "no-cond-assign": "warn",
    "import/no-webpack-loader-syntax": "off",
    "no-sequences": "warn"
  }
};
