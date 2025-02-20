import { promises as fsp } from 'fs';
import path from 'path';
import { Arguments } from './args';
import postcss, { Plugin } from 'postcss';

// Read from one or more files and write to as many files
export async function fsToFs(plugin: Plugin, argo: Arguments): Promise<never> {
	try {
		await Promise.all(argo.inputs.map(async (input) => {
			let output = argo.output;
			if (argo.outputDir) {
				output = path.join(argo.outputDir, path.basename(input));
			}
			if (argo.replace) {
				output = input;
			}

			const css = await fsp.readFile(input);
			const result = await postcss([plugin]).process(css, {
				from: input,
				to: output,
				map: (argo.inlineMap || argo.externalMap) ? { inline: argo.inlineMap } : false,
			});

			if (argo.externalMap && result.map) {
				await Promise.all([
					await fsp.writeFile(output, result.css + (argo.inlineMap ? '\n' : '')),
					await fsp.writeFile(`${output}.map`, result.map.toString()),
				]);
			} else {
				await fsp.writeFile(output, result.css + (argo.inlineMap ? '\n' : ''));
			}

			console.log(`CSS was written to "${path.normalize(output)}"`);
		}));
	} catch (error) {
		console.error(argo.debug ? error : error.message);

		process.exit(1);
	}

	process.exit(0);
}
