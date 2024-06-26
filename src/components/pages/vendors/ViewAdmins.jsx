import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import CBox from '@/components/CBox.jsx';
import { DataTable } from '@/components/DataTable';
import BadgeStatus from '../admins/BadgeStatus.jsx';

export default function ViewAdmins({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const [model] = useModel();
  const endpointGet = useRoleEndpoint('/admins');

  const columns = [
    {
      key: 'name',
      name: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      name: 'Email',
      sortable: true,
    },
    {
      key: 'status',
      name: 'Status',
      sortable: true,
      render(data) {
        return <BadgeStatus status={data.status} />;
      },
    },
    {
      key: 'user_role.name',
      name: 'Role',
    },
  ];

  const fetchData = useCallback(({ page, perPage, sort }) => {
    const params = {
      vendor_id: model.id,
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
    navigate(appRoute(`/admins/${data.id}`));
  };

  return (
    <CBox {...props} noPadding>
      <DataTable
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
  );
}
