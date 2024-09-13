import { Button } from '@mui/material';

import { useState } from 'react';

import { HeaderEditor, VariableEditor } from '@graphiql/react';

const VariableSection = ({
  onChange,
  onEdit,
}: {
  onChange?: (value: string) => void;
  onEdit: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Close Variable' : 'Open Variable'}
      </Button>
      {isOpen && (
        <VariableEditor
          onEdit={val => {
            if (onChange) {
              onChange(val);
              onEdit();
            }
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
  onChange?: (value: string) => void;
  onEdit: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Close Header' : 'Open Header'}
      </Button>
      {isOpen && (
        <HeaderEditor
          onEdit={val => {
            if (onChange) {
              onChange(val);
              onEdit();
            }
          }}
        />
      )}
    </div>
  );
};

export { VariableSection, HeaderSection };
