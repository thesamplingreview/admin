import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isDate, format } from 'date-fns';
import { useFetch } from '@/contexts/hooks/auth';
import { useModel } from '@/contexts/hooks/module';
import { appRoute } from '@/helpers/route';
import config from '@/config/app';
import CBox from '@/components/CBox.jsx';
import { DataTable } from '@/components/DataTable';
import BadgeStatus from '../enrolments/BadgeStatus.jsx';

export default function ViewEnrolments({ ...props }) {
  const navigate = useNavigate();
  const doFetch = useFetch();
  const [model] = useModel();

  const columns = [
    {
      key: 'user.name',
      name: 'User',
    },
    {
      key: 'user.email',
      name: 'Email',
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
      key: 'created_at',
      name: 'Date',
      sortable: true,
      render(data) {
        const dt = new Date(data.created_at);
        return isDate(dt) ? format(dt, config.formatDateTime) : '-';
      },
    },
  ];

  const fetchData = useCallback(({ page, perPage, sort }) => {
    const params = {
      campaign_id: model.id,
      page,
      sort,
      per_page: perPage,
    };
    return doFetch('/v1/admin/enrolments', { params })
      .then((result) => {
        if (result.code !== 200) {
          throw new Error('Invalid response');
        }
        return result;
      });
  }, [doFetch, model.id]);

  const handleSelect = (data) => {
    navigate(appRoute(`/enrolments/${data.id}`));
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
