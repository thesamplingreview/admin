import CInput from '@/components/CInput.jsx';
import CFormControl from '@/components/CFormControl.jsx';

export default function OptionProducts({
  field,
  onChange,
}) {
  return (
    <>
      <CFormControl label="Max Selection">
        <CInput
          type="number"
          name="select_count"
          label="Enter number"
          placeholder="Default 1"
          min="1"
          helperText="Hint variable: %%total%%, %%count%%, %%left%%"
          value={field.config?.select_count || ''}
          onChange={onChange}
        />
      </CFormControl>
    </>
  );
}
