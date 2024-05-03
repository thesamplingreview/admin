import { useRef, useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { useUpdated } from '@/helpers/hooks';
import { useFetch, useRoleEndpoint } from '@/contexts/hooks/auth';
import CLoader from '@/components/CLoader.jsx';
import CInput from '@/components/CInput.jsx';
import CAvatar from '@/components/CAvatar.jsx';

export default function DialogAddProduct({
  open,
  selected = [],
  onClose,
  onSelect,
}) {
  const doFetch = useFetch();
  const endpointGet = useRoleEndpoint('/products');

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState([]);
  const [input, setInput] = useState('');

  const fetchProducts = useCallback(async (keyword = '') => {
    setInput('');
    setLoading(true);
    try {
      const params = {
        status: 'active',
        name: keyword,
      };
      const { data } = await doFetch(endpointGet, { params });
      setDataset(data);
    } catch (err) {
      // ...
    }
    setLoading(false);
  }, [doFetch, endpointGet]);

  const handleAdd = () => {
    const product = dataset.find((d) => d.id === input);
    if (product) {
      onSelect({
        id: product.id,
        name: product.name,
        brand: product.brand,
        imageUrl: product.image_url,
      });
    }
  };

  const searchTimer = useRef(null);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      fetchProducts(e.target.value);
    }, 500);
  };

  useUpdated(() => {
    if (open) {
      fetchProducts();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      onClose={onClose}
    >
      <DialogTitle>
        Select Product
      </DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        <Box px={2} pt={1}>
          <CInput
            name="name"
            value={search}
            label="Search product"
            onChange={handleSearch}
          />
        </Box>

        {loading && <CLoader py={6} />}
        {!loading && dataset.length === 0 && (
          <Box textAlign="center" py={5}>
            <Typography variant="inherit">
              No Result Found!
            </Typography>
            <Typography variant="caption" color="text.light">
              Unable to locate your product.
            </Typography>
          </Box>
        )}
        {!loading && dataset.length > 0 && (
          <List sx={{ maxHeight: '380px' }}>
            {dataset.map((data) => (
              <ListItem
                key={data.id}
                selected={data.id === input}
                disablePadding
              >
                <ListItemButton
                  disabled={selected.includes(data.id)}
                  onClick={() => setInput(data.id)}
                >
                  <ListItemAvatar>
                    <CAvatar
                      name={data.name}
                      src={data.image_url}
                      variant="rounded"
                      sx={{ width: 48, height: 48 }}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={data.name} secondary={data.brand} sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="text" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={!input} onClick={handleAdd}>
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}
