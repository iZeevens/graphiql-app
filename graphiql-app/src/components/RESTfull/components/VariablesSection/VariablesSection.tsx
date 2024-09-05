import { Box, Button, TextField } from '@mui/material';

import { useState } from 'react';
import { useFieldArray } from 'react-hook-form';
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
          {fields.map((varibale, index) => (
            <Box key={varibale.id}>
              <IoMdClose onClick={() => remove(index)} />
              <TextField {...varibale} label='name' sx={{ mr: '10px' }} />
              <TextField {...varibale} label='value' />
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
