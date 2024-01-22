import { useMemo } from 'react';
import CSelect from '@/components/CSelect.jsx';
import CFormControl from '@/components/CFormControl.jsx';

export default function OptionState({
  field,
  onChange,
}) {
  const layoutOptions = useMemo(() => ([
    { id: '1', name: '1 column' },
    { id: '2', name: '2 columns' },
    { id: '3', name: '3 columns' },
    { id: '4', name: '4 columns' },
  ]), []);

  return (
    <>
      <CFormControl label="Display Layout">
        <CSelect
          options={layoutOptions}
          name="config.layout"
          label="Select layout"
          placeholder="Default"
          value={field['config.layout'] || ''}
          onChange={onChange}
        />
      </CFormControl>
    </>
  );
}
