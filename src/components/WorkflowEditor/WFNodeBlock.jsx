import { useRef, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FasIcon from '@/components/FasIcon.jsx';
import { useAction } from './hooks';

export default function WFNodeBlock({ node, noActions }) {
  const removeNode = useAction('removeNode');
  const updateConfig = useAction('updateNodeConfig');
  const elActions = useRef(null);
  const [openConfig, setOpenConfig] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const isInvalid = useMemo(() => {
    // doesn't support validation
    if (!node.node_detail?.validate) {
      return false;
    }
    const hasError = node.node_detail.validate(node.config);
    return !!hasError;
  }, [node]);

  const descText = useMemo(() => {
    const { desc } = node.node_detail;
    return desc.replace(/{(\w+)}/g, (match, key) => node.config?.[key] || '-');
  }, [node]);

  const ConfigComp = node.node_detail?.configComp || null;

  const handleToggleOpen = () => {
    if (ConfigComp) {
      setOpenConfig((oldState) => !oldState);
    }
  };

  const handleToggleActions = () => {
    setOpenActions((oldState) => !oldState);
  };

  const handleChange = (e) => {
    const newConfig = {
      ...node.config,
      [e.target.name]: e.target.value,
    };
    updateConfig(node.id, newConfig);
  };

  const handleSet = (newObj) => {
    const newConfig = {
      ...node.config,
      ...newObj,
    };
    updateConfig(node.id, newConfig);
  };

  const handleDelete = () => {
    setOpenConfig(false);
    setOpenActions(false);
    removeNode(node);
  };

  if (!node.node_detail) {
    return null;
  }
  return (
    <Box
      backgroundColor="#fff"
      border="1px solid var(--border-500)"
      borderRadius="8px"
      width="var(--wf-width)"
      fontSize="0.875rem"
      className="noselect"
      mx="auto"
      sx={{ boxShadow: 'var(--elevation-2)' }}
    >
      <Box
        display="flex"
        alignItems="center"
        p={2}
        className={noActions ? '' : 'clickable'}
        onClick={handleToggleOpen}
      >
        <Box position="relative" pl={1} pr={2}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor={`${node.node_detail.color}28`}
            width="3em"
            height="3em"
            borderRadius="50%"
          >
            <FasIcon
              name={node.node_detail.icon}
              fontSize="1.25em"
              color={node.node_detail.color}
            />
          </Box>
          {isInvalid && (
            <FasIcon
              name="fa-circle-exclamation"
              color="#f44"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: '1rem',
              }}
            />
          )}
        </Box>
        <Box flexGrow="1">
          <Typography variant="inherit" component="div" fontWeight="700">
            {node.node_detail.name}
          </Typography>
          <Typography variant="caption" component="div" color="textSecondary">
            {descText}
          </Typography>
        </Box>
        {!noActions && (
          <Box onClick={(e) => e.stopPropagation()}>
            <IconButton
              ref={elActions}
              sx={{ width: '1.25em' }}
              onClick={handleToggleActions}
            >
              <FasIcon
                name="fa-ellipsis-vertical"
                color="var(--color-300)"
                fontSize="1.25rem"
              />
            </IconButton>
            <BlockActions
              open={openActions}
              anchorEl={elActions.current}
              onClose={handleToggleActions}
              onDelete={handleDelete}
            />
          </Box>
        )}
      </Box>
      {openConfig && ConfigComp && (
        <Box borderTop="1px solid var(--border-500)" p={2}>
          <ConfigComp
            config={node.config || {}}
            onChange={handleChange}
            onSet={handleSet}
          />
          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleToggleOpen}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const BlockActions = ({
  open,
  anchorEl,
  onClose,
  onDelete,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      elevation={2}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          minWidth: '180px',
        },
      }}
    >
      <MenuItem
        sx={{ fontSize: '0.875rem' }}
        onClick={onDelete}
      >
        Delete this action?
      </MenuItem>
    </Menu>
  );
};
