import { DocNodeKind, IDocNodeParameters, DocNode, IDocNodeParsedParameters, TokenSequence } from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';
/**
 * Constructor parameters for {@link DocSoftBreak}.
 */
export interface IDocSoftBreakParameters extends IDocNodeParameters {
}
/**
 * Constructor parameters for {@link DocSoftBreak}.
 */
export interface IDocSoftBreakParsedParameters extends IDocNodeParsedParameters {
    softBreakExcerpt: TokenSequence;
}
/**
 * Instructs a renderer to insert an explicit newline in the output.
 * (Normally the renderer uses a formatting rule to determine where
 * lines should wrap.)
 *
 * @remarks
 * In HTML, a soft break is represented as an ASCII newline character (which does not
 * affect the web browser's view), whereas the hard break is the `<br />` element
 * (which starts a new line in the web browser's view).
 *
 * TSDoc follows the same conventions, except the renderer avoids emitting
 * two empty lines (because that could start a new CommonMark paragraph).
 */
export class DocForceSoftBreak extends DocNode {
    /**
     * Don't call this directly.  Instead use {@link TSDocParser}
     * @internal
     */
    constructor(parameters: IDocSoftBreakParameters | IDocSoftBreakParsedParameters) {
        super(parameters);
    }

    /** @override */
    public get kind(): string {
        return CustomDocNodeKind.ForceSoftBreak;
    }
    /** @override */
    protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
        return [];
    }
}
//# sourceMappingURL=DocSoftBreak.d.ts.map