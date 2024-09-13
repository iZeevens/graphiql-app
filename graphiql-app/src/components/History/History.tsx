'use client';

import { HistoryList } from '@/components/History/components/HistoryList/HistoryList';
import { NoRequestsFound } from '@/components/History/components/NoRequestsFound/NoRequestsFound';
import { requestHistory } from '@/store/requestHistory';

export const History = () => {
  const data = requestHistory.getStory();

  return <>{data.length ? <HistoryList data={data} /> : <NoRequestsFound />}</>;
};
