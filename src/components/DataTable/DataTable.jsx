import { DTContextProvider } from './DTContext.jsx';
import DTTable from './DTTable.jsx';
import DTPaginator from './DTPaginator.jsx';
import DTFilters from './DTFilters.jsx';

/**
 * Columns props
 *
 * @prop  {string}  key - used for data key map
 * @prop  {stirng}  name - column name
 * @prop  {number}  width
 * @prop  {string}  align
 * @prop  {boolean}  sortable
 * @prop  {boolean}  stopPropagate - prevent selectable on cell
 */

export default function DataTable({
  columns,
  initData = {
    page: 1,
    perPage: 10,
    sort: '',
    filters: {},
  },
  dataProps = {
    data: 'data',
    total: 'meta.total',
  },
  selectable = false,
  filterable = false,
  fixed = false,
  filtersBody,
  fetcher,
  onSelect,
}) {
  return (
    <DTContextProvider
      columns={columns}
      initData={initData}
      dataProps={dataProps}
      fetcher={fetcher}
    >
      {filterable && <DTFilters>{filtersBody}</DTFilters>}

      <DTTable
        selectable={selectable}
        onSelect={onSelect}
      />

      <DTPaginator />
    </DTContextProvider>
  );
}
