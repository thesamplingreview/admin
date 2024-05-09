import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'call_api',
  name: 'Call API',
  desc: 'Trigger external API',
  icon: 'fa-globe',
  color: '#c92464',
  configComp: NodeConfig,
  conditionable: ['Success', 'Error'],
};

export default meta;
