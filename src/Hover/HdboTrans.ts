import * as vscode from 'vscode';

let regexHex = /^[h|H][0-9a-fA-F]+$/g;
let regexDec = /^-?[d|D]?[0-9]+$/g;
let regexBin = /^[b|B][01]+$/g;
let regexOct = /^[o|O][0-7]+$/g;


export class HdboTrans implements vscode.HoverProvider {


    public async provideHover(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      let hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			let markdownString = new vscode.MarkdownString();
			if (regexBin.test(hoveredWord.toString())) {

				hoveredWord = hoveredWord.replace("b","");
                hoveredWord = hoveredWord.replace("B","");

				let input: Number = Number(parseInt(hoveredWord, 2).toString());

                let input_b: string = input.toString(2).replace(/(^\s+|\s+$)/, '');
				

				markdownString.appendCodeblock(`Dec:\n${input_b.length}'d${input}\nHex:\n${input_b.length}'b${input.toString(16).toUpperCase()}\nOctal:\n${input_b.length}'o${input.toString(8)} `, 'systemverilog');

				return {
					contents: [markdownString]
				};
			}
			else if (regexHex.test(hoveredWord.toString())) {
                // console.log(hoveredWord);
                hoveredWord = hoveredWord.replace("h","");
                hoveredWord = hoveredWord.replace("H","");
                // console.log(hoveredWord);
                let input_b: string = parseInt(hoveredWord, 16).toString(2).replace(/(^\s+|\s+$)/, '');
                               
				markdownString.appendCodeblock(`Dec:\n${input_b.length}'h${parseInt(hoveredWord, 16)}\nBinary:\n${input_b.length}'b${parseInt(hoveredWord, 16).toString(2)}\nOctal:\n${input_b.length}'o${parseInt(hoveredWord, 16).toString(8)}`, 'systemverilog');

				return {
					contents: [markdownString]
				};
			}
			else if (regexDec.test(hoveredWord.toString())) {

                hoveredWord = hoveredWord.replace("d","");
                hoveredWord = hoveredWord.replace("D","");

				let input: Number = Number(hoveredWord.toString());
                
                let input_b: string = input.toString(2).replace(/(^\s+|\s+$)/, '');

				markdownString.appendCodeblock(`Hex:\n${input_b.length}'h${input.toString(16).toUpperCase()}\n\Binary:\n${input_b.length}'b${input.toString(2).replace(/(^\s+|\s+$)/, '')}\nOctal:\n${input_b.length}'o${input.toString(8)} `, 'systemverilog');

				return {
					contents: [markdownString]
				};

			}
            else if (regexOct.test(hoveredWord.toString())) {

                hoveredWord = hoveredWord.replace("o","");
                hoveredWord = hoveredWord.replace("O","");

				let input: Number = Number(hoveredWord.toString());
                
                let input_b: string = input.toString(2).replace(/(^\s+|\s+$)/, '');

				markdownString.appendCodeblock(`Dec:\n${input_b.length}'d${input}\nHex:\n${input_b.length}'h${input.toString(16).toUpperCase()}\n\Binary:\n${input_b.length}'b${input.toString(2).replace(/(^\s+|\s+$)/, '')} `, 'systemverilog');

				return {
					contents: [markdownString]
				};

			}
    }

    
}
