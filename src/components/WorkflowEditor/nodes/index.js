import EmailAction from './EmailAction';
import WhatsappAction from './WhatsappAction';
import ApiAction from './ApiAction';
import DelayAction from './DelayAction';
import EndAction from './EndAction';

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
  send_email: EmailAction,
  send_whatsapp: WhatsappAction,
  call_api: ApiAction,
  delay_action: DelayAction,
  // end_action: EndAction,
};

export default nodes;
