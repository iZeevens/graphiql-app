import { IntrospectionQuery } from 'graphql';

type Error = { name: string; msg: string; id: string }[];

interface DocExplorerQlProps {
  schema: IntrospectionQuery | null;
}
export type { DocExplorerQlProps, Error };
