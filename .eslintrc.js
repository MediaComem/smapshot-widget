module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['plugin:vue/recommended'],

  rules: {
    semi: [2, 'always'],
    quotes: ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'vue/no-v-html': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      'registeredComponentsOnly': true,
      'ignores': []
    }],
    'vue/custom-event-name-casing': ['error',
      'kebab-case',
      {
        'ignores': []
      }
    ],
    'vue/html-comment-content-spacing': ['error',
      'always',
      {
        'exceptions': []
      }
    ],
    'vue/match-component-file-name': ['error', {
      'extensions': ['vue'],
      'shouldMatchCase': false
    }],
    'vue/new-line-between-multi-line-property': ['error', {
      'minLineOfMultilineProperty': 2
    }],
    'vue/no-bare-strings-in-template': ['error', {
      'allowlist': [
        '(', ')', ',', '.', '&', '+', '-', '=', '*', '/', '#', '%', '!', '?', ':', '[', ']', '{', '}', '<', '>', '\u00b7', '\u2022', '\u2010', '\u2013', '\u2014', '\u2212', '|', 'm'
      ],
      'attributes': {
        '/.+/': ['title', 'aria-label', 'aria-placeholder', 'aria-roledescription', 'aria-valuetext'],
        'input': ['placeholder'],
        'img': ['alt']
      },
      'directives': ['v-text']
    }],
    'vue/no-potential-component-option-typo': ['error', {
      'presets': ['all'],
    }],
    'vue/no-reserved-component-names': ['error', {
      'disallowVueBuiltInComponents': false,
      'disallowVue3BuiltInComponents': false
    }],
    'vue/no-template-target-blank': ['error', {
      'allowReferrer': true,
      'enforceDynamicLinks': 'always'
    }],
    'vue/no-unused-properties': ['error', {
      'groups': ['props'],
      'deepData': false
    }],
    'vue/no-useless-mustaches': ['error', {
      'ignoreIncludesComment': false,
      'ignoreStringEscape': false
    }],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/require-name-property': 1,
    'vue/static-class-names-order': 1
  }
};
