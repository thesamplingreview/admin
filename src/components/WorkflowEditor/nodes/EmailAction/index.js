import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_email',
  name: 'Email Notifier',
  desc: 'Send email notification to {email}',
  icon: 'fa-envelopes-bulk',
  color: '#11adc1',
  configComp: NodeConfig,
  validate: (input) => {
    if (!input?.email) {
      return 'Email is required.';
    }
    if (!input?.message) {
      return 'Message is required.';
    }
    return '';
  },
};

export default meta;
