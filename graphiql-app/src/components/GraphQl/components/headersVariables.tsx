import { Button } from '@mui/material';

import { useState } from 'react';

import { HeaderEditor, VariableEditor } from '@graphiql/react';

const VariableSection = ({
  onChange,
}: {
  onChange?: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Close Variable' : 'Open Variable'}
      </Button>
      {isOpen && <VariableEditor onEdit={onChange} />}
    </div>
  );
};

const HeaderSection = ({
  onChange,
}: {
  onChange?: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Close Header' : 'Open Header'}
      </Button>
      {isOpen && <HeaderEditor onEdit={onChange} />}
    </div>
  );
};

export { VariableSection, HeaderSection };
