'use client';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { Controller } from 'react-hook-form';

import { ICodePreviewProps } from '@/types/codeMirrorType';
import { json, jsonParseLinter } from '@codemirror/lang-json';
import { linter } from '@codemirror/lint';
import CodeMirror from '@uiw/react-codemirror';
import { basicSetup } from 'codemirror';

const CodePreview = ({
  body,
  control,
  lang,
  onLang,
  readonly,
}: ICodePreviewProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    if (onLang) onLang(event.target.value);
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

      {control ? (
        <Controller
          name='body'
          control={control}
          render={({ field: { onChange, onBlur, ref } }) => (
            <CodeMirror
              value={body ?? ''}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              extensions={
                lang === 'json'
                  ? [json(), linter(jsonParseLinter())]
                  : [basicSetup]
              }
              editable={!readonly}
            />
          )}
        />
      ) : (
        <CodeMirror
          value={body ?? ''}
          onChange={value => console.log(value)}
          extensions={
            lang === 'json' ? [json(), linter(jsonParseLinter())] : [basicSetup]
          }
          editable={!readonly}
        />
      )}
    </>
  );
};

export default CodePreview;
