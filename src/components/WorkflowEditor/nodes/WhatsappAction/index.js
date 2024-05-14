import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_whatsapp',
  name: 'WhatsApp Message',
  desc: 'Send WhatsApp message to {to}',
  icon: 'fa-phone',
  color: '#5bb361',
  configComp: NodeConfig,
  validate: (input) => {
    if (!input?.to) {
      return 'Number is required.';
    }
    if (!input?.message) {
      return 'Message is required.';
    }
    return '';
  },
};

export default meta;
