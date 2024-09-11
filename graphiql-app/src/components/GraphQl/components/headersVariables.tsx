import { Button } from '@mui/material';

import { useState } from 'react';

import { HeaderEditor, VariableEditor } from '@graphiql/react';

const VariableSection = ({
  onChange,
  onBlur,
}: {
  onChange?: (value: string) => void;
  onBlur?: () => void;
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
            if (onChange && onBlur) {
              onChange(val);
              onBlur();
            }
          }}
        />
      )}
    </div>
  );
};

const HeaderSection = ({
  onChange,
  onBlur,
}: {
  onChange?: (value: string) => void;
  onBlur?: () => void;
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
            if (onChange && onBlur) {
              onChange(val);
              onBlur();
            }
          }}
        />
      )}
    </div>
  );
};

export { VariableSection, HeaderSection };
