import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import { DataTable } from '@/components/DataTable';
import DialogAdd from '@/components/pages/workflows/DialogAdd.jsx';

export default function ViewWorkflows({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const [model] = useModel();
  const endpointGet = useRoleEndpoint('/workflows');

  const [isAdd, setIsAdd] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const columns = useMemo(() => ([
    {
      key: 'name',
      name: 'Workflow Name',
    },
    {
      key: 'trigger',
      name: 'Trigger',
    },
  ]), []);

  const fetchData = useCallback(({ page, perPage, sort }) => {
    const params = {
      campaign_id: model.id,
      page,
      sort,
      per_page: perPage,
    };
    return doFetch(endpointGet, { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch, model.id, endpointGet]);

  const handleSelect = (data) => {
    navigate(appRoute(`/workflows/${data.id}`));
  };

  const handleAdd = () => {
    setIsAdd(true);
  };

  const handleCloseAdd = () => {
    setIsAdd(false);
  };

  const handleAdded = () => {
    setIsAdd(false);
    setReloadKey((new Date()).valueOf());
  };

  return (
    <>
      <CBox
        {...props}
        noPadding
        action={(
          <Box my={-1}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAdd}
            >
              New Workflow
            </Button>
          </Box>
        )}
      >
        <DataTable
          key={reloadKey}
          columns={columns}
          initData={{
            page: 1,
            perPage: 20,
            sort: '',
            filters: {},
          }}
          dataProps={{
            data: 'data',
            total: 'meta.total',
          }}
          selectable
          fetcher={fetchData}
          onSelect={handleSelect}
        />
      </CBox>

      <DialogAdd
        open={isAdd}
        appendData={{
          campaign_id: model.id,
          vendor_id: model.vendor_id,
        }}
        onClose={handleCloseAdd}
        onAdded={handleAdded}
      />
    </>
  );
}
