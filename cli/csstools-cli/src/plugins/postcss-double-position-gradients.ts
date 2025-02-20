import plugin from 'postcss-double-position-gradients';
import { cli, helpTextLogger } from '@csstools/base-cli';

export default function postcssDoublePositionGradients() {
	cli(
		plugin,
		['preserve'],
		helpTextLogger(
			'@csstools/cli postcss-double-position-gradients',
			'PostCSS Double Position Gradients',
			'Lets you use double-position gradients in CSS, following the [CSS Image Values and Replaced Content] specification',
			{
				dir: 'ltr',
				preserve: true,
				shadow: true,
			},
		),
		false,
	);
}
