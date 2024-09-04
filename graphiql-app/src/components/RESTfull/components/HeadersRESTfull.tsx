import { Box, Button, TextField, Typography } from '@mui/material';

import { Controller, useFieldArray } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

import { IHeadersRestfull } from '@/types/restFullType';

import styles from '@/components/RESTfull/RESTfull.module.scss';

const HeadersRestfull = ({ control, urlChanged, errors }: IHeadersRestfull) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  return (
    <>
      <Box mt={3}>
        <Typography variant='subtitle1'>Headers:</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => append({ key: '', value: '' })}
        >
          Add Header
        </Button>
        <span className={styles.error}>{errors.headers?.message}</span>
      </Box>

      {fields.map((header, index) => (
        <Box mt={2} key={header.id}>
          <IoMdClose onClick={() => remove(index)} />
          <Controller
            name={`headers.${index}.key`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Header Key'
                fullWidth
                variant='outlined'
                sx={{ mb: 2 }}
                onBlur={() => {
                  field.onBlur();
                  urlChanged();
                }}
              />
            )}
          />
          <Controller
            name={`headers.${index}.value`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Header Value'
                fullWidth
                variant='outlined'
                sx={{ mb: 2 }}
                onBlur={() => {
                  field.onBlur();
                  urlChanged();
                }}
              />
            )}
          />
        </Box>
      ))}
    </>
  );
};

export default HeadersRestfull;
