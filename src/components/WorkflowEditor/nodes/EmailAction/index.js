import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_email',
  name: 'Send Email',
  desc: 'Send email notification to {to}',
  icon: 'fa-envelope-circle-check',
  color: '#11adc1',
  configComp: NodeConfig,
  validate: (input) => {
    if (!input?.to) {
      return 'Email to is required.';
    }
    if (!input?.message) {
      return 'Message is required.';
    }
    return '';
  },
};

export default meta;
