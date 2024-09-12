'use client';

import { NoRequestsFound } from '@/components/History/components/NoRequestsFound/NoRequestsFound';
import { requestHistory } from '@/utils/requestHistory';

export const History = () => {
  const data = requestHistory.getStory();

  return <>{data ? <NoRequestsFound /> : <></>}</>;
};
