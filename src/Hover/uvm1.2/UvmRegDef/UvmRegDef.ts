import * as vscode from 'vscode';

let re_UVM_REG_ADDR_WIDTH 	    = /^UVM_REG_ADDR_WIDTH$/g;
let re_UVM_REG_DATA_WIDTH 		= /^UVM_REG_DATA_WIDTH$/g;
let re_UVM_REG_BYTENABLE_WIDTH  = /^UVM_REG_BYTENABLE_WIDTH$/g;
let re_UVM_REG_CVR_WIDTH 	    = /^UVM_REG_CVR_WIDTH$/g;


export class UvmRegDef implements vscode.HoverProvider {


    public async provideHover(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      let hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			let markdownString = new vscode.MarkdownString();
			

			if (re_UVM_REG_ADDR_WIDTH.test(hoveredWord.toString())) {

				

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`UVM_REG_ADDR_WIDTH\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	Maximum address width in bits.\n	Default value is 64. Used to define the <uvm_reg_addr_t> type.\n`, 'markdown');

				markdownString.appendCodeblock(`\`ifndef UVM_REG_ADDR_WIDTH\n \`define UVM_REG_ADDR_WIDTH 64\n\`endif\n`, 'systemverilog');

				return {
					contents: [markdownString]
				};
			} 
			else if (re_UVM_REG_DATA_WIDTH.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`UVM_REG_DATA_WIDTH\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	Maximum data width in bits.\n	Default value is 64. Used to define the <uvm_reg_data_t> type.`, 'markdown');

				markdownString.appendCodeblock(`\`ifndef UVM_REG_DATA_WIDTH\n \`define UVM_REG_DATA_WIDTH 64\n\`endif\n`, 'systemverilog');

				return {
					contents: [markdownString]
				};		
			} 
			else if (re_UVM_REG_BYTENABLE_WIDTH.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**
				\`UVM_REG_BYTENABLE_WIDTH\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Maximum number of byte enable bits\n    Default value is one per byte in <\`UVM_REG_DATA_WIDTH>. Used to define the <uvm_reg_byte_en_t> type.`, 'markdown');

				markdownString.appendCodeblock(`\`ifndef UVM_REG_DATA_WIDTH\n \`define UVM_REG_DATA_WIDTH 64\n\`endif\n`, 'systemverilog');

				return {
					contents: [markdownString]
				};
			} 		
			else if (re_UVM_REG_CVR_WIDTH.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`UVM_REG_CVR_WIDTH\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Maximum number of bits in a <uvm_reg_cvr_t> coverage model set.\n    Default value is 32.`, 'markdown');

				markdownString.appendCodeblock(`\`ifndef UVM_REG_DATA_WIDTH\n \`define UVM_REG_DATA_WIDTH 64\n\`endif\n`, 'systemverilog');

				return {
					contents: [markdownString]
				};
			} 			
    }

    
}
