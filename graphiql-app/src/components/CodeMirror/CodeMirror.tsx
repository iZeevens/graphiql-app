'use client';

import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import CodeMirror from '@uiw/react-codemirror';

interface ICodePreviewProps {
  body: string;
  onChange: (value: string) => void;
}

const CodePreview = ({ body, onChange }: ICodePreviewProps) => {
  return (
    <CodeMirror
      value={body}
      onChange={onChange}
      extensions={[json(), linter(jsonParseLinter())]}
    />
  );
};

export default CodePreview;
