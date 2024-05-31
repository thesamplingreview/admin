import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_sms',
  name: 'Notification (SMS)',
  desc: 'Send SMS notification to {number}',
  icon: 'fa-comment-sms',
  color: '#6a3771',
  configComp: NodeConfig,
  validate: (input) => {
    if (!input?.number) {
      return 'Number is required.';
    }
    if (!input?.message) {
      return 'Message is required.';
    }
    return '';
  },
};

export default meta;
