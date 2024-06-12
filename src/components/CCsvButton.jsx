import { useState } from 'react';
import { useFetch } from '@/contexts/hooks/auth';
import FasIcon from '@/components/FasIcon.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';

export default function CCsvButton({
  endpoint,
  filter = {},
  filename = 'export.csv',
  variant = 'outlined',
  color = 'primary',
  size = 'small',
  icon = 'fa-download',
  text = 'Export CSV',
  ...props
}) {
  const doFetch = useFetch();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const blob = await doFetch(endpoint, {
        params: filter,
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert('Unable to generate CSV file!');
    }
    setLoading(false);
  };

  return (
    <CLoadingButton
      {...props}
      variant={variant}
      color={color}
      size={size}
      startIcon={<FasIcon name={icon} />}
      loading={loading}
      onClick={handleClick}
    >
      {text}
    </CLoadingButton>
  );
}
