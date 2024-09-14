import { IntrospectionQuery } from 'graphql';

type Error = { name: string; msg: string; id: number }[];

interface DocExplorerQlProps {
  schema: IntrospectionQuery | null;
}
export type { DocExplorerQlProps, Error };
