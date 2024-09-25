import { getDesignTokens } from '../shared-theme/customizations/themePrimitives';
import {inputsCustomizations} from '../theme/customizations/inputs';
import {dataDisplayCustomizations} from '../theme/customizations/dataDisplay';
import {feedbackCustomizations} from '../theme/customizations/feedback';
import {surfacesCustomizations} from '../theme/customizations/surfaces';
import {navigationCustomizations} from '../theme/customizations/navigation';


export default function getBlogTheme(mode) {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  };
}