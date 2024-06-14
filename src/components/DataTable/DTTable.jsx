import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import CLoader from '@/components/CLoader.jsx';
import FasIcon from '@/components/FasIcon.jsx';
import { getValue } from '@/helpers/utils';
import {
  useDataset, useColumns, useTableState, useMeta,
} from './hooks';

export default function DataTable({
  selectable,
  onSelect,
}) {
  const [columns] = useColumns();
  const [dataset] = useDataset();
  const { loading, error } = useTableState();
  const [sort, setSort] = useMeta('sort');

  const handleSort = (col) => {
    if (col.sortable) {
      if (col.key !== sort.key) {
        setSort(col.key);
      } else if (col.key === sort.key) {
        setSort(sort.order === 'ASC' ? `-${col.key}` : col.key);
      }
    }
  };

  const handleSelect = (data) => {
    if (selectable) {
      onSelect(data);
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                width={col.width || null}
                align={col.align || 'left'}
                onClick={() => handleSort(col)}
                sx={[
                  col.sortable && {
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                    '& .fas': {
                      fontSize: '0.875em',
                      opacity: '0.5',
                    },
                  },
                ]}
              >
                <span>{col.name}</span>
                {/* sort icon */}
                {sort.key === col.key && sort.order === 'ASC' && (
                  <FasIcon name="fa-caret-up" ml={1} />
                )}
                {sort.key === col.key && sort.order === 'DESC' && (
                  <FasIcon name="fa-caret-down" ml={1} />
                )}
                {sort.key !== col.key && col.sortable && (
                  <FasIcon name="fa-sort" ml={1} />
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* loading */}
          {loading && (
            <TableRow>
              <TableCell align="center" colSpan={columns.length}>
                <CLoader />
              </TableCell>
            </TableRow>
          )}

          {/* error */}
          {!loading && error && (
            <TableRow>
              <TableCell align="center" colSpan={columns.length}>
                <Box py={2}>
                  <Typography variant="inherit" mb={1}>
                    Something went wrong!
                  </Typography>
                  <Typography variant="caption" color="text.light">
                    #Err: {error.message}
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}

          {/* empty */}
          {!loading && !error && !dataset.length && (
            <TableRow>
              <TableCell align="center" colSpan={columns.length}>
                <Box py={2}>
                  <Typography variant="inherit" mb={1}>
                    No record found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}

          {/* listing */}
          {!loading && !error && dataset.length > 0 && dataset.map((data) => (
            <TableRow
              key={data.id}
              sx={[
                selectable && {
                  cursor: 'pointer',
                  transition: 'background .3s',
                  '&:hover': {
                    bgcolor: 'border.main',
                  },
                },
              ]}
              onClick={() => handleSelect(data)}
            >
              {columns.map((col) => {
                let content = null;
                if (col.render && typeof col.render === 'function') {
                  content = col.render(data, col);
                } else {
                  const val = getValue(data, col.key);
                  content = val || val === 0 ? val : '-';
                }
                return (
                  <TableCell
                    key={col.key}
                    align={col.align}
                    sx={[
                      col.valign && { verticalAlign: col.valign },
                    ]}
                    onClick={col.stopPropagate ? (e) => e.stopPropagation() : null}
                  >
                    {content}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
