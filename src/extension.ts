// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DeclarationNode } from "./Nodes/DeclarationNode";
import { SyntaxTreeNodeProvider } from "./SyntaxTreeNodeProvider";

import { HdboTrans } from "./Hover/HdboTrans"
import { UvmSeqDef } from "./Hover/uvm1.2/UvmSeqDef/UvmSeqDef"

'use strict';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	let view: vscode.TreeView<DeclarationNode>;
	let nodeDependenciesProvider: SyntaxTreeNodeProvider;
	let selecting: boolean = false;

	nodeDependenciesProvider = new SyntaxTreeNodeProvider(vscode.workspace.rootPath!);



	//	*******************************************************************************************************************  //
	//	************************************************** Explorer Part **************************************************	 //
	//	*******************************************************************************************************************  //

	// register the tree provider with the view
	view = vscode.window.createTreeView('mvp.codeExplorer', { treeDataProvider: nodeDependenciesProvider });

	vscode.workspace.onDidChangeTextDocument(e =>
	{
		// editor contents changed -> refresh view with the current window
		nodeDependenciesProvider.refresh(vscode.window.activeTextEditor!);
	});
	vscode.workspace.onDidOpenTextDocument(textDocument =>
	{
		// editor opened -> refresh view with the current window
		nodeDependenciesProvider.refresh(vscode.window.activeTextEditor!);
	});
	vscode.workspace.onDidCloseTextDocument(textDocument =>
	{
		// editor closed -> refresh view with the current window
		nodeDependenciesProvider.refresh(vscode.window.activeTextEditor!);
	});

	vscode.window.onDidChangeActiveTextEditor(editor =>
	{
		// switched editors -> refresh view with the current window
		nodeDependenciesProvider.refresh(editor!);
	});
	vscode.window.onDidChangeTextEditorSelection(e =>
	{
		if (!selecting)
		{
			// cursor position changed -> try to find a node that corresponds to the position and select it in the view
			if (e.textEditor &&
				e.selections &&
				e.selections.length > 0)
			{
				let currentNode = nodeDependenciesProvider.getNode(e.selections[0].start, e.selections[e.selections.length - 1].end);

				if (currentNode)
				{
					if (view.visible)
					{
						view.reveal(currentNode, { select: true, focus: false });
					}
				}
			}
		}
	});

	//	*******************************************************************************************************************  //
	//	***************************************************** go part *****************************************************	 //
	//	*******************************************************************************************************************  //

	vscode.commands.registerCommand('mvp.goto', (editor: vscode.TextEditor, position: vscode.Position) =>
	{
		selecting = true;

		// node clicked -> move cursor to the element
		editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.AtTop);
		editor.selection = new vscode.Selection(position, position);
		editor.show();

		selecting = false;
	});

	//	*******************************************************************************************************************  //
	//	**************************************************** show part ****************************************************	 //
	//	*******************************************************************************************************************  //

	context.subscriptions.push(vscode.commands.registerCommand('mvp.showCodeExplorer', () =>
	{
		// show code explorer requested -> show view
		if (view.selection &&
			view.selection.length > 0)
		{
			view.reveal(view.selection[0], { select: true, focus: true });
		}
		else
		{
			view.reveal(nodeDependenciesProvider.rootElement, { select: true, focus: true });
		}
	}));

	if (vscode.window.activeTextEditor)
	{
		nodeDependenciesProvider.refresh(vscode.window.activeTextEditor);
	}

	//	*******************************************************************************************************************  //
	//	**************************************************** hover part ***************************************************	 //
	//	*******************************************************************************************************************  //
	context.subscriptions.push(
		vscode.languages.registerHoverProvider(
		  [
			{ language: 'systemverilog', scheme: '*' }
		  ],
		  new HdboTrans()
		)
	  );

	context.subscriptions.push(
		vscode.languages.registerHoverProvider(
		  [
			{ language: 'systemverilog', scheme: '*' }
		  ],
		  new UvmSeqDef()
		)
	  );

}

// this method is called when your extension is deactivated
export function deactivate() {}
