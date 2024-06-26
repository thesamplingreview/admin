import EmailAction from './EmailAction';
import EmailUserAction from './EmailUserAction';
import WhatsappAction from './WhatsappAction';
import WhatsappUserAction from './WhatsappUserAction';
import SmsAction from './SmsAction';
import SmsUserAction from './SmsUserAction';
import ApiAction from './ApiAction';
// import DelayAction from './DelayAction';

/**
 * Action configs
 *
 * @attr  key - must match the nodes.{key}
 * @attr  name
 * @attr  desc
 * @attr  icon - FasIcon
 * @attr  color - color palette ref -> https://lospec.com/palette-list/island-joy-16
 * @attr  configComp - react component for config
 */
const nodes = {
  send_user_email: EmailUserAction,
  send_user_sms: SmsUserAction,
  send_user_whatsapp: WhatsappUserAction,
  send_email: EmailAction,
  send_sms: SmsAction,
  send_whatsapp: WhatsappAction,
  call_api: ApiAction,
  // delay_action: DelayAction,
};

export default nodes;
