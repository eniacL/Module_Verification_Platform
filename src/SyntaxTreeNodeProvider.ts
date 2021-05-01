import * as ts from "typescript";
import * as vscode from "vscode";
import { ProviderResult } from "vscode";
import { ClassDeclarationNode } from "./Nodes/ClassDeclarationNode";
import { DeclarationNode } from "./Nodes/DeclarationNode";
import { EmptyDeclarationNode } from "./Nodes/EmptyDeclarationNode";

export class SyntaxTreeNodeProvider implements vscode.TreeDataProvider<DeclarationNode>
{
	// #region Properties (4)

	private _onDidChangeTreeData: vscode.EventEmitter<DeclarationNode | undefined> = new vscode.EventEmitter<DeclarationNode | undefined>();
	private editor: vscode.TextEditor | null = null;
	private rootElements: DeclarationNode[] = [new EmptyDeclarationNode()];

	public readonly onDidChangeTreeData: vscode.Event<DeclarationNode | undefined> = this._onDidChangeTreeData.event;

	// #endregion

	// #region Constructors (1)

	constructor(private workspaceRoot: string)
	{
	}

	// #endregion

	// #region Public Accessors (1)

	public get rootElement(): DeclarationNode
	{
		return this.rootElements[0];
	}

	// #endregion

	// #region Public Methods (6)

	public findNode(nodes: DeclarationNode[], positionStart: vscode.Position, positionEnd: vscode.Position): DeclarationNode | null
	{
		let result: DeclarationNode | null;

		// try to find a match among the child nodes
		for (let node of nodes)
		{
			result = this.findNode(node.children, positionStart, positionEnd);

			if (result)
			{
				return result;
			}
		}

		// try to find a match among the nodes
		for (let node of nodes)
		{
			if (node.start.isBeforeOrEqual(positionStart) &&
				node.end.isAfterOrEqual(positionEnd))
			{
				return node;
			}
		}

		return null;
	}

	public getChildren(element?: DeclarationNode): Thenable<DeclarationNode[]>
	{
		let children: DeclarationNode[] = [];

		if (this.workspaceRoot &&
			this.editor)
		{
			children = element ? element.children : this.rootElements;
		}

		return Promise.resolve(children);
	}

	public getNode(positionStart: vscode.Position, positionEnd: vscode.Position)
	{
		return this.findNode(this.rootElements, positionStart, positionEnd);
	}

	public getParent?(element: DeclarationNode): ProviderResult<DeclarationNode>
	{
		if (element)
		{
			return element.parent;
		}
		else
		{
			return null;
		}
	}

	public getTreeItem(element: DeclarationNode): vscode.TreeItem
	{
		return element;
	}

	public refresh(editor: vscode.TextEditor): void
	{
		this.editor = editor;

		if (this.editor)
		{
			this.rootElements = this.analyzeSyntaxTree(this.editor!.document.getText());
		}
		else
		{
			this.rootElements = [new EmptyDeclarationNode()];
		}

		this._onDidChangeTreeData.fire();
	}

	// #endregion

	// #region Private Methods (18)

	private analyzeSyntaxTree(sourceCode: string)
	{
		let rootElements: DeclarationNode[] = [];
		let sourceFile: ts.SourceFile;

		// generate ast
		sourceFile = ts.createSourceFile("temp", sourceCode, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);

		// analyze ast
		for (let node of sourceFile.getChildren(sourceFile))
		{
			for (let rootElement of this.visitSyntaxTree(node, sourceFile, null))
			{
				rootElements.push(rootElement);
			}
		}

		if (rootElements.length == 0)
		{
			// default item
			rootElements.push(new EmptyDeclarationNode());
		}

		return rootElements.sort((a, b) => this.compare(a, b));
	}

	private compare(a: DeclarationNode, b: DeclarationNode)
	{
		let valueA = this.getOrder(a);
		let valueB = this.getOrder(b);



		if (valueA > valueB)
		{			
			return 1;
		}
		else if (valueA < valueB)
		{
			return -1;
		}
		else
		{
			
			if (a.label!.toLowerCase() > b.label!.toLowerCase())
			{
				return 1;
			}
			else if (a.label!.toLowerCase() < b.label!.toLowerCase())
			{
				return -1;
			}
			else
			{
				return 0;
			}
		}
	}

	private getClassDeclarationNode(sourceFile: ts.SourceFile, node: ts.ClassDeclaration, parentElement: DeclarationNode | null, childElements: DeclarationNode[])
	{
		let identifier = <ts.Identifier>node.name;
		let position = sourceFile.getLineAndCharacterOfPosition(identifier.getStart(sourceFile, false));
		let className = identifier.escapedText.toString();
		let isExport: boolean = false;
		let isAbstract: boolean = false;
		let start = this.editor!.document.positionAt(node.getStart(sourceFile, false));
		let end = this.editor!.document.positionAt(node.getEnd());

		// console.log(identifier);
		// console.log(position);
		// console.log(className);
		// console.log(isExport);
		// console.log(isAbstract);
		// console.log(start);
		// console.log(end);
		

		// class modifiers
		if (node.modifiers)
		{
			let tmp = node.modifiers.find((modifier, index, array) => modifier.kind == ts.SyntaxKind.ExportKeyword);

			if (tmp &&
				tmp.kind === ts.SyntaxKind.ExportKeyword)
			{
				isExport = true;
			}

			tmp = node.modifiers.find((modifier, index, array) => modifier.kind == ts.SyntaxKind.AbstractKeyword);

			if (tmp &&
				tmp.kind === ts.SyntaxKind.AbstractKeyword)
			{
				isAbstract = true;
			}
		}

		return new ClassDeclarationNode(className, isExport, isAbstract, parentElement, childElements, this.getCommand(position), start, end);
	}

	private getCommand(position: ts.LineAndCharacter)
	{
		let commandName = "mvp.goto";
		let position2 = new vscode.Position(position.line, position.character);
		let command = {
			command: commandName,
			title: '',
			arguments: [this.editor, position2]
		};

		return command;
	}



	private getOrder(declarationNode: DeclarationNode)
	{
		if (declarationNode instanceof ClassDeclarationNode)
		{
			return 102;
		}



		if (declarationNode instanceof EmptyDeclarationNode)
		{
			return 501;
		}

		return 601;
	}




	private visitSyntaxTree(node: ts.Node, sourceFile: ts.SourceFile, parentElement: DeclarationNode | null): DeclarationNode[]
	{
		let elements: DeclarationNode[] = [];
		let childElements: DeclarationNode[] = [];

		// get element
		if (ts.isClassDeclaration(node))
		{
			elements.push(this.getClassDeclarationNode(sourceFile, node, parentElement, childElements));
		}

		// get child elements
		for (let childNode of node.getChildren(sourceFile))
		{
			for (let childElement of this.visitSyntaxTree(childNode, sourceFile, elements.length > 0 ? elements[0] : parentElement))
			{
				childElements.push(childElement);
			}
		}

		if (elements.length == 0)
		{
			return childElements.sort((a, b) => this.compare(a, b));
		}
		else
		{
			elements.forEach(x => x.collapsibleState = x.children.length > 0 ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.None);

			return elements;
		}
	}

	// #endregion
}