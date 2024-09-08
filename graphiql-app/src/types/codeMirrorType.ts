import { Control } from 'react-hook-form';

import { IRestFullFormData } from './restFulgraphQlType';

interface ICodePreviewProps {
  body?: string;
  control?: Control<IRestFullFormData>;
  lang?: string;
  onLang?: (value: string) => void;
  readonly?: boolean;
  urlChanged?: () => void;
}

export type { ICodePreviewProps };
