import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { itemHistory } from '@/store/itemHistory';
import { RestData } from '@/store/types';
import { restPathConnector } from '@/utils/restHelpers';

import styles from '@/components/History/components/HistoryItem/HistoryItem.module.scss';

interface HistoryItemProps {
  item: RestData;
}

export const HistoryItem = ({ item }: HistoryItemProps) => {
  const getHrefLink = () => {
    const { type, url, method, body, headers, variables } = item;
    const startString = `/${type}`;

    return restPathConnector({
      startString,
      url,
      method,
      body: body?.value,
      headers,
      variables,
    });
  };

  return (
    <ListItem
      className={styles.historyItem}
      id={item.date}
      onClick={() => itemHistory.setItem(item)}
    >
      <Link className={styles.historyItem__link} href={getHrefLink()}>
        <Card className={styles.historyItem__card}>
          <Typography className={styles.historyItem__method} variant='body1'>
            {item.method}
          </Typography>
          <Typography variant='body1'>{item.url}</Typography>
        </Card>
      </Link>
    </ListItem>
  );
};
