import * as vscode from 'vscode';

let re_uvm_create 				   = /^uvm_create$/g;
let re_uvm_do 					   = /^uvm_do$/g;
let re_uvm_do_pri 				   = /^uvm_do_pri$/g;
let re_uvm_do_with 				   = /^uvm_do_with$/g;
let re_uvm_do_pri_with 			   = /^uvm_do_pri_with$/g;
let re_uvm_create_on 			   = /^uvm_create_on$/g;
let re_uvm_do_on 				   = /^uvm_do_on$/g;
let re_uvm_do_on_pri 			   = /^uvm_do_on_pri$/g;
let re_uvm_do_on_with 			   = /^uvm_do_on_with$/g;
let re_uvm_send 				   = /^uvm_send$/g;
let re_uvm_send_pri 			   = /^uvm_send_pri$/g;
let re_uvm_rand_send 			   = /^uvm_rand_send$/g;
let re_uvm_rand_send_pri 		   = /^uvm_rand_send_pri$/g;
let re_uvm_rand_send_with 		   = /^uvm_rand_send_with$/g;
let re_uvm_rand_send_pri_with 	   = /^uvm_rand_send_pri_with$/g;
let re_uvm_create_seq 			   = /^uvm_create_seq$/g;
let re_uvm_do_seq 				   = /^uvm_do_seq$/g;
let re_uvm_do_seq_with 		       = /^uvm_do_seq_with$/g;
let re_uvm_add_to_seq_lib          = /^uvm_add_to_seq_lib$/g;
let re_uvm_sequence_library_utils  = /^uvm_sequence_library_utils$/g;
let re_uvm_declare_p_sequencer     = /^uvm_declare_p_sequencer$/g;


// let re_uvm_do_on_with = /^uvm_do_on_with$/g;



export class UvmSeqDef implements vscode.HoverProvider {


    public async provideHover(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      let hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			let markdownString = new vscode.MarkdownString();
			

			if (re_uvm_create.test(hoveredWord.toString())) {

				

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_create(SEQ_OR_ITEM)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	This action creates the item or sequence using the factory.  It intentionally does zero processing.  After this action completes, the user can manually set values, manipulate rand_mode and constraint_mode, etc. \n`, 'markdown');

				return {
					contents: [markdownString]
				};
			} 
			else if (re_uvm_do.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do(SEQ_OR_ITEM)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	This macro takes as an argument a uvm_sequence_item variable or object.The argument is created using \<\`uvm_create\> if necessary,then randomized. \n`, 'markdown');

				markdownString.appendCodeblock(`	In the case of an item, it is randomized after the call to constraints. \n <uvm_sequence_base::start_item()> returns.This is called late-randomization. \n`, 'markdown');

				markdownString.appendCodeblock(`    In the case of a sequence, the sub-sequence is started using \n <uvm_sequence_base::start()> with ~call_pre_post~ set to 0. \n`, 'markdown');

				markdownString.appendCodeblock(`    In the case of an item, the item is sent to the driver through the associated sequencer.\n`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\nFor a sequence item, the following are called, in order \n	\`uvm_create(item) \n	sequencer.wait_for_grant(prior) (task) \n	this.pre_do(1)                  (task) \n	item.randomize() \n	this.mid_do(item)               (func) \n	sequencer.send_request(item)    (func) \n	sequencer.wait_for_item_done()  (task) \n	this.post_do(item)              (func)\n————————————————————————————————————————————————————————————\nFor a sequence, the following are called, in order \n	\`uvm_create(sub_seq) \n	sub_seq.randomize() \n	sub_seq.pre_start()         (task) \n	this.pre_do(0)              (task) \n	this.mid_do(sub_seq)        (func) \n	sub_seq.body()              (task) \n	this.post_do(sub_seq)       (func) \n	sub_seq.post_start()        (task) \n`, 'systemverilog');

				return {
					contents: [markdownString]
				};		
			} 
			else if (re_uvm_do_pri.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**
				\`uvm_do_pri(SEQ_OR_ITEM, PRIORITY)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_do except that the sequence item or sequence is executed with the priority specified in the argument. `, 'markdown');

				return {
					contents: [markdownString]
				};
			} 		
			else if (re_uvm_do_with.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do_with(SEQ_OR_ITEM, CONSTRAINTS)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_do except that the constraint block in the 2nd argument is applied to the item or sequence in a randomize with statement before execution. `, 'markdown');

				return {
					contents: [markdownString]
				};
			} 		
			else if (re_uvm_do_pri_with.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do_pri_with(SEQ_OR_ITEM, PRIORITY, CONSTRAINTS)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_do_pri except that the given constraint block is applied to the item or sequence in a randomize with statement before  execution. `, 'markdown');

				return {
					contents: [markdownString]
				};		
			} 	
			else if (re_uvm_create_on.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_create_on(SEQ_OR_ITEM, SEQR)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as <\`uvm_create> except that it also sets the parent sequence to the sequence in which the macro is invoked, and it sets the sequencer to the specified ~SEQR~ argument. `, 'markdown');
			
				return {
					contents: [markdownString]
				};
			} 	
			else if (re_uvm_do_on.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do_on(SEQ_OR_ITEM, SEQR)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as <\`uvm_do> except that it also sets the parent sequence to the sequence in which the macro is invoked, and it sets the sequencer to the specified ~SEQR~ argument. `, 'markdown');

				return {
					contents: [markdownString]
				};
			} 		
			else if (re_uvm_do_on_pri.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do_on_pri(SEQ_OR_ITEM, SEQR, PRIORITY)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as <\`uvm_do_pri> except that it also sets the parent sequence to the sequence in which the macro is invoked, and it sets the sequencer to the specified ~SEQR~ argument. `, 'markdown');

				return {
					contents: [markdownString]
				};
			}
			 	
			else if (re_uvm_do_on_with.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do_on_with(SEQ_OR_ITEM, SEQR, CONSTRAINTS)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as <\`uvm_do_with> except that it also sets the parent sequence to the sequence in which the macro is invoked, and it sets the sequencer to the specified ~SEQR~ argument.The user must supply brackets around the constraints. `, 'markdown');

				return {
					contents: [markdownString]
				};		
			} 
			else if (re_uvm_send.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_send(SEQ_OR_ITEM)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro processes the item or sequence that has been created using \`uvm_create.  The processing is done without randomization.  Essentially, an \`uvm_do without the create or randomization.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 				  
			else if (re_uvm_send_pri.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_send_pri(SEQ_OR_ITEM, PRIORITY)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_send except that the sequence item or sequence is executed with the priority specified in the argument.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 			  
			else if (re_uvm_rand_send.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_rand_send(SEQ_OR_ITEM)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro processes the item or sequence that has been already been allocated (possibly with \`uvm_create). The processing is done with randomization.  Essentially, an \`uvm_do without the create.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 			  
			else if (re_uvm_rand_send_pri.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_rand_send_pri(SEQ_OR_ITEM, PRIORITY)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_rand_send except that the sequence item or sequence is executed with the priority specified in the argument.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 		  
			else if (re_uvm_rand_send_with.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_rand_send_with(SEQ_OR_ITEM, CONSTRAINTS)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_rand_send except that the given constraint block is applied to the item or sequence in a randomize with statement before execution.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 		  
			else if (re_uvm_rand_send_pri_with.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_rand_send_pri_with(SEQ_OR_ITEM, PRIORITY, CONSTRAINTS)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_rand_send_pri except that the given constraint block is applied to the item or sequence in a randomize with statement before execution.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 	  
			else if (re_uvm_create_seq.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_create_seq(UVM_SEQ, SEQR_CONS_IF)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_create_on`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 			  
			else if (re_uvm_do_seq.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do_seq(UVM_SEQ, SEQR_CONS_IF)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_do_on`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 				  
			else if (re_uvm_do_seq_with.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_do_seq_with(UVM_SEQ, SEQR_CONS_IF, CONSTRAINTS)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This is the same as \`uvm_do_on_with`, 'markdown');

				return {
					contents: [markdownString]
				};	
			} 		  
			else if (re_uvm_add_to_seq_lib.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_add_to_seq_lib(TYPE,LIBTYPE)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Adds the given sequence ~TYPE~ to the given sequence library ~LIBTYPE~\n`, 'markdown');

				markdownString.appendCodeblock(`    Invoke any number of times within a sequence declaration to statically add that sequence to one or more sequence library types.The sequence will then be available for selection and execution in all instances of the given sequencer types.\n`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\nclass seqA extends uvm_sequence_base #(simple_item);\n   function new(string name=\`"TYPE\`");\n     super.new(name);\n   endfunction\n   \`uvm_object_utils(seqA)\n   \`uvm_add_to_seq_lib(seqA, simple_seq_lib_RST)\n   \`uvm_add_to_seq_lib(seqA, simple_seq_lib_CFG)
				virtual task body();\n   \`uvm_info("SEQ_START", {"Executing sequence '", get_full_name(),\n                         "' (",get_type_name(),")"},UVM_HIGH)\n     #10;\n   endtask\nendclass\n————————————————————————————————————————————————————————————\n`, 'systemverilog');

				return {
					contents: [markdownString]
				};	
			}        
			else if (re_uvm_sequence_library_utils.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_sequence_library_utils(TYPE)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	Declares the infrastructure needed to define extensions to the <uvm_sequence_library> class. You define new sequence library subtypes to statically specify sequence membership from within sequence definitions. See also <\`uvm_add_to_sequence_library> for more information.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\ntypedef simple_seq_lib uvm_sequence_library #(simple_item);\nclass simple_seq_lib_RST extends simple_seq_lib;\n  \`uvm_object_utils(simple_seq_lib_RST)\n  \`uvm_sequence_library_utils(simple_seq_lib_RST)\n  function new(string name="");\n	super.new(name);\n  endfunction\nendclass\n————————————————————————————————————————————————————————————\n`, 'systemverilog');

				markdownString.appendCodeblock(`	Each library, itself a sequence, can then be started independently on different sequencers or in different phases of the same sequencer.See <uvm_sequencer_base::start_phase_sequence> for information on starting default sequences.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			}
			else if (re_uvm_declare_p_sequencer.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_declare_p_sequencer(SEQUENCER)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	This macro is used to declare a variable ~p_sequencer~ whose type is specified by ~SEQUENCER~.\n`, 'markdown');

				markdownString.appendCodeblock(`	The example below shows using the \`uvm_declare_p_sequencer macro along with the uvm_object_utils macros to set up the sequence but not register the sequence in the sequencer's library.`, 'markdown');


				markdownString.appendCodeblock(`	Declares the infrastructure needed to define extensions to the <uvm_sequence_library> class. You define new sequence library subtypes to statically specify sequence membership from within sequence definitions. See also <\`uvm_add_to_sequence_library> for more information.`, 'markdown');

				markdownString.appendCodeblock(`\n————————————————————————————————————————————————————————————\nclass mysequence extends uvm_sequence#(mydata);\n  \`uvm_object_utils(mysequence)\n  \`uvm_declare_p_sequencer(some_seqr_type)\n  task body;\n    //Access some variable in the user's custom sequencer\n    if(p_sequencer.some_variable) begin\n      ...\n    end\n  endtask\nendclass\n————————————————————————————————————————————————————————————\n`, 'systemverilog');

				// markdownString.appendCodeblock(`	Each library, itself a sequence, can then be started independently on different sequencers or in different phases of the same sequencer.See <uvm_sequencer_base::start_phase_sequence> for information on starting default sequences.`, 'markdown');

				return {
					contents: [markdownString]
				};	
			}   

    }

    
}
