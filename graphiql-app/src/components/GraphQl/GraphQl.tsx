'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IGraphiQlFormData } from '@/types/graphQlType';
import { DocExplorer, GraphiQLProvider, QueryEditor } from '@graphiql/react';
import '@graphiql/react/dist/style.css';
import { FetcherOpts, FetcherParams } from '@graphiql/toolkit';
import { usePathname } from 'next/navigation';

import CodePreview from '../CodeMirror/CodeMirror';
import { HeaderSection, VariableSection } from './components/headersVariables';

import styles from '@/components/GraphQl/GraphQl.module.scss';

const GraphQl = () => {
  const {
    register,
    // setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IGraphiQlFormData>({
    mode: 'onChange',
  });
  const pathname = usePathname();
  const [url, setUrl] = useState<string>('');
  const [headers, setHeaders] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const [result, setResult] = useState<string>();
  const [status, setStatus] = useState<string>();

  const urlChanged = useCallback(() => {
    const newUrl = `${pathname.split('/').slice(0, 3).join('/')}`;
    const { url } = getValues();
    const encodedUrl = btoa(url);
    const encodedBody = btoa(query);

    console.log(newUrl, encodedUrl, encodedBody);
    console.log('headers:', headers);
  }, [getValues, pathname, query, headers]);

  const fetcher = useCallback(
    async (graphQLParams: FetcherParams, opts?: FetcherOpts) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(opts ? opts.headers : ''),
        },
        body: JSON.stringify(graphQLParams),
      });

      const result = (await response.json()) as object;
      setStatus(String(response.status));
      setResult(JSON.stringify(result, null, 2));
      console.log(result);
      return result;
    },
    [url],
  );

  const onSubmit = (data: IGraphiQlFormData) => {
    setUrl(data.url);
  };

  useEffect(() => {
    urlChanged();
  }, [urlChanged]);

  return (
    <Box sx={{ p: 3 }} className={styles['graphiql-client']}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card component='form' onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                GraphQl Client
              </Typography>

              <Grid
                container
                className={styles['graphiql-client__url-container']}
              >
                <Grid item>
                  <TextField
                    label='Endpoint URL'
                    fullWidth
                    variant='outlined'
                    {...register('url')}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label='SDL URL'
                    fullWidth
                    variant='outlined'
                    {...register('sdlUrl')}
                  />
                </Grid>

                <Grid item className={styles['graphiql-query-contriner']}>
                  <GraphiQLProvider fetcher={fetcher}>
                    <div
                      className={`${styles['graphiql-container']} graphiql-container`}
                    >
                      <div className={styles['graphiql-result']}>
                        <DocExplorer />
                      </div>
                      <span>Query Editor:</span>
                      <QueryEditor onEdit={val => setQuery(val)} />

                      <Box
                        className={styles['graphiql-variables-header-section']}
                      >
                        <VariableSection />
                        <HeaderSection onChange={setHeaders} />
                      </Box>
                    </div>
                  </GraphiQLProvider>
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>
                    Send Request
                  </Button>
                </Grid>
                <span className='error'>{errors.root?.message}</span>
              </Grid>
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

              <div className={styles['graphiql-result']}>
                <CodePreview body={result ?? undefined} readonly />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphQl;
