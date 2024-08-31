'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from 'codemirror';

interface ICodePreviewProps {
  body?: string;
  onChange?: (value: string) => void;
  lang?: string;
  onLang?: (value: string) => void;
  readonly?: boolean;
}

const CodePreview: React.FC<ICodePreviewProps> = ({
  body,
  onChange,
  lang,
  onLang,
  readonly,
}) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    if (onLang) onLang(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      {readonly ? (
        ''
      ) : (
        <FormControl fullWidth sx={{ width: '20%', marginBottom: '10px' }}>
          <InputLabel id='lang-label'>Language</InputLabel>
          <Select
            labelId='lang-label'
            label='Language'
            fullWidth
            variant='outlined'
            defaultValue='text'
            onChange={handleChange}
          >
            <MenuItem value='text'>Text</MenuItem>
            <MenuItem value='json'>Json</MenuItem>
          </Select>
        </FormControl>
      )}

      <CodeMirror
        value={body ? body : ''}
        onChange={onChange}
        extensions={
          lang === 'json' ? [json(), linter(jsonParseLinter())] : [basicSetup]
        }
        editable={!readonly}
      />
    </>
  );
};

export default CodePreview;
