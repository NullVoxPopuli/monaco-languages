/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { testTokenization } from '../test/testRunner';

testTokenization(
	['glimmer'],
	[
		// Builtin helper: log
		[
			{
				line: '{{log}}',
				tokens: [{ startIndex: 2, type: 'keyword' }]
			},
			{
				line: '{{log foo}}',
				tokens: [{ startIndex: 2, type: 'keyword' }]
			},
			{
				line: '{{log this.foo}}',
				tokens: [{ startIndex: 2, type: 'keyword' }]
			}
		],
		// Builtin helper: debugger
		[
			{
				line: '{{debugger}}',
				tokens: [{ startIndex: 2, type: 'keyword' }]
			},
			// Debugger does not take args
			{
				line: '{{debugger foo}}',
				tokens: [
					{ startIndex: 2, type: 'keyword' },
					{ startIndex: 11, type: 'comment' }
				]
			}
		],

		// As HTML values
		[
			{
				line: '<div class="foo {{if (eq a b) "truthy" false}}"',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			}
		],

		// Component Invocation (self-closed)
		[
			{
				line: '<Component />',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '<Component::Nested::Again />',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '<Component attr atr="value" @arg="str" @argB={{foo}} />',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			}
		],
		// Component Invocation (self-closed, multi-line)
		[
			{
				line: '<Component',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  {{modifier}}',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  attr="str"',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  @argA={{false}}',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  @argb={{foo}}',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '/>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			}
		],

		// Component Invocation (block)
		[
			{
				line: '<Component>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  {{yield foo (hash) to="name"}}',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '</Component>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '<Component as |foo bar|>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '</Component>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '<Component attr atr="value" @arg="str" @argB={{foo}} as |foo bar|>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '</Component>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			}
		],

		// Component Invocaton (block, with named blocks)
		[
			{
				line: '<Component>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  <:default>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  </:default>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  <:named>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '  </:named>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			},
			{
				line: '</Component>',
				tokens: [
					{ startIndex: 0, type: 'delimiter.html' },
					{ startIndex: 1, type: 'tag.html' }
				]
			}
		]
	]
);
