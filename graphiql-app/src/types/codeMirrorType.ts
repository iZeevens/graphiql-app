import { Control } from 'react-hook-form';

import { IRestFullFormData } from '@/types/formsType';

interface ICodePreviewProps {
  body?: string;
  control?: Control<IRestFullFormData>;
  lang?: string;
  onLang?: (value: string) => void;
  readonly?: boolean;
}

export type { ICodePreviewProps };
