import { idsToPackageNames, packageNamesToIds } from './plugins-by-id';

export function pluginIdHelp(featureNamesInOptions, root, result) {
	const featureNames = Object.keys(idsToPackageNames);
	const packageNames = Object.keys(packageNamesToIds);
	featureNamesInOptions.forEach((featureName) => {
		if (featureNames.includes(featureName)) {
			return;
		}

		const byId = mostSimilar(featureName, featureNames);
		const byPackage = mostSimilar(featureName, packageNames);

		// TODO :
		// 1. create markdown docs with the plugin id's
		// 2. set a distance limit (>10) and if above output link to docs.

		if (byId.distance < byPackage.distance) {
			root.warn(result, `Unknown feature: "${featureName}" did you mean: "${byId.mostSimilar}"`);
		} else {
			root.warn(result, `Unknown feature: "${featureName}" did you mean: "${packageNamesToIds[byPackage.mostSimilar]}"`);
		}
	});
}

function mostSimilar(a, b) {
	let mostSimilar = 'unknown';
	let leastDistance = Infinity;

	for (let j = 0; j < b.length; j++) {
		const distance = levenshteinDistance(a, b[j]);
		if (distance < leastDistance) {
			leastDistance = distance;
			mostSimilar = b[j];
		}
	}

	return {
		mostSimilar: mostSimilar,
		distance: leastDistance,
	};
}

function levenshteinDistance(s, t) {
	if (!s.length) return t.length;
	if (!t.length) return s.length;
	const arr = [];
	for (let i = 0; i <= t.length; i++) {
		arr[i] = [i];
		for (let j = 1; j <= s.length; j++) {
			arr[i][j] =
				i === 0
					? j
					: Math.min(
							arr[i - 1][j] + 1,
							arr[i][j - 1] + 1,
							arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1),
						);
		}
	}
	return arr[t.length][s.length];
}

