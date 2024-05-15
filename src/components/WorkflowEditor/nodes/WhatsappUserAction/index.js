import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_user_whatsapp',
  name: 'WhatsApp User',
  desc: 'Send WhatsApp to enrolled user',
  icon: 'fa-phone',
  color: '#5bb361',
  configComp: NodeConfig,
  validate: (input) => {
    if (!input?.template) {
      return 'Template is required.';
    }
    return '';
  },
};

export default meta;
