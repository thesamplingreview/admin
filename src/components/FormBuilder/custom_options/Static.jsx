import CInputMD from '@/components/CInputMD.jsx';
import CFormControl from '@/components/CFormControl.jsx';

export default function OptionProducts({
  field,
  onChange,
}) {
  return (
    <>
      <CFormControl label="Content">
        <CInputMD
          name="config.content"
          value={field['config.content'] || ''}
          label="Enter content"
          onChange={onChange}
        />
      </CFormControl>
    </>
  );
}
