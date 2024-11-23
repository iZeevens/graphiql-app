import { Button } from '@mui/material';

import { useState } from 'react';

import { HeaderEditor, VariableEditor } from '@graphiql/react';
import { useTranslations } from 'next-intl';

const VariableSection = ({
  onChange,
  onEdit,
}: {
  onChange: (value: string) => void;
  onEdit: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('qraphql');

  return (
    <div>
      <Button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? t('closeVariable') : t('openVariable')}
      </Button>
      {isOpen && (
        <VariableEditor
          onEdit={val => {
            onChange(val);
            onEdit();
          }}
        />
      )}
    </div>
  );
};

const HeaderSection = ({
  onChange,
  onEdit,
}: {
  onChange: (value: string) => void;
  onEdit: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('qraphql');

  return (
    <div>
      <Button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? t('closeHeader') : t('openHeader')}
      </Button>
      {isOpen && (
        <HeaderEditor
          onEdit={val => {
            onChange(val);
            onEdit();
          }}
        />
      )}
    </div>
  );
};

export { VariableSection, HeaderSection };
