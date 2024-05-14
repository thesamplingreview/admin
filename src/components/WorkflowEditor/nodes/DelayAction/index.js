import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'delay_action',
  name: 'Delay',
  desc: 'Delay subsequent actions by {duration} hours',
  icon: 'fa-clock-rotate-left',
  color: '#f99252',
  configComp: NodeConfig,
  validate: (input) => {
    if (!input?.duration) {
      return 'Duration is required.';
    }
    return '';
  },
};

export default meta;
