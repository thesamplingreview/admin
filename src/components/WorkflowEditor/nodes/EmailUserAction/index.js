import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_user_email',
  name: 'Email User',
  desc: 'Send email to enrolled user',
  icon: 'fa-envelope-circle-check',
  color: '#11adc1',
  configComp: NodeConfig,
  validate: (input) => {
    if (!input?.template) {
      return 'Template is required.';
    }
    return '';
  },
};

export default meta;
