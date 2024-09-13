import { Button, Grid, TextField } from '@mui/material';

import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';

const SdlUrl = ({
  url,
  setSchema,
}: {
  url: string;
  setSchema: Dispatch<SetStateAction<IntrospectionQuery | null>>;
}) => {
  const sdlUrl = useRef(`${url}?sdl`);
  const [error, setError] = useState('');

  const handleSdlUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    sdlUrl.current = e.target.value;
  };

  const submitSchema = async () => {
    try {
      console.log(sdlUrl.current);
      const introspectionQuery = getIntrospectionQuery();
      const response = await fetch('https://graphql-pokemon2.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: introspectionQuery }),
      });
      const data = (await response.json()) as { data: IntrospectionQuery };
      setSchema(data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <Grid item>
      <TextField
        label='SDL URL'
        fullWidth
        variant='outlined'
        onChange={handleSdlUrl}
      />
      <Button onClick={submitSchema}>Get Schema</Button>
      {error ? <span className='error'>{error}</span> : ''}
    </Grid>
  );
};

export default SdlUrl;
