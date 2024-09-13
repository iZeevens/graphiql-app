import { Box, Button, TextField, Typography } from '@mui/material';

import {
  ArrayPath,
  Controller,
  FieldArray,
  FieldValues,
  Path,
  useFieldArray,
} from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

import { IHeadersFormData } from '@/types/restFulgraphQlType';

import styles from '@/components/RESTfull/RESTfull.module.scss';

const HeadersSection = <T extends FieldValues>({
  control,
  urlChanged,
  errors,
}: IHeadersFormData<T>) => {
  const { fields, append, remove } = useFieldArray<T>({
    control,
    name: 'headers' as ArrayPath<T>,
  });

  return (
    <>
      <Box mt={3}>
        <Typography variant='subtitle1'>Headers:</Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() =>
            append({ key: '', value: '' } as
              | FieldArray<T, ArrayPath<T>>
              | FieldArray<T, ArrayPath<T>>[])
          }
        >
          Add Header
        </Button>
        <span className={styles.error}>
          {errors.headers?.message ? String(errors.headers?.message) : ''}
        </span>
      </Box>

      {fields.map((header, index) => (
        <Box
          mt={2}
          key={header.id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <IoMdClose onClick={() => remove(index)} />
          <Controller
            name={`headers.${index}.key` as Path<T>}
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
                  if (urlChanged) {
                    urlChanged();
                  }
                }}
              />
            )}
          />
          <Controller
            name={`headers.${index}.value` as Path<T>}
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
                  if (urlChanged) {
                    urlChanged();
                  }
                }}
              />
            )}
          />
        </Box>
      ))}
    </>
  );
};

export default HeadersSection;