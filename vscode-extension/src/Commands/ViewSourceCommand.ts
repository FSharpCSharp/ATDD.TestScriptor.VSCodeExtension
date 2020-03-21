import { TextDocument, workspace, ViewColumn, window, TextEditorRevealType, Selection, Range } from 'vscode';
import { IMessageBase } from '../typings/IMessageBase';
import { CommandBase } from './CommandBase';
import { WebPanel } from '../WebPanel';

export class ViewSourceCommand extends CommandBase {

    async execute(message: IMessageBase) {
        let doc: TextDocument = await workspace.openTextDocument(message.Data.FsPath);
        let editor = await window.showTextDocument(doc, ViewColumn.Beside);

        let text = editor.document.getText();

        let itemIndex = text.indexOf(message.Data.MethodName);
        let x = editor.document.positionAt(itemIndex);
        editor.selection = new Selection(x, x);
        editor.revealRange(new Range(x, x), TextEditorRevealType.InCenter);

        await WebPanel.postMessage(null);
    }
}