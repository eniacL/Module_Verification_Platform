import * as vscode from 'vscode';
import * as path from 'path';

export default async function news (
    context: vscode.ExtensionContext,
    viewType: string,
    title: string
) {
        const webviewDir = path.join(context.extensionPath, 'resources');
        const panel = vscode.window.createWebviewPanel(
        viewType,
        title,
        vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [vscode.Uri.file(webviewDir)]
        }
    );

    const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath,'resources/images/webview','uvmclassmap.png')
    );
    const uvmMapSrc = onDiskPath.with({ scheme: 'vscode-resource'});

    panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>UVM类库地图</title>
    </head>
    <body>
        <img src="${uvmMapSrc}" />
    </body>
    </html>`;
}