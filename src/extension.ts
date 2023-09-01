// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('coffee-spill.spillSomeCoffee', () => {
		const config = vscode.workspace.getConfiguration('coffee-spill');
    const minStringLength = config.get<number>('minStringLength', 20);
    const maxStringLength = config.get<number>('maxStringLength', 120);
		
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~!@#$%^&*()-=_+[]{}|;:,.<>?';
    const strLength = Math.abs(Math.floor(Math.random() * (maxStringLength - minStringLength + 1))) + minStringLength;
    let randomStr = '';

    for (let i = 0; i < strLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomStr += chars[randomIndex];
    }

    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const selection = editor.selection;

      const edit = new vscode.WorkspaceEdit();
      edit.replace(document.uri, selection, randomStr);

      return vscode.workspace.applyEdit(edit);
    }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
