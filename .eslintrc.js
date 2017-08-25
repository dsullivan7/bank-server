module.exports = {
	'rules': {
    'strict': 0,
    'semi': ['error', 'never'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
	},
  'extends': 'airbnb-base',
  'plugins': [
      'import',
      'react',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    }
  }
}
