import * as assert from 'assert';
import * as vscode from 'vscode';
// Remember to import your activate function from your extension.ts file to ensure the extension is activated during the tests. Depending on your project setup, the import path may vary.
import { activate } from '../../extension';
import { commands, window, workspace, TextEditor, Position, TextDocument, Uri } from 'vscode';

suite('Extension Test Suite', function () {
	this.timeout(5000);
  vscode.window.showInformationMessage('Start all tests.');

  test('Inserts random string with default length', async () => {
    // Create new document
    const doc: TextDocument = await workspace.openTextDocument({ content: '', language: 'plaintext' });
    const editor: TextEditor = await window.showTextDocument(doc);

    // Execute your extension command
    await commands.executeCommand('coffee-spill.spillSomeCoffee');

    const text = editor.document.getText();
    assert.strictEqual(text.length >= 20 && text.length <= 120, true);
  });

  test('Inserts random string with custom length', async () => {
    // Override configuration settings
    await workspace.getConfiguration('coffee-spill').update('minStringLength', 5, vscode.ConfigurationTarget.Global);
		await workspace.getConfiguration('coffee-spill').update('maxStringLength', 20, vscode.ConfigurationTarget.Global);

    // Create new document
    const doc: TextDocument = await workspace.openTextDocument({ content: '', language: 'plaintext' });
    const editor: TextEditor = await window.showTextDocument(doc);

    // Execute your extension command
    await commands.executeCommand('coffee-spill.spillSomeCoffee');

    const text = editor.document.getText();
    assert.strictEqual(text.length >= 5 && text.length <= 20, true);
  });

  // Cleanup after tests
  suiteTeardown(() => {
    workspace.getConfiguration('coffee-spill').update('minStringLength', undefined);
    workspace.getConfiguration('coffee-spill').update('maxStringLength', undefined);
  });
});
