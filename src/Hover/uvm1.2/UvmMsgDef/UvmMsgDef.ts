import * as vscode from 'vscode';

// Group:  Basic Messaging Macros
let re_uvm_info 	   		= /^uvm_info$/g;
let re_uvm_warning 			= /^uvm_warning$/g;
let re_uvm_error  			= /^uvm_error$/g;
let re_uvm_fatal 	    	= /^uvm_fatal$/g;
let re_uvm_info_context 	= /^uvm_info_context$/g;
let re_uvm_warning_context 	= /^uvm_warning_context$/
let re_uvm_error_context    = /^uvm_error_context$/g;
let re_uvm_fatal_context 	= /^uvm_fatal_context$/g;

// Group:  Message Trace Macros
let re_uvm_message_begin 	      = /^uvm_message_begin$/g;
let re_uvm_message_end 		      = /^uvm_message_end$/
let re_uvm_message_context_begin  = /^uvm_message_context_begin$/g;
let re_uvm_message_context_end 	  = /^uvm_message_context_end$/g;
let re_uvm_info_begin 	          = /^uvm_info_begin$/g;
let re_uvm_info_end 		      = /^uvm_info_end$/
let re_uvm_warning_begin          = /^uvm_warning_begin$/g;
let re_uvm_warning_end 	          = /^uvm_warning_end$/g;
let re_uvm_error_begin 	          = /^uvm_error_begin$/g;
let re_uvm_error_end 			  = /^uvm_error_end$/
let re_uvm_fatal_begin            = /^uvm_fatal_begin$/g;
let re_uvm_fatal_end 	          = /^uvm_fatal_end$/g;
let re_uvm_info_context_begin 	  = /^uvm_info_context_begin$/g;
let re_uvm_info_context_end 	  = /^uvm_info_context_end$/
let re_uvm_warning_context_begin  = /^uvm_warning_context_begin$/g;
let re_uvm_warning_context_end 	  = /^uvm_warning_context_end$/g;
let re_uvm_error_context_begin    = /^uvm_error_context_begin$/g;
let re_uvm_error_context_end 	  = /^uvm_error_context_end$/
let re_uvm_fatal_context_begin    = /^uvm_fatal_context_begin$/g;
let re_uvm_fatal_context_end 	  = /^uvm_fatal_context_end$/g;

// Group:  Message Element Macros
let re_uvm_message_add_tag 	   = /^uvm_message_add_tag$/g;
let re_uvm_message_add_int 	   = /^uvm_message_add_int$/g;
let re_uvm_message_add_string  = /^uvm_message_add_string$/g;
let re_uvm_message_add_object  = /^uvm_message_add_object$/g;



export class UvmMsgDef implements vscode.HoverProvider {


    public async provideHover(
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      let hoveredWord = document.getText(document.getWordRangeAtPosition(position));
			let markdownString = new vscode.MarkdownString();
			
		//----------------------------------------------------------------------------
		// Group:  Basic Messaging Macros
		//----------------------------------------------------------------------------

			if (re_uvm_info.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_info(ID, MSG, VERBOSITY)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	Calls uvm_report_info if ~VERBOSITY~ is lower than the configured verbosity of the associated reporter. ~ID~ is given as the message tag and ~MSG~ is given as the message text. The file and line are also sent to the uvm_report_info call.\n`, 'markdown');

				return {
					contents: [markdownString]
				};
			} 
			else if (re_uvm_warning.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_warning(ID, MSG)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`	Calls uvm_report_warning with a verbosity of UVM_NONE. The message cannot be turned off using the reporter's verbosity setting, but can be turned off by setting the action for the message. ~ID~ is given as the message tag and ~MSG~ is given as the message text. The file and line are also sent to the uvm_report_warning call.`, 'markdown');

				return {
					contents: [markdownString]
				};		
			} 
			else if (re_uvm_error.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**
				\`uvm_error(ID, MSG)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Calls uvm_report_error with a verbosity of UVM_NONE. The message cannot be turned off using the reporter's verbosity setting, but can be turned off by setting the action for the message. ~ID~ is given as the message tag and ~MSG~ is given as the message text. The file and line are also sent to the uvm_report_error call.`, 'markdown');

				return {
					contents: [markdownString]
				};
			} 		
			else if (re_uvm_fatal.test(hoveredWord.toString())) {

				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_fatal(ID, MSG)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Calls uvm_report_fatal with a verbosity of UVM_NONE. The message cannot be turned off using the reporter's verbosity setting, but can be turned off by setting the action for the message. ~ID~ is given as the message tag and ~MSG~ is given as the message text. The file and line are also sent to the uvm_report_fatal call.`, 'markdown');

				return {
					contents: [markdownString]
				};
			}
			else if (re_uvm_info_context.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_info_context(ID, MSG, VERBOSITY, RO)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Operates identically to \`uvm_info but requires that the context, or <uvm_report_object>, in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_warning_context.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_warning_context(ID, MSG, RO)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Operates identically to \`uvm_warning but requires that the context, or <uvm_report_object>, in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_error_context.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_error_context(ID, MSG, RO)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Operates identically to \`uvm_error but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_fatal_context.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_fatal_context(ID, MSG, RO)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Operates identically to \`uvm_fatal but requires that the context, or <uvm_report_object>, in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}

		//----------------------------------------------------------------------------
		// Group:  Message Trace Macros
		//----------------------------------------------------------------------------


			else if (re_uvm_message_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_begin(SEVERITY, ID, MSG, VERBOSITY, FILE, LINE, RM)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Undocumented. Library internal use.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_message_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Undocumented. Library internal use.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_message_context_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_context_begin(SEVERITY, ID, MSG, VERBOSITY, FILE, LINE, RO, RM)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Undocumented. Library internal use.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_message_context_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_context_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    Undocumented. Library internal use.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_info_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_info_begin(ID, MSG, VERBOSITY, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`   This macro pair provides the ability to add elements to messages.\n`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_info_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_info_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`   This macro pair provides the ability to add elements to messages.\n`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_warning_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_warning_begin(ID, MSG, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end> with exception that the message severity is <UVM_WARNING> and has no verbosity threshold.\n    The usage shown in <\`uvm_info_end> works identically for this pair.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_warning_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_warning_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end> with exception that the message severity is <UVM_WARNING> and has no verbosity threshold.\n    The usage shown in <\`uvm_info_end> works identically for this pair.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_error_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_error_begin(ID, MSG, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end> with exception that the message severity is <UVM_ERROR> and has no verbosity threshold.\n    The usage shown in <\`uvm_info_end> works identically for this pair.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_error_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_error_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end> with exception that the message severity is <UVM_ERROR> and has no verbosity threshold.\n    The usage shown in <\`uvm_info_end> works identically for this pair.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_fatal_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_fatal_begin(ID, MSG, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end> with exception that the message severity is <UVM_FATAL> and has no verbosity threshold.\n    The usage shown in <\`uvm_info_end> works identically for this pair.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_fatal_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_fatal_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end> with exception that the message severity is <UVM_FATAL> and has no verbosity threshold.\n    The usage shown in <\`uvm_info_end> works identically for this pair.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_info_context_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_info_context_begin(ID, MSG, UVM_NONE, RO, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_info_context_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_info_context_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_info_begin>/<\`uvm_info_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_warning_context_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_warning_context_begin(ID, MSG, RO, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_warning_begin>/<\`uvm_warning_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_warning_context_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_warning_context_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_warning_begin>/<\`uvm_warning_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_error_context_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_error_context_begin(ID, MSG, RO, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_error_begin>/<\`uvm_error_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_error_context_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_error_context_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_error_begin>/<\`uvm_error_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_fatal_context_begin.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_fatal_context_begin(ID, MSG, RO, RM = __uvm_msg)\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_fatal_begin>/<\`uvm_fatal_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_fatal_context_end.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_fatal_context_end\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    This macro pair operates identically to <\`uvm_fatal_begin>/<\`uvm_fatal_end>, but requires that the context, or <uvm_report_object> in which the message is printed be explicitly supplied as a macro argument.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}

		//----------------------------------------------------------------------------
		// Group:  Message Element Macros
		//----------------------------------------------------------------------------

			else if (re_uvm_message_add_tag.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_add_tag(NAME, VALUE, ACTION=(UVM_LOG|UVM_RM_RECORD))\n--------\n`);

				// markdownString.appendMarkdown(`- **Description:**\n`);

				// markdownString.appendCodeblock(`    Calls uvm_report_fatal with a verbosity of UVM_NONE. The message cannot be turned off using the reporter's verbosity setting, but can be turned off by setting the action for the message. ~ID~ is given as the message tag and ~MSG~ is given as the message text. The file and line are also sent to the uvm_report_fatal call.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_message_add_int.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_add_int(VAR, RADIX, LABEL = "", ACTION=(UVM_LOG|UVM_RM_RECORD))\n--------\n`);

				// markdownString.appendMarkdown(`- **Description:**\n`);

				// markdownString.appendCodeblock(`    Calls uvm_report_fatal with a verbosity of UVM_NONE. The message cannot be turned off using the reporter's verbosity setting, but can be turned off by setting the action for the message. ~ID~ is given as the message tag and ~MSG~ is given as the message text. The file and line are also sent to the uvm_report_fatal call.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_message_add_string.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_add_string(VAR, LABEL = "", ACTION=(UVM_LOG|UVM_RM_RECORD))\n--------\n`);

				// markdownString.appendMarkdown(`- **Description:**\n`);

				// markdownString.appendCodeblock(`    Calls uvm_report_fatal with a verbosity of UVM_NONE. The message cannot be turned off using the reporter's verbosity setting, but can be turned off by setting the action for the message.  ~ID~ is given as the message tag and ~MSG~ is given as the message text. The file and line are also sent to the uvm_report_fatal call.`, 'markdown');

				return {
					contents: [markdownString]
				};				
			}
			else if (re_uvm_message_add_object.test(hoveredWord.toString())) {


				markdownString.appendMarkdown(`- **MACRO :**\n
				\`uvm_message_add_object(VAR, LABEL = "", ACTION=(UVM_LOG|UVM_RM_RECORD))\n--------\n`);

				markdownString.appendMarkdown(`- **Description:**\n`);

				markdownString.appendCodeblock(`    These macros allow the user to provide elements that are associated with <uvm_report_message>s.  Separate macros are provided such that the user can supply arbitrary string/string pairs using <\`uvm_message_add_tag>,integral types along with a radix using <\`uvm_message_add_int>, string using <\`uvm_message_add_string> and <uvm_object>s using <\`uvm_message_add_object>.\n    Example usage is shown in <\`uvm_info_end>.`, 'markdown');

				markdownString.appendCodeblock(`————————————————————————————————————————————————————————————\n   ...\ntask my_task();\n   ...\n   \`uvm_info_begin("MY_ID", "This is my message...", UVM_LOW)\n	 \`uvm_message_add_tag("my_color", "red")\n	 \`uvm_message_add_int(my_int, UVM_DEC)\n	 \`uvm_message_add_string(my_string)\n	 \`uvm_message_add_object(my_obj)\n   \`uvm_info_end\n   ...\nendtask`, 'systemverilog');

				return {
					contents: [markdownString]
				};				
			}

  }

    
}
