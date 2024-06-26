import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useToast } from '@/contexts/hooks/toast';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useModel, useOptions } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import { DataTable } from '@/components/DataTable';
import DialogAdd from '@/components/pages/workflows/DialogAdd.jsx';
import TriggerButton from '@/components/pages/workflows/TriggerButton.jsx';

export default function ViewWorkflows({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const pushToast = useToast();
  const options = useOptions();
  const [model] = useModel();
  const endpointGet = useRoleEndpoint('/workflows');
  const endpointPut = useRoleEndpoint('/workflows/{id}');

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
      render(item) {
        const found = options.workflow_triggers?.find((d) => d.id === item.trigger);
        return found?.name || item.trigger;
      },
    },
    {
      key: 'workflow_tasks_count',
      name: 'Tasks',
      width: 120,
    },
    {
      key: 'enable',
      name: 'Auto Trigger',
      width: 150,
      render(item) {
        const handleChangeEnable = async (e) => {
          const endpoint = endpointPut.replace('{id}', item.id);
          try {
            const formdata = {
              enable: e.target.checked,
            };
            const { code } = await doFetch(endpoint, {
              method: 'PUT',
              data: formdata,
            });
            if (code !== 200) {
              throw new Error('Invalid API');
            }
            // push toast
            pushToast('success', 'Status updated!');
          } catch (err) {
            pushToast('error', 'Failed to update entry.');
          }
        };

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Switch
              name="enable"
              defaultChecked={item.enable}
              onChange={handleChangeEnable}
            />
          </div>
        );
      },
    },
    {
      key: 'action',
      name: '',
      width: 160,
      render(item) {
        return (
          <div onClick={(e) => e.stopPropagation()}>
            <TriggerButton
              id={item.campaign_workflow_id}
              trigger={item.trigger}
              count={item.trigger === 'review' ? model.reviews_count : model.enrolments_accepted_count}
              type="button"
              variant="outlined"
              color="primary"
              size="small"
            >
              Trigger
            </TriggerButton>
          </div>
        );
      },
    },
  ]), [doFetch, pushToast, endpointPut, model, options.workflow_triggers]);

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
