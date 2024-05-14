import { useState } from 'react';
import Box from '@mui/material/Box';
import { WFContextProvider } from './WFContext.jsx';
import WFHeader from './WFHeader.jsx';
import WFEditor from './WFEditor.jsx';
import WFNodesSelection from './WFNodesSelection.jsx';

export default function WorkflowEditor({
  title,
  value = [],
  options = [],
  loading = false,
  height = '500px',
  onSave,
}) {
  const [isFull, setIsFull] = useState(false);

  return (
    <WFContextProvider
      dataset={value}
      options={options}
      loading={loading}
      onSave={onSave}
    >
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        overflow="hidden"
        bgcolor="var(--bg-500)"
        sx={[
          isFull && {
            position: 'fixed',
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        ]}
        // sx={{
        //   // backgroundColor: 'var(--bg-500)',
        //   // backgroundPosition: 'calc(var(--gap) / 2 * -1) calc(var(--gap) / 2 * -1)',
        //   // backgroundSize: 'var(--gap) var(--gap)',
        //   // backgroundImage: 'linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)', // grid-design
        //   // backgroundImage: 'radial-gradient(circle, #ccc 1px, rgba(0, 0, 0, 0) 1px)', // dot-design
        // }}
      >
        <WFHeader
          title={title}
          isFull={isFull}
          setIsFull={setIsFull}
        />
        <WFEditor
          isFull={isFull}
          height={height}
        />
        <WFNodesSelection />
      </Box>
    </WFContextProvider>
  );
}
