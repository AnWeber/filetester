import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const outputChannel = vscode.window.createOutputChannel(`FileEvents Tester`);
        outputChannel.show(true);
	const fileSystemWatcher = vscode.workspace.createFileSystemWatcher("**/*.json");
	const log = (text: string) => {
		console.info(`[File Watcher Test] ${text}`);
		outputChannel.appendLine(text);
	};
	context.subscriptions.push(...[
		vscode.workspace.onDidCreateFiles(() => {
			log("onDidCreateFiles called");
		}),
		vscode.workspace.onDidDeleteFiles(() => {
			log("onDidDeleteFiles called");
		}),
		vscode.workspace.onDidRenameFiles(() => {
			log("onDidDeleteFiles called");
		}),
		fileSystemWatcher.onDidCreate(() => log("FileSystemWatcher onDidCreate called")),
		fileSystemWatcher.onDidDelete(() => log("FileSystemWatcher onDidDelete called")),
		fileSystemWatcher
	]);
}