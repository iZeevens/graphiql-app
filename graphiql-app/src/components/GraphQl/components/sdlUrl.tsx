import { Button, Grid, TextField } from '@mui/material';

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { IntrospectionQuery, getIntrospectionQuery } from 'graphql';

const SdlUrl = ({
  url,
  setSchema,
}: {
  url: string;
  setSchema: Dispatch<SetStateAction<IntrospectionQuery | null>>;
}) => {
  const [sdlUrl, setSdlUrl] = useState('');
  const [error, setError] = useState('');

  const handleSdlUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setSdlUrl(e.target.value);
  };

  useEffect(() => {
    if (url) {
      setSdlUrl(`${url}?sdl`);
    }
  }, [url]);

  const submitSchema = async () => {
    try {
      console.log(sdlUrl);
      const introspectionQuery = getIntrospectionQuery();
      const response = await fetch(sdlUrl, {
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
        value={sdlUrl ?? ''}
        onChange={handleSdlUrl}
      />
      <Button onClick={submitSchema}>Get Schema</Button>
      {error ? <span className='error'>{error}</span> : ''}
    </Grid>
  );
};

export default SdlUrl;
