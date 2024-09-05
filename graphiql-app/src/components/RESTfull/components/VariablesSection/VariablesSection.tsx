import { Box, Button, TextField } from '@mui/material';

import { useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

import { IVariablesFormData } from '@/types/restFullType';

const VariablesSection = ({ control }: IVariablesFormData) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variables',
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
            <Box key={variable.id}>
              <IoMdClose onClick={() => remove(index)} />
              <Controller
                name={`variables.${index}.name`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label='name' sx={{ mr: '10px' }} />
                )}
              />
              <Controller
                name={`variables.${index}.value`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label='value' sx={{ mr: '10px' }} />
                )}
              />
            </Box>
          ))}
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: '10px' }}
            onClick={() => append({ name: '', value: '' })}
          >
            Add variables
          </Button>
        </>
      )}
    </>
  );
};

export default VariablesSection;
