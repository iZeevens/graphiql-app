import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import { HistoryItem } from '@/components/History/components/HistoryItem/HistoryItem';
import { RequestHistory } from '@/store/types';
import { useTranslations } from 'next-intl';

interface HistoryListProps {
  data: RequestHistory;
}

export const HistoryList = ({ data }: HistoryListProps) => {
  const t = useTranslations('history');

  return (
    <Container>
      <Typography variant='h1' textAlign={'center'}>
        {t('title')}
      </Typography>
      <List>
        {data
          .slice()
          .reverse()
          .map((item, index) => (
            <HistoryItem key={index} item={item} />
          ))}
      </List>
    </Container>
  );
};
