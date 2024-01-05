import { useRef, useState, useMemo } from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import CInput from '@/components/CInput.jsx';
import FasIcon from '@/components/FasIcon.jsx';

export default function InputDates({ value, onChange }) {
  const $el = useRef(null);
  const [input, setInput] = useState({
    start: format(value.start, 'yyyy-MM-dd'),
    end: format(value.end, 'yyyy-MM-dd'),
  });
  const [open, setOpen] = useState(false);

  const displayValue = useMemo(() => {
    return [
      format(value.start, 'd/M/yyyy'),
      format(value.end, 'd/M/yyyy'),
    ].join(' - ');
  }, [value]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onChange({
      start: new Date(input.start),
      end: new Date(input.end),
    });
    setOpen(false);
  };

  return (
    <>
      <Button
        ref={$el}
        variant="outlined"
        color="text"
        size="small"
        endIcon={<FasIcon name="fa-caret-down" />}
        sx={{
          borderColor: 'var(--border-500)',
          fontWeight: '400',
        }}
        onClick={() => setOpen(!open)}
      >
        {displayValue}
      </Button>
      <Popover
        anchorEl={$el.current}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setOpen(false)}
      >
        <Box p={3}>
          <Grid container spacing={1}>
            <Grid xs={6}>
              <CInput
                type="date"
                label="Start date"
                InputLabelProps={{ shrink: true }}
                name="start"
                value={input.start}
                onChange={handleChange}
              />
            </Grid>
            <Grid xs={6}>
              <CInput
                type="date"
                label="End date"
                InputLabelProps={{ shrink: true }}
                name="end"
                value={input.end}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button color="text" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
