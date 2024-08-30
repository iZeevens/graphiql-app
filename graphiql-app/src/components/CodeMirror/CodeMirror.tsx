'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { useState } from 'react';

import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from 'codemirror';

interface ICodePreviewProps {
  body: string;
  onChange: (value: string) => void;
}

const CodePreview = ({ body, onChange }: ICodePreviewProps) => {
  const [lang, setLang] = useState('text');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setLang(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
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
      <CodeMirror
        value={body}
        onChange={onChange}
        extensions={
          lang === 'json' ? [json(), linter(jsonParseLinter())] : [basicSetup]
        }
      />
    </>
  );
};

export default CodePreview;
