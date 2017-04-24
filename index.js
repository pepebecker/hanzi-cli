#!/usr/bin/env node

'use strict'

const findHanzi = require('find-hanzi')
const ArgumentParser = require('argparse').ArgumentParser

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp: false,
  description: 'Mandarin Command Line Utility'
})

parser.addArgument(['-i', '--input'],		{type: 'string'})
parser.addArgument(['-r', '--results'],		{type: 'int', defaultValue: 0})
parser.addArgument(['-n', '--number'],		{action: 'storeTrue'})
parser.addArgument(['-h', '--hanzi'],		{action: 'storeTrue'})
parser.addArgument(['-p', '--pinyin'],		{action: 'storeTrue'})
parser.addArgument(['-c', '--cangjie'],		{action: 'storeTrue'})
parser.addArgument(['-k', '--kangjie'],		{action: 'storeTrue'})
parser.addArgument(['-d', '--definition'],	{action: 'storeTrue'})
parser.addArgument(['-u', '--unicode'],		{action: 'storeTrue'})
parser.addArgument(['-f', '--frequency'],	{action: 'storeTrue'})
parser.addArgument(['-s', '--search'],		{action: 'storeTrue'})

const args = parser.parseArgs()

if (!args.hanzi && !args.pinyin && !args.cangjie && !args.definition &&
	!args.unicode && !args.frequency) process.exit()

let list = []

function getResultText(item, n) {
	let content = ''

	if (n) content += ('0' + n).slice(-2) + ': '
	if (args.hanzi) content += item.hanzi + ' | '
	if (args.pinyin) content += item.pinyin + ' | '
	if (args.unicode) content += item.unicode + ' | '
	if (args.cangjie) content += item.cangjie + ' | '
	if (args.kangjie) content += item.kangjie + ' | '
	if (args.definition) content += item.definition + ' | '
	if (args.frequency) content += item.frequency

	return content.replace(/\ \|\ $/, '')
}

findHanzi(args.input, {search: args.search, results: args.results, fuzzy: true}).then((data) => {
	if (data.length == 1) {
		console.log(getResultText(data[0]))
	} else {
		let index = 0
		for (let item of data) {
			index ++
			console.log(getResultText(item, args.number && index))
		}
	}
}, console.log)
