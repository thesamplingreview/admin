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
      if (
        (min !== undefined && input < min)
        || (max !== undefined && input > max)
      ) {
        return 'Invalid number input.';
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
