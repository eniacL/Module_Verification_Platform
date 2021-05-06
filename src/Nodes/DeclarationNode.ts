import * as path from "path";
import * as vscode from "vscode";

export abstract class DeclarationNode extends vscode.TreeItem
{
	// #region Properties (8)

	protected readonly imageDir = path.join(__filename, "..", "..", "..", "resources", "images", "tree_icons");

	public children: DeclarationNode[] = [];
	public end: vscode.Position = new vscode.Position(0, 0);
	public name: string | null = null;
	public parent: DeclarationNode | null = null;
	public start: vscode.Position = new vscode.Position(0, 0);

	// #endregion

	// #region Constructors (1)

	constructor()
	{
		super("", vscode.TreeItemCollapsibleState.Expanded);
	}

	// #endregion

	// #region Public Accessors (1)

	//@ts-ignore
	public get tooltip(): string
	{
		//@ts-ignore
		return this.label!;
	}

}