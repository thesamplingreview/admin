import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'call_api',
  name: 'Call API',
  desc: 'Trigger external API / webhook',
  icon: 'fa-globe',
  color: '#c92464',
  configComp: NodeConfig,
  conditionable: ['Success', 'Error'],
  validate: (input) => {
    if (!input?.endpoint) {
      return 'Endpoint is required.';
    }
    return '';
  },
};

export default meta;
