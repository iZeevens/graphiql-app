import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

import { useCurrentLanguage } from '@/hooks/useCurrentLanguage';
import { theme } from '@/theme';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from '@/components/header/components/LanguageToggler/LanguageToggler.module.scss';

const LanguageToggler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (locale: string) => {
    const newPath = pathname.replace(/^\/(ru|en)/, `/${locale}`);
    router.push(`${newPath}${searchParams.toString()}`);
  };

  return (
    <FormControl>
      <FormLabel id='language' sx={{ display: 'none' }}>
        Language
      </FormLabel>
      <RadioGroup
        aria-labelledby='language'
        row
        value={useCurrentLanguage()}
        onChange={e => handleChange(e.target.value)}
        className={styles.language}
      >
        <FormControlLabel
          value='en'
          control={<Radio className={styles.radio} sx={{ display: 'none' }} />}
          label={
            <Typography
              sx={{
                color:
                  useCurrentLanguage() === 'en'
                    ? theme.palette.secondary.main
                    : '',
              }}
            >
              En
            </Typography>
          }
        />
        <Typography>|</Typography>
        <FormControlLabel
          value='ru'
          control={<Radio className={styles.radio} sx={{ display: 'none' }} />}
          label={
            <Typography
              sx={{
                color:
                  useCurrentLanguage() === 'ru'
                    ? theme.palette.secondary.main
                    : '',
              }}
            >
              Ru
            </Typography>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default LanguageToggler;
