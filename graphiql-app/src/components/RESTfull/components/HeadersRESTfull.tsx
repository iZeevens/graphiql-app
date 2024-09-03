import { Box, Button, TextField, Typography } from '@mui/material';

import { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';

import { IHeadersRestfull } from '@/types/restFullType';

import styles from '@/components/RESTfull/RESTfull.module.scss';

const HeadersRestfull = ({
  headers,
  errors,
  setHeaders,
  setValue,
  setError,
}: IHeadersRestfull) => {
  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const updateHeader = (index: number, key: string, value: string) => {
    const newHeaders = headers.map((header, i) =>
      i === index ? { key, value } : header,
    );
    setError('headers', { message: '' });
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(prevHeaders => prevHeaders.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setValue('headers', headers);
    console.log(headers);
  }, [headers, setValue]);

  return (
    <>
      <Box mt={3}>
        <Typography variant='subtitle1'>Headers:</Typography>
        <Button variant='contained' color='primary' onClick={addHeader}>
          Add Header
        </Button>
        <span className={styles.error}>{errors.headers?.message}</span>
      </Box>
      {headers.map((header, i) => (
        <Box mt={2} key={i}>
          <IoMdClose onClick={() => removeHeader} />
          <TextField
            label='Header Key'
            fullWidth
            variant='outlined'
            value={header.key}
            onChange={e => updateHeader(i, e.target.value, header.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Header Value'
            fullWidth
            variant='outlined'
            value={header.value}
            onChange={e => updateHeader(i, header.key, e.target.value)}
          />
        </Box>
      ))}
    </>
  );
};

export default HeadersRestfull;
