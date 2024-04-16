import {
  createContext, useRef, useState, useCallback,
} from 'react';
import { getValue } from '@/helpers/utils';
import { useOnce, useUpdated } from '@/helpers/hooks';

const initialState = {
  loading: false,
  error: null,
  columns: [],
  dataset: [],
  total: 0,
  page: 1,
  perPage: 10,
  sort: '',
  filters: {},
};

const DTContext = createContext(initialState);

export const DTContextProvider = ({
  columns,
  initData,
  dataProps,
  fetcher,
  children,
}) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [error, setError] = useState(initialState.error);
  const [dataset, setDataset] = useState(initialState.dataset);
  const [total, setTotal] = useState(initialState.total);
  const [page, setPage] = useState(initData?.page || initialState.page);
  const [perPage, setPerPage] = useState(initData?.perPage || initialState.perPage);
  const [sort, setSort] = useState(initData?.sort || initialState.sort);
  const [filters, setFilters] = useState(initData?.filters || initialState.filters);

  const fetchData = useCallback(async () => {
    if (!fetcher) {
      return;
    }

    setLoading(true);
    try {
      const result = await fetcher({
        page, perPage, sort, filters,
      });
      setDataset(getValue(result, dataProps.data) || []);
      setTotal(getValue(result, dataProps.total) || 0);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, [fetcher, page, perPage, sort, filters, dataProps]);

  const timer = useRef(null);
  // updated - sort & page
  useUpdated(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fetchData, 400);
  }, [sort, page]);
  // updated - filters
  useUpdated(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(fetchData, 100);
  }, [filters]);

  // init
  useOnce(() => {
    fetchData();
  });

  return (
    <DTContext.Provider value={{
      loading,
      error,
      columns,
      dataset,
      page,
      setPage,
      sort,
      setSort,
      perPage,
      setPerPage,
      filters,
      setFilters,
      total,
    }}>
      {children}
    </DTContext.Provider>
  );
};

export default DTContext;
