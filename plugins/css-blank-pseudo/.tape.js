module.exports = {
	'basic': {
		message: 'supports basic usage',
	},
	'basic:replacewith': {
		message: 'supports { replaceWith: ".css-blank" } usage',
		options: {
			replaceWith: '.css-blank'
		}
	},
	'basic:preserve': {
		message: 'supports { preserve: false } usage',
		options: {
			preserve: false
		}
	},
	'generated-selector-cases': {
		message: 'correctly handles generated cases',
		warnings: 1,
		options: {
			preserve: false
		}
	},
};
