import { useContext } from 'react';
import DTContext from './DTContext.jsx';

export function useColumns() {
  const { columns } = useContext(DTContext);

  return [columns];
}

export function useDataset() {
  const { dataset, setDataset } = useContext(DTContext);

  return [dataset, setDataset];
}

export function useTableState() {
  const { loading, error } = useContext(DTContext);

  return { loading, error };
}

export function useMeta(state = '') {
  const {
    total,
    page,
    setPage,
    sort,
    setSort,
    perPage,
    setPerPage,
    filters,
    setFilters,
  } = useContext(DTContext);

  if (state === 'pagin') {
    return [{ page, perPage, total }, { setPage, setPerPage }];
  }
  if (state === 'sort') {
    const sortMeta = {
      value: sort,
      key: sort.startsWith('-') ? sort.substring(1) : sort,
      order: sort.startsWith('-') ? 'DESC' : 'ASC',
    };
    return [sortMeta, setSort];
  }
  if (state === 'filters') {
    return [filters, setFilters];
  }
  return [];
}
