import { Box, Button, TextField } from '@mui/material';

import { useState } from 'react';
import {
  ArrayPath,
  Controller,
  FieldArray,
  FieldValues,
  Path,
  useFieldArray,
} from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

import { IVariablesFormData } from '@/types/restFullType';

const VariablesSection = <T extends FieldValues>({
  control,
}: IVariablesFormData<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables' as ArrayPath<T>,
  });

  const [hide, setHide] = useState(true);

  return (
    <>
      <Button
        variant='contained'
        color='primary'
        sx={{ mt: '10px' }}
        onClick={() => setHide(prev => !prev)}
      >
        {hide ? 'Show' : 'Hide'}
      </Button>
      {!hide && (
        <>
          {fields.map((variable, index) => (
            <Box
              key={variable.id}
              mt={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}
            >
              <IoMdClose onClick={() => remove(index)} />

              <Controller
                name={`variables.${index}.name` as Path<T>}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label='Name' sx={{ mb: 2 }} />
                )}
              />
              <Controller
                name={`variables.${index}.value` as Path<T>}
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth label='Value' />
                )}
              />
            </Box>
          ))}
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: '10px' }}
            onClick={() =>
              append({ name: '', value: '' } as
                | FieldArray<T, ArrayPath<T>>
                | FieldArray<T, ArrayPath<T>>[])
            }
          >
            Add variables
          </Button>
        </>
      )}
    </>
  );
};

export default VariablesSection;
