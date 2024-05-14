import { useMemo } from 'react';
import CInput from './CInput.jsx';

export default function CInputNumber({
  value,
  name = '',
  error,
  min,
  max,
  allowDecimal = false,
  onChange,
  ...props
}) {
  const internalError = useMemo(() => {
    const input = parseFloat(value);
    if (!Number.isNaN(input)) {
      if (min !== undefined && max !== undefined) {
        if (input < min || input > max) {
          return `Number must be in range ${min}-${max}.`;
        }
      }
      if (min !== undefined && input < min) {
        return `Number must be larger than ${min}.`;
      }
      if (max !== undefined && input > max) {
        return `Number can not larger than ${max}.`;
      }
    }
    return '';
  }, [value, min, max]);

  const handleChange = (e) => {
    let regex = /^-?\d*$/;
    if (allowDecimal) {
      regex = /^-?\d*\.?\d*$/;
    }
    const input = e.target.value;
    if (regex.test(input) || input === '') {
      onChange({
        target: { name, value: input },
      });
    }
  };

  return (
    <CInput
      {...props}
      type="text"
      value={value}
      error={internalError || error}
      onChange={handleChange}
    />
  );
}
