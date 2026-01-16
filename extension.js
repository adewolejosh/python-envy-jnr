const { PythonExtension } = require("@vscode/python-extension");
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

const isWindows = process.platform == "win32";
const pythonFolder = isWindows ? "Scripts" : "bin";
const pythonName = isWindows ? "python.exe" : "python";

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
  let pythonApi = await PythonExtension.api();
  const activeEditor = vscode.window.activeTextEditor;

  if (activeEditor) {
    await setupPythonEnvironment(activeEditor, pythonApi);
  }

  let disposable = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
    if (editor) {
      await setupPythonEnvironment(editor, pythonApi);
    }
  });

  context.subscriptions.push(disposable);
}

async function setupPythonEnvironment(editor, pythonApi) {
  let currentDir = path.dirname(editor.document.uri.fsPath);
  const root = path.parse(currentDir).root;
  const currentWorkspaceFolder = vscode.workspace.getWorkspaceFolder(
    vscode.Uri.file(editor.document.uri.path)
  );
  const currentWorkspaceFolderPath = currentWorkspaceFolder
    ? currentWorkspaceFolder.uri.path
    : null;

  const config = vscode.workspace.getConfiguration("pythonEnvyJnr");
  const venvName = config.get("venvName");
  const showNotifications = config.get("showNotifications", true);

  while (currentDir !== root) {
    const venvPath = path.join(currentDir, venvName);

    if (fs.existsSync(venvPath) && fs.lstatSync(venvPath).isDirectory()) {
      const currentPythonPath =
        pythonApi.environments.getActiveEnvironmentPath();
      let pythonPath = path.join(venvPath, pythonFolder, pythonName);

      if (currentPythonPath.path !== pythonPath) {
        try {
          await pythonApi.environments.updateActiveEnvironmentPath(pythonPath);

          if (showNotifications) {
            vscode.window.showInformationMessage(
              `Python Envy Jnr: interpreter set to: ${pythonPath}`
            );
          }
        } catch (error) {
          vscode.window.showErrorMessage(
            `Python Envy Jnr: error setting Python interpreter: ${error.message}`
          );
        }
      }
      return;
    }

    if (currentDir === currentWorkspaceFolderPath) {
      break;
    }

    currentDir = path.dirname(currentDir);
    if (currentDir === ".") {
      currentDir = "";
    }
  }
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
