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
import { useTranslations } from 'next-intl';

import VariablesSection from '../Variables/Variables';

const CodePreview = ({
  body,
  control,
  lang,
  onLang,
  readonly,
  urlChanged,
}: ICodePreviewProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    if (onLang) onLang(event.target.value);
  };

  const t = useTranslations('rest');

  return (
    <>
      {!readonly && (
        <FormControl fullWidth sx={{ width: '20%', marginBottom: '10px' }}>
          <InputLabel id='lang-label'>{t('language')}</InputLabel>
          <Select
            labelId='lang-label'
            label='Language'
            fullWidth
            variant='outlined'
            defaultValue='text'
            onChange={handleChange}
          >
            <MenuItem value='text'>{t('text')}</MenuItem>
            <MenuItem value='json'>{t('json')}</MenuItem>
          </Select>
        </FormControl>
      )}

      {control ? (
        <Controller
          name='body'
          control={control}
          render={({ field }) => (
            <CodeMirror
              {...field}
              value={body ?? ''}
              onBlur={() => {
                field.onBlur();
                if (urlChanged) {
                  urlChanged();
                }
              }}
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
          extensions={
            lang === 'json' ? [json(), linter(jsonParseLinter())] : [basicSetup]
          }
          editable={!readonly}
        />
      )}
      {control && lang === 'json' && <VariablesSection control={control} />}
    </>
  );
};

export default CodePreview;
