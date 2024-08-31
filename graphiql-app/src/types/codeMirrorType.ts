interface ICodePreviewProps {
  body?: string;
  onChange?: (value: string) => void;
  lang?: string;
  onLang?: (value: string) => void;
  readonly?: boolean;
}

export type { ICodePreviewProps };
