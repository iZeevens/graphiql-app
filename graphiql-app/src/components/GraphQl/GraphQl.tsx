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

import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IGraphiQlFormData } from '@/types/graphQlType';
import { DocExplorer, GraphiQLProvider, QueryEditor } from '@graphiql/react';
import '@graphiql/react/dist/style.css';
import { FetcherOpts, FetcherParams } from '@graphiql/toolkit';
import { IntrospectionQuery } from 'graphql';
import { usePathname } from 'next/navigation';

import CodePreview from '../CodeMirror/CodeMirror';
import { HeaderSection, VariableSection } from './components/headersVariables';
import SdlUrl from './components/sdlUrl';

import styles from '@/components/GraphQl/GraphQl.module.scss';

const GraphQl = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IGraphiQlFormData>({
    mode: 'onChange',
  });
  const pathname = usePathname();
  const url = useRef<string>('');
  const headers = useRef<string>('');
  const query = useRef<string>('');

  const [result, setResult] = useState<string>();
  const [status, setStatus] = useState<string>();
  const [schema, setSchema] = useState<IntrospectionQuery | null>(null);

  const urlChanged = useCallback(() => {
    let newUrl = `${pathname.split('/').slice(0, 3).join('/')}`;
    let encodedUrl = '';
    let encodedBody = '';
    let parsedHeaders = '';

    if (headers.current) {
      try {
        const headerObj = JSON.parse(headers.current) as string[][];
        parsedHeaders = new URLSearchParams(headerObj).toString();
      } catch {
        console.error('Invalid JSON format in headers');
      }
    }

    try {
      encodedUrl = url ? btoa(url.current) : '';
      encodedBody = query.current ? btoa(query.current) : '';
    } catch {
      console.error('Error format');
    }

    console.log(encodedBody);
    console.log(encodedUrl);

    if (encodedUrl) {
      newUrl += `/${encodedUrl}`;
    }
    if (encodedBody) {
      newUrl += `/${encodedBody}`;
    }
    if (parsedHeaders) {
      newUrl += `/${parsedHeaders}`;
    }

    window.history.pushState({}, '', newUrl);
  }, [pathname, headers]);

  const fetcher = useCallback(
    async (graphQLParams: FetcherParams, opts?: FetcherOpts) => {
      const response = await fetch(url.current, {
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
    [],
  );

  const onSubmit = (data: IGraphiQlFormData) => {
    return data;
  };

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
                    onChange={e => (url.current = e.target.value)}
                    onBlur={urlChanged}
                  />
                </Grid>
                <SdlUrl url={url.current} setSchema={setSchema} />

                <Grid item className={styles['graphiql-query-contriner']}>
                  <GraphiQLProvider fetcher={fetcher} schema={schema}>
                    <div
                      className={`${styles['graphiql-container']} graphiql-container`}
                    >
                      <div className={styles['graphiql-result']}>
                        <DocExplorer />
                      </div>
                      <span>Query Editor:</span>
                      <QueryEditor
                        onEdit={value => {
                          query.current = value;
                          urlChanged();
                        }}
                      />

                      <Box
                        className={styles['graphiql-variables-header-section']}
                      >
                        <VariableSection onEdit={urlChanged} />
                        <HeaderSection
                          onChange={value => (headers.current = value)}
                          onEdit={urlChanged}
                        />
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
