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
import {
  DocExplorer,
  GraphiQLProvider,
  QueryEditor,
  VariableEditor,
} from '@graphiql/react';
import '@graphiql/react/dist/style.css';
import { FetcherParams } from '@graphiql/toolkit';

import CodePreview from '../CodeMirror/CodeMirror';
// import { createGraphiQLFetcher } from '@graphiql/toolkit';
import HeadersRestfull from '../Headers/Headers';

import styles from '@/components/GraphQl/GraphQl.module.scss';

const GraphQl = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IGraphiQlFormData>({
    mode: 'onChange',
  });
  const [result, setResult] = useState<string | null>(null);

  const fetcher = async (graphQLParams: FetcherParams) => {
    const response = await fetch(
      'https://swapi-graphql.netlify.app/.netlify/functions/index',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphQLParams),
      },
    );

    const result = (await response.json()) as object;
    setResult(JSON.stringify(result, null, 2));
    console.log(result);
    return result;
  };

  const onSubmit: SubmitHandler<IGraphiQlFormData> = data => {
    console.log(data);
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
                  <GraphiQLProvider fetcher={fetcher}>
                    <div
                      className={`${styles['graphiql-container']} graphiql-container`}
                    >
                      <div className={styles['graphiql-result']}>
                        <DocExplorer />
                      </div>
                      <span>Query Editor:</span>
                      <QueryEditor />
                      <span>Variable Editor:</span>
                      <VariableEditor />
                    </div>
                  </GraphiQLProvider>
                </Grid>
                <HeadersRestfull control={control} errors={errors} />

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
                // value={status ?? ''}
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
