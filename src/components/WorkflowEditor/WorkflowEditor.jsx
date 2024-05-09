import Box from '@mui/material/Box';
import { WFContextProvider } from './WFContext.jsx';
import WFHeader from './WFHeader.jsx';
import WFEditor from './WFEditor.jsx';
import WFNodesSelection from './WFNodesSelection.jsx';

const initialNodes = [
  {
    id: 'node1',
    type: 'call_api',
    config: {
      to: 'kenny@qutebox.com',
    },
    parent_task_id: null,
    pos: null,
  },
  {
    id: 'node2',
    type: 'send_email',
    config: {
      to: 'kenny@qutebox.com',
    },
    parent_task_id: 'node1',
    pos: null,
  },
  {
    id: 'node1_success',
    type: 'send_email',
    config: {
      to: 'kenny@qutebox.com',
    },
    parent_task_id: 'node1',
    pos: 'left',
  },
  {
    id: 'node1_fail',
    type: 'send_email',
    config: {
      to: 'kenny@qutebox.com',
    },
    parent_task_id: 'node1',
    pos: 'right',
  },
  {
    id: 'node3',
    type: 'call_api',
    config: {
      to: 'kenny@qutebox.com',
    },
    parent_task_id: 'node2',
    pos: null,
  },
  // {
  //   id: 'node1_success_a',
  //   type: 'call_api',
  //   config: {
  //     to: 'kenny@qutebox.com',
  //   },
  //   parent_task_id: 'node1_success',
  //   pos: 'success',
  // },
  // {
  //   id: 'node1_success_b',
  //   type: 'call_api',
  //   config: {
  //     to: 'kenny@qutebox.com',
  //   },
  //   parent_task_id: 'node1_success',
  //   pos: 'fail',
  // },
  // {
  //   id: 'node1_success_a1',
  //   type: 'send_email',
  //   config: {},
  //   parent_task_id: 'node1_success_a',
  //   pos: 'fail',
  // },
  // {
  //   id: 'node1_success_a11',
  //   type: 'call_api',
  //   config: {},
  //   parent_task_id: 'node1_success_a1',
  //   pos: null,
  // },
];

export default function WorkflowEditor() {
  return (
    <WFContextProvider dataset={initialNodes}>
      <Box
        position="relative"
        overflow="hidden"
        bgcolor="var(--bg-500)"
        // sx={{
        //   // backgroundColor: 'var(--bg-500)',
        //   // backgroundPosition: 'calc(var(--gap) / 2 * -1) calc(var(--gap) / 2 * -1)',
        //   // backgroundSize: 'var(--gap) var(--gap)',
        //   // backgroundImage: 'linear-gradient(to right, #eee 1px, transparent 1px), linear-gradient(to bottom, #eee 1px, transparent 1px)', // grid-design
        //   // backgroundImage: 'radial-gradient(circle, #ccc 1px, rgba(0, 0, 0, 0) 1px)', // dot-design
        // }}
      >
        <WFHeader />
        <WFEditor height="500px" />
        <WFNodesSelection />
      </Box>
    </WFContextProvider>
  );
}
