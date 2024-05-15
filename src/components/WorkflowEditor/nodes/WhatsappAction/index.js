import NodeConfig from './NodeConfig.jsx';

const meta = {
  key: 'send_whatsapp',
  name: 'WhatsApp Notifier',
  desc: 'Send WhatsApp notify to {number}',
  icon: 'fa-comment-dots',
  color: '#5bb361',
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
