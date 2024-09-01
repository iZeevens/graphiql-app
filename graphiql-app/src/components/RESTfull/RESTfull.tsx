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
  const [lang, setLang] = useState('text');

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = headers.map((header, i) =>
      i === index ? { key, value } : header,
    );
    setHeaders(newHeaders);
  };

  useEffect(() => {
    setValue('headers', headers);
    console.log(headers);
  }, [headers, setValue]);

  const onSumbit: SubmitHandler<IRestFullFormData> = data => {
    const { url, method, body } = data;
    setError('body', { message: '' });

    try {
      const parsedBody =
        lang === 'json' && body ? (JSON.parse(body) as object) : body;
      console.log(url, method, parsedBody);
      reset();
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('body', { message: err.message });
        console.log(err.message);
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
              </Box>
              {headers.map((header, i) => (
                <Box mt={2} key={i}>
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
                  onChange={value => setValue('body', value)}
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
              />
              <CodePreview body={''} readonly={true} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Restfull;
