import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { useMeta } from './hooks';

export default function DTPaginator() {
  const [{ page, perPage, total }, { setPage }] = useMeta('pagin');

  const maxPage = useMemo(() => Math.ceil(total / perPage), [perPage, total]);

  const handleChange = (e, value) => {
    setPage(value);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      py={3}
      px={3}
    >
      {total > 0 && (
        <Typography variant="inherit">
          Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} results
        </Typography>
      )}

      <div>&nbsp;</div>
      <Pagination
        page={page}
        count={maxPage}
        onChange={handleChange}
      />
    </Box>
  );
}
