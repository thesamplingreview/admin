import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { appRoute } from '@/helpers/route';
import { useModel } from '@/contexts/hooks/module';
import CBox from '@/components/CBox.jsx';
import CDisplayControl from '@/components/CDisplayControl.jsx';
import BadgeStatus from './BadgeStatus.jsx';

export default function ViewDetail({ ...props }) {
  const [model] = useModel();

  const formFields = useMemo(() => {
    return model.form?.fields?.map((data) => {
      let answer = model.submissions?.[data.id];

      // custom type handling
      if (answer && data.type === 'products') {
        const productIds = Array.isArray(answer) ? answer : [answer];
        answer = model.campaign?.products?.filter((d) => productIds.includes(d.id));
      } else if (answer && Array.isArray(answer)) {
        answer = answer.join(', ');
      }
      return {
        ...data,
        answer,
      };
    }) || [];
  }, [model]);

  return (
    <CBox title="Submission Detail" {...props}>
      {formFields.map((field) => (
        <FormDisplayControl key={field.id} field={field} />
      ))}
      <Box my={3}>
        <Divider />
      </Box>
      <CDisplayControl label="Status">
        <BadgeStatus status={model.status} />
      </CDisplayControl>
      <CDisplayControl
        label="Reference Form"
        type="url"
        value={model.form?.name}
        valueProps={{
          link: appRoute(`/forms/${model.form?.id}`),
        }}
      />
      <CDisplayControl
        label="Campaign"
        type="url"
        value={model.campaign?.name}
        valueProps={{
          link: appRoute(`/campaigns/${model.campaign?.id}`),
        }}
      />
      <CDisplayControl
        label="User"
        type="url"
        value={model.user?.name}
        valueProps={{
          link: appRoute(`/users/${model.user?.id}`),
        }}
      />
      <CDisplayControl
        label="Last Update"
        type="datetime"
        value={model.updated_at}
      />
      <CDisplayControl
        label="Created Date"
        type="datetime"
        value={model.created_at}
      />
    </CBox>
  );
}

function FormDisplayControl({ field }) {
  if (field.type === 'products') {
    return (
      <CDisplayControl label={field.name}>
        <Box display="flex" flexWrap="wrap" gap={3}>
          {field.answer?.map((data) => (
            <Box
              key={data.id}
              component={Link}
              to={appRoute(`/products/${data.id}`)}
              width="150px"
              color="var(--color-500)"
              border="1px solid var(--border-500)"
              borderRadius=".5rem"
              textAlign="center"
              p={2}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  color: 'var(--main-500)',
                },
              }}
            >
              <Box
                component="img"
                src={data.image_url}
                alt={data.name}
                width="100%"
                height="auto"
              />
              <Typography component="div" variant="caption" mt={1}>
                {data.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </CDisplayControl>
    );
  }

  if (field.type === 'address') {
    return (
      <>
        {field.config?.fields?.includes('address') && (
          <>
            <CDisplayControl
              label="Address"
              type="html"
              value={field.answer?.address?.replace(/\n/g, '<br>')}
            />
            <CDisplayControl
              label="Postal"
              value={field.answer?.postal}
            />
            <CDisplayControl
              label="State"
              value={field.answer?.state}
            />
          </>
        )}
        {field.config?.fields?.includes('name') && (
          <CDisplayControl
            label="Full Name"
            value={field.answer?.name}
          />
        )}
        {field.config?.fields?.includes('email') && (
          <CDisplayControl
            label="Email"
            value={field.answer?.email}
          />
        )}
        {field.config?.fields?.includes('contact') && (
          <CDisplayControl
            label="Phone Number"
            value={field.answer?.contact}
          />
        )}
      </>
    );
  }

  if (field.type === 'file') {
    return (
      <CDisplayControl
        label={field.name}
        type="url"
        value="View attachment"
        valueProps={{
          link: field.answer,
          target: '_blank',
        }}
      />
    );
  }

  if (field.type === 'static') {
    return null;
  }

  return (
    <CDisplayControl
      label={field.name}
      value={field.answer}
    />
  );
}
