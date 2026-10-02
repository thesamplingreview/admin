import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_user_sms',
  name: 'SMS User',
  desc: 'Send SMS message to enrolled user',
  icon: 'fa-message',
  color: '#6a3771',
  configComp: NodeConfig,
  // SMS sending is disabled; kept so existing workflows still render
  hidden: true,
  validate: (input) => {
    if (!input?.template) {
      return 'Template is required.';
    }
    return '';
  },
};

export default meta;
