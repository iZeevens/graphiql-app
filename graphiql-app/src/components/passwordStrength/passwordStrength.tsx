import { Box } from '@mui/material';

interface IProps {
  password: string;
}

enum PasswordStrengthConst {
  WEAK = 'WEAK',
  MEDIUM = 'MEDIUM',
  STRONG = 'STRONG',
}

function testingPasswordStrength(password: string): PasswordStrengthConst {
  let strength = 0;

  if (password?.length >= 8) strength += 1;
  if (/[A-Za-zА-Яа-я]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

  if (strength >= 4) return PasswordStrengthConst.STRONG;
  if (strength >= 2) return PasswordStrengthConst.MEDIUM;

  return PasswordStrengthConst.WEAK;
}

function generateColors(strength: PasswordStrengthConst): string[] {
  let result: string[] = [];
  const COLORS = {
    NETURAL: 'hsla(0, 0%, 88%, 1)',
    WEAK: 'hsla(353, 100%, 38%, 1)',
    MEDIUM: 'hsla(40, 71%, 51%, 1)',
    STRONG: 'hsla(134, 73%, 30%, 1)',
  };

  switch (strength) {
    case PasswordStrengthConst.WEAK:
      result = [COLORS.WEAK, COLORS.NETURAL, COLORS.NETURAL, COLORS.NETURAL];
      break;
    case PasswordStrengthConst.MEDIUM:
      result = [COLORS.MEDIUM, COLORS.MEDIUM, COLORS.NETURAL, COLORS.NETURAL];
      break;
    case PasswordStrengthConst.STRONG:
      result = [COLORS.STRONG, COLORS.STRONG, COLORS.STRONG, COLORS.STRONG];
      break;
  }

  return result;
}

const PasswordStrength = ({ password }: IProps) => {
  const passwordStrength = testingPasswordStrength(password);
  const colors = generateColors(passwordStrength);

  return (
    <Box display='flex' alignItems='center' justifyContent='center' gap='10px'>
      {colors.map((color, index) => (
        <Box
          key={index}
          bgcolor={color}
          borderRadius='5px'
          height='5px'
          width='100%'
        />
      ))}
    </Box>
  );
};

export default PasswordStrength;
