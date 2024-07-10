import { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { isEmptyObj } from '@/helpers/utils';
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

/**
 * This hook is for parent to easily init table data from query string
 *
 * @params  {object}  defaultData
 * @return  {object}
 */
export function useInitTableData(defaultData = null) {
  // NOTE: using location instead of useSearchParams as searchParams won't be updated when navigate to same route, hence causing the table failed to reload
  const location = useLocation();

  const initData = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const qs = {};
    params.forEach((value, key) => {
      qs[key] = value;
    });
    const {
      page,
      perPage,
      sort,
      ...filters
    } = qs;
    return {
      key: (new Date()).valueOf(),
      page: Number(page || defaultData?.page || 1),
      perPage: Number(perPage || defaultData?.perPage || 20),
      sort: sort || defaultData?.sort || '',
      filters: !isEmptyObj(filters) ? filters : (defaultData?.filters || {}),
    };
  }, [location, defaultData]);

  return initData;
}
