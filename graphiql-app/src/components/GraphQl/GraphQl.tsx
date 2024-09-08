'use client';

import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';

// import styles from '@/components/GraphQl/GraphQl.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IGraphiQlFormData } from '@/types/graphQlType';

import HeadersRestfull from '../Headers/Headers';

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

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card component='form' onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h6' gutterBottom>
              GraphQl Client
            </Typography>

            <Grid container>
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
              {/* Headers RESTFULL & CodeMirror & variables  will be here */}

              <Grid item>
                <Button variant='contained' color='primary' type='submit'>
                  Send Request
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GraphQl;
