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
import { ChangeEvent } from 'react';

import { DocExplorer, GraphiQLProvider, QueryEditor } from '@graphiql/react';
import '@graphiql/react/dist/style.css';
import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';
import { usePathname } from 'next/navigation';

import CodePreview from '../CodeMirror/CodeMirror';
import { HeaderSection, VariableSection } from './components/headersVariables';

import styles from '@/components/GraphQl/GraphQl.module.scss';

const GraphQl = () => {
  const pathname = usePathname();
  const url = useRef<string>('');
  const [sdlUrl, setSdlUrl] = useState('');
  const headers = useRef<string>('');
  const variables = useRef<string>('');
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

    if (encodedUrl) newUrl += `/${encodedUrl}`;
    if (encodedBody) newUrl += `/${encodedBody}`;
    if (parsedHeaders) newUrl += `/${parsedHeaders}`;

    window.history.pushState({}, '', newUrl);
  }, [pathname]);

  const submitSchema = useCallback(async () => {
    if (!sdlUrl) return;

    try {
      console.log(sdlUrl);
      const introspectionQuery = getIntrospectionQuery();
      const response = await fetch(sdlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: introspectionQuery }),
      });
      const data = (await response.json()) as { data: IntrospectionQuery };
      setSchema(data.data);
    } catch (err) {
      console.error(err);
    }
  }, [sdlUrl]);

  const handleSdlUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setSdlUrl(e.target.value);
  };

  const fetcher = useCallback(async () => {
    const response = await fetch(url.current, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(headers.current ? (JSON.parse(headers.current) as object) : {}),
      },
      body: JSON.stringify({
        query: query.current,
        variables: variables.current,
      }),
    });

    const result = (await response.json()) as object;
    setStatus(String(response.status));
    setResult(JSON.stringify(result, null, 2));
    submitSchema().catch(err => console.error(err));

    return result;
  }, [url, submitSchema]);

  return (
    <Box sx={{ p: 3 }} className={styles['graphiql-client']}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            component='form'
            onSubmit={e => {
              e.preventDefault();
              fetcher().catch(err => console.error(err));
            }}
          >
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
                    onChange={e => {
                      setSdlUrl(`${e.target.value}?sdl`);
                      url.current = e.target.value;
                    }}
                    onBlur={urlChanged}
                  />
                  <TextField
                    label='SDL URL'
                    fullWidth
                    variant='outlined'
                    value={sdlUrl ?? ''}
                    onChange={handleSdlUrl}
                  />
                </Grid>

                <Grid item className={styles['graphiql-query-contriner']}>
                  <div
                    className={`${styles['graphiql-container']} graphiql-container`}
                  >
                    <GraphiQLProvider
                      fetcher={() => {
                        return { data: null };
                      }}
                      schema={schema}
                    >
                      <div className={styles['graphiql-result']}>
                        <DocExplorer />
                      </div>
                    </GraphiQLProvider>

                    <GraphiQLProvider
                      fetcher={() => {
                        return { data: null };
                      }}
                    >
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
                        <VariableSection
                          onChange={value => (variables.current = value)}
                          onEdit={urlChanged}
                        />
                        <HeaderSection
                          onChange={value => (headers.current = value)}
                          onEdit={urlChanged}
                        />
                      </Box>
                    </GraphiQLProvider>
                  </div>
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit'>
                    Send Request
                  </Button>
                </Grid>
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
