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

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { requestHistory } from '@/store/requestHistory';
import { IRestFullFormData, IVariables } from '@/types/restFullType';
import { schemaRestFull } from '@/utils/validationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname } from 'next/navigation';

import CodePreview from '../CodeMirror/CodeMirror';
import HeadersRestfull from '../Headers/Headers';

import styles from '@/components/RESTfull/RESTfull.module.scss';

const Restfull = () => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setError,
    reset,
    formState: { errors },
  } = useForm<IRestFullFormData>({
    resolver: yupResolver(schemaRestFull),
    mode: 'onChange',
  });
  const [status, setStatus] = useState<string>();
  const [response, setResponse] = useState<string>();
  const [lang, setLang] = useState('text');
  const pathname = usePathname();

  const interpolateVariables = (body: string, variables: IVariables[]) => {
    let interpolatedBody = body;
    variables.forEach(({ name, value }) => {
      const regex = new RegExp(`{{${name}}}`, 'g');
      interpolatedBody = interpolatedBody.replace(regex, value);
    });
    return interpolatedBody;
  };

  const urlChanged = () => {
    setError('body', { message: '' });

    const { url, body, method, headers } = getValues();

    let newUrl = `${pathname.split('/').slice(0, 3).join('/')}`;
    const encodedUrl = btoa(url);
    const encodedBody = body ? btoa(JSON.stringify(body)) : '';

    const queryParams = headers
      ?.filter(header => header.key && header.value)
      .map(
        header =>
          `${encodeURIComponent(header.key)}=${encodeURIComponent(header.value)}`,
      )
      .join('&');

    if (method) newUrl += `/${method}`;
    if (encodedUrl) newUrl += `/${encodedUrl}`;
    if (encodedBody) newUrl += `/${encodedBody}`;
    if (queryParams) newUrl += `?${queryParams}`;

    window.history.pushState({}, '', newUrl);
  };

  const onSumbit: SubmitHandler<IRestFullFormData> = async data => {
    const { url, method, body, headers, variables } = data;

    try {
      const finalBody =
        variables && body ? interpolateVariables(body, variables) : '';
      const parsedBody =
        lang === 'json' && body ? (JSON.parse(finalBody) as object) : body;

      const options: RequestInit = {
        method,
        headers: headers?.reduce(
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
        const dataJson = (await response.json()) as object;

        setStatus(String(response.status));
        setResponse(JSON.stringify(dataJson, null, 2));

        requestHistory.setStory({
          type: 'rest',
          url,
          method,
          ...(body && { body: { type: lang, value: body } }),
          ...(headers && { headers }),
        });

        reset();
      } catch (err) {
        if (err instanceof Error) {
          setError('body', {
            message:
              'An error occurred while sending data, check the data, please try again',
          });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        setError('body', { message: 'An error occurred, please try again' });
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
                      {...register('method', { onBlur: urlChanged })}
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
                    <span className='error'>{errors.method?.message}</span>
                  </FormControl>
                </Grid>
                <Grid className={styles['restfull-client__url']} item xs>
                  <TextField
                    label='Endpoint URL'
                    fullWidth
                    variant='outlined'
                    {...register('url', { onBlur: urlChanged })}
                  />
                  <span className='error'>{errors.url?.message}</span>
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

              <HeadersRestfull
                urlChanged={urlChanged}
                control={control}
                errors={errors}
              />

              <Box mt={3}>
                <Typography variant='subtitle1'>Body:</Typography>
                <CodePreview
                  body={getValues('body')}
                  control={control}
                  onLang={setLang}
                  lang={lang}
                  urlChanged={urlChanged}
                />
                <span className='error'>{errors.body?.message}</span>
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
                value={status ?? ''}
              />
              <CodePreview body={response} readonly />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Restfull;
