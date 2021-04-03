/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { language as hbsLanguage, conf as hbsConf } from '../handlebars/handlebars';

import type { languages } from '../fillers/monaco-editor-core';

// Merged: https://github.com/emberjs/rfcs/pull/560
const EQUALITY_HELPERS: string[] = ['eq', 'neq'];
// Merged: https://github.com/emberjs/rfcs/pull/561
const NUMERIC_COMPARISON_HELPERS: string[] = ['gt', 'gte', 'le', 'lte'];
// Merged: https://github.com/emberjs/rfcs/pull/562/files
const LOGICAL_OPERATOR_HELPERS: string[] = ['and', 'or', 'not'];

const OTHER_OPERATORS: string[] = [
	// ember-truth-helpers, but
	'not-eq',
	'xor',
	'is-array',
	'is-object',
	'is-equal'
];
const BLOCK_HELPERS: string[] = ['let', 'each', 'if'];
const INLINE_HELPERS: string[] = ['log', 'debugger', 'has-block'];

export const conf: languages.LanguageConfiguration = {
	...hbsConf
};

export const language = <languages.IMonarchLanguage>{
	...hbsLanguage,
	tokenizer: {
		...hbsLanguage.tokenizer,
		root: [
			// Named Block Start
			[/(<:)(\w+)(\/>)/, ['delimiter.html', 'tag.html', 'delimiter.html']],
			// Named Block End
			[/(<\/:)(\w+)/, ['delimiter.html', { token: 'tag.html', next: '@otherTag' }]],
			...hbsLanguage.tokenizer.root
		]
	}
};
