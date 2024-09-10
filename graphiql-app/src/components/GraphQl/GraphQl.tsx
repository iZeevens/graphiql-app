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

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IGraphiQlFormData } from '@/types/graphQlType';
import { IHeader } from '@/types/restFulgraphQlType';
import {
  DocExplorer,
  GraphiQLProvider,
  QueryEditor,
  VariableEditor,
} from '@graphiql/react';
import '@graphiql/react/dist/style.css';
import { FetcherParams } from '@graphiql/toolkit';

import CodePreview from '../CodeMirror/CodeMirror';
import HeadersRestfull from '../Headers/Headers';

import styles from '@/components/GraphQl/GraphQl.module.scss';

const GraphQl = () => {
  const {
    register,
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IGraphiQlFormData>({
    mode: 'onChange',
  });
  const [result, setResult] = useState<string>();
  const [status, setStatus] = useState<string>();

  const fetcher = async (
    graphQLParams: FetcherParams,
    url: string,
    headers?: IHeader[],
  ) => {
    console.log(JSON.stringify(graphQLParams));
    const response = await fetch(url, {
      method: 'POST',
      headers: headers?.reduce(
        (acc, { key, value }) => {
          if (key) acc[key] = value;
          return acc;
        },
        { 'Content-Type': 'application/json' } as Record<string, string>,
      ),
      body: JSON.stringify(graphQLParams),
    });

    const result = (await response.json()) as object;
    setStatus(String(response.status));
    setResult(JSON.stringify(result, null, 2));
    console.log(result);
    return result;
  };

  const onSubmit: SubmitHandler<IGraphiQlFormData> = data => {
    const { url, headers, query, variables } = data;

    fetcher(
      {
        query: query || '',
        variables: variables ? (JSON.parse(variables) as object) : '',
      },
      url,
      headers,
    ).catch(err => {
      if (err instanceof Error) {
        setError('root', {
          message:
            'An error occurred while sending data, check the data, please try again',
        });
      }
    });
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
                  <GraphiQLProvider fetcher={params => fetcher(params, '')}>
                    <div
                      className={`${styles['graphiql-container']} graphiql-container`}
                    >
                      <div className={styles['graphiql-result']}>
                        <DocExplorer />
                      </div>
                      <span>Query Editor:</span>
                      <QueryEditor onEdit={value => setValue('query', value)} />
                      <span>Variable Editor:</span>
                      <VariableEditor
                        onEdit={value => setValue('variables', value)}
                      />
                    </div>
                  </GraphiQLProvider>
                </Grid>
                <HeadersRestfull control={control} errors={errors} />
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
