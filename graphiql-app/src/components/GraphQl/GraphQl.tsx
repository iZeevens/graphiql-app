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

import { SubmitHandler, useForm } from 'react-hook-form';

import { IGraphiQlFormData } from '@/types/graphQlType';
import { DocExplorer, GraphiQLProvider, QueryEditor } from '@graphiql/react';
import '@graphiql/react/dist/style.css';
import { createGraphiQLFetcher } from '@graphiql/toolkit';

import HeadersRestfull from '../Headers/Headers';
import VariablesSection from '../Variables/Variables';

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

  const onSubmit: SubmitHandler<IGraphiQlFormData> = data => {
    console.log(data);
  };

  const fetcher = createGraphiQLFetcher({
    url: 'https://my.graphql.api/graphql',
  });

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

                <HeadersRestfull control={control} errors={errors} />
                <VariablesSection control={control} />

                <Grid item>
                  <GraphiQLProvider fetcher={fetcher}>
                    <DocExplorer />
                    <QueryEditor />
                  </GraphiQLProvider>
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
                // value={status ?? ''}
              />
              {/* <CodePreview body={response} readonly /> */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphQl;
