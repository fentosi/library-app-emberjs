import Controller from '@ember/controller';
import {match, gte, and, not, or} from '@ember/object/computed';

export default Controller.extend({
    isLoading: false,
    emailAddress: "",
    text: "",
    messageSent: false,
    hasValidEmail: match('model.email', /^.+@.+\..+$/),
    hasText: gte('model.text.length', 5),
    isValid: and('hasValidEmail', 'hasText'),
    isNotValid: not('isValid'),
    isDisabled: or('isNotValid', 'isLoading')
});
