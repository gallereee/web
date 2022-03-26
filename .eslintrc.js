module.exports = {
	extends: "@bd-dm/eslint-config-react",
	settings: {
		"import/resolver": {
			typescript: {},
		},
	},
	rules: {
		"jsx-a11y/anchor-is-valid": "off",
	},
};
