module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        'plugin:react/jsx-runtime',
        'plugin:prettier/recommended', // 添加 prettier 插件
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        'react-hooks',
        "@typescript-eslint",
        'prettier'
    ],
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "rules": {
      'no-unused-vars': 'off',
      'no-cond-assign': 'error',
      'no-debugger': 'warn',
      'no-dupe-args': 'error',
      'no-caller': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-with': 'error',
      'no-catch-shadow': 'error',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      // 'exhaustive-deps':'off',
      'prettier/prettier': 'off',
    }
}
