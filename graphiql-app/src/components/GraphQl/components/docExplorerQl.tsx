import { memo } from 'react';

import { DocExplorerQlProps } from '@/types/graphQlType';
import { DocExplorer, GraphiQLProvider } from '@graphiql/react';

import styles from '@/components/GraphQl/GraphQl.module.scss';

const DocExplorerQl = memo(({ schema }: DocExplorerQlProps) => {
  return (
    <GraphiQLProvider
      fetcher={() => {
        return { data: null };
      }}
      schema={schema}
    >
      <div className={styles['graphiql-result']}>
        <DocExplorer />
      </div>
    </GraphiQLProvider>
  );
});

DocExplorerQl.displayName = 'DocExplorerQl';

export default DocExplorerQl;
