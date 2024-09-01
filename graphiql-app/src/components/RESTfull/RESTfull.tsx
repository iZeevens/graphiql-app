'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

import { IRestFullFormData } from '@/types/formsType';
import { IHeader } from '@/types/formsType';
import { schemaRestFull } from '@/utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';

import CodePreview from '../CodeMirror/CodeMirror';

import styles from '@/components/RESTfull/RESTfull.module.scss';

const Restfull = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<IRestFullFormData>({
    resolver: yupResolver(schemaRestFull),
    mode: 'onChange',
  });
  const [headers, setHeaders] = useState<IHeader[]>([]);
  const [status, setStatus] = useState<string>();
  const [textResponse, setTextResponse] = useState<string>();
  const [lang, setLang] = useState('text');

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = headers.map((header, i) =>
      i === index ? { key, value } : header,
    );
    setError('headers', { message: '' });
    setHeaders(newHeaders);
  };

  useEffect(() => {
    setValue('headers', headers);
    console.log(headers);
  }, [headers, setValue]);

  const onSumbit: SubmitHandler<IRestFullFormData> = async data => {
    const { url, method, body } = data;

    try {
      const parsedBody =
        lang === 'json' && body ? (JSON.parse(body) as object) : body;

      const options: RequestInit = {
        method,
        headers: headers.reduce(
          (acc, { key, value }) => {
            if (key) acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        ),
        body:
          method !== 'GET' && parsedBody
            ? JSON.stringify(parsedBody)
            : undefined,
      };

      try {
        const response = await fetch(url, options);
        const text = await response.text();

        setStatus(String(response.status));
        setTextResponse(text);
        console.log(text);
      } catch (err) {
        if (err instanceof Error) {
          setError('root', { message: err.message });
          console.log(errors.root?.message);
        }
      }
      reset();
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('body', { message: err.message });
      }
    }
  };

  return (
    <Box sx={{ p: 3 }} className={styles['restfull-client']}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card component='form' onSubmit={handleSubmit(onSumbit)}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                REST Client
              </Typography>

              <Grid
                container
                className={styles['restfull-client__url-container']}
              >
                <Grid item xs={2}>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel id='method-label'>Method</InputLabel>
                    <Select
                      labelId='method-label'
                      label='Method'
                      fullWidth
                      variant='outlined'
                      defaultValue=''
                      {...register('method')}
                    >
                      {[
                        'GET',
                        'PUT',
                        'POST',
                        'DELETE',
                        'PATCH',
                        'HEAD',
                        'OPTIONS',
                        'TRACE',
                      ].map(option => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                    <span className={styles.error}>
                      {errors.method?.message}
                    </span>
                  </FormControl>
                </Grid>
                <Grid className={styles['restfull-client__url']} item xs>
                  <TextField
                    label='Endpoint URL'
                    fullWidth
                    variant='outlined'
                    {...register('url')}
                  />
                  <span className={styles.error}>{errors.url?.message}</span>
                </Grid>
                <Grid item>
                  <Button
                    className={styles['restfull-client__button']}
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Send Request
                  </Button>
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant='subtitle1'>Headers:</Typography>
                <Button variant='contained' color='primary' onClick={addHeader}>
                  Add Header
                </Button>
                <span className={styles.error}>{errors.headers?.message}</span>
              </Box>
              {headers.map((header, i) => (
                <Box mt={2} key={i}>
                  <IoMdClose
                    onClick={() =>
                      setHeaders(headers =>
                        headers.filter((_, index) => i !== index),
                      )
                    }
                  />
                  <TextField
                    label='Header Key'
                    fullWidth
                    variant='outlined'
                    value={header.key}
                    onChange={e =>
                      updateHeader(i, e.target.value, header.value)
                    }
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Header Value'
                    fullWidth
                    variant='outlined'
                    value={header.value}
                    onChange={e => updateHeader(i, header.key, e.target.value)}
                  />
                </Box>
              ))}

              <Box mt={3}>
                <Typography variant='subtitle1'>Body:</Typography>
                <CodePreview
                  body={getValues('body')}
                  onChange={value => {
                    setError('body', { message: '' });
                    setValue('body', value);
                  }}
                  onLang={setLang}
                  lang={lang}
                />
                <span className={styles.error}>{errors.body?.message}</span>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Response
              </Typography>

              <TextField
                label='Status'
                fullWidth
                variant='outlined'
                sx={{ mb: 3 }}
                InputProps={{
                  readOnly: true,
                }}
                defaultValue={status}
              />
              <CodePreview body={textResponse} readonly />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Restfull;
