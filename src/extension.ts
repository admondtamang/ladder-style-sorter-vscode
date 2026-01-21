import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "ladderStyleSorter.sortImports",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        vscode.window.showErrorMessage("No active editor found");
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);

      // If no text is selected, try to auto-detect import block
      let textToSort = selectedText;
      let rangeToReplace: vscode.Range = selection;

      if (!selectedText || selectedText.trim() === "") {
        const result = autoDetectImports(editor.document);
        if (result) {
          textToSort = result.text;
          rangeToReplace = result.range;
        } else {
          vscode.window.showErrorMessage(
            "No imports found. Please select import statements.",
          );
          return;
        }
      }

      // Split into lines and filter out empty lines
      const lines = textToSort.split("\n").filter((line) => line.trim() !== "");

      // Sort by length (ascending - ladder style)
      const sortedLines = lines.sort((a, b) => a.length - b.length);

      // Join back with newlines
      const sortedText = sortedLines.join("\n");

      // Replace the selected text with sorted text
      editor
        .edit((editBuilder) => {
          editBuilder.replace(rangeToReplace, sortedText);
        })
        .then((success) => {
          if (success) {
            vscode.window.showInformationMessage(
              "Imports sorted in ladder style! 🪜",
            );
          }
        });
    },
  );

  context.subscriptions.push(disposable);
}

function autoDetectImports(
  document: vscode.TextDocument,
): { text: string; range: vscode.Range } | null {
  const text = document.getText();
  const lines = text.split("\n");

  let startLine = -1;
  let endLine = -1;

  // Find the first import statement
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (
      trimmed.startsWith("import ") ||
      trimmed.startsWith("import{") ||
      trimmed.startsWith("import{")
    ) {
      startLine = i;
      break;
    }
  }

  if (startLine === -1) {
    return null;
  }

  // Find the last consecutive import statement
  for (let i = startLine; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (
      trimmed.startsWith("import ") ||
      trimmed.startsWith("import{") ||
      trimmed.startsWith("import{")
    ) {
      endLine = i;
    } else if (trimmed !== "" && !trimmed.startsWith("//")) {
      // Stop at first non-import, non-empty, non-comment line
      break;
    }
  }

  if (endLine === -1) {
    return null;
  }

  const importLines = lines.slice(startLine, endLine + 1).filter((line) => {
    const trimmed = line.trim();
    return trimmed.startsWith("import ");
  });

  const range = new vscode.Range(
    new vscode.Position(startLine, 0),
    new vscode.Position(endLine, lines[endLine].length),
  );

  return {
    text: importLines.join("\n"),
    range: range,
  };
}

export function deactivate() {}
