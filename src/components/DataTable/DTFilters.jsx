import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FasIcon from '@/components/FasIcon.jsx';
import CLoadingButton from '@/components/CLoadingButton.jsx';
import { getFormData } from '@/helpers/utils';
import { useMeta, useTableState } from './hooks';

export default function DTFilters({ children }) {
  const { loading } = useTableState();
  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useMeta('filters');

  // const $form = useRef(null);
  const [isShow, setIsShow] = useState(false);

  const handleToggle = () => {
    setIsShow((state) => !state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = getFormData(e.target);
    setFilters(input);
  };

  return (
    <Box borderBottom="1px solid rgba(224, 224, 224, 1)">
      <Box p={2}>
        <Button
          variant="text"
          color="text"
          size="small"
          startIcon={<FasIcon name="fa-search" fontSize="1em" />}
          sx={{
            fontSize: '.875em',
            fontWeight: 400,
            '& .fas': {
              fontSize: '1em',
            },
          }}
          onClick={handleToggle}
        >
          Show filters
        </Button>
      </Box>

      {isShow && (
        <Box
          component="form"
          bgcolor="#f2f3fd"
          borderTop="1px solid rgba(224, 224, 224, 1)"
          px={3}
          py={3}
          onSubmit={handleSubmit}
        >
          <Box>
            {children}
          </Box>
          <Box mt={2} textAlign="right">
            <CLoadingButton
              type="submit"
              variant="contained"
              color="success"
              size="small"
              loading={loading}
              sx={{ px: 1.75, py: 0.75 }}
            >
              Apply filter
            </CLoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  );
}
