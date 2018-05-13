import Controller from '@ember/controller';
import {match, not, or} from '@ember/object/computed';

export default Controller.extend({
    isLoading: false,
    emailAddress: "",
    hasValidEmail: match('model.email', /^.+@.+\..+$/),
    hasNotValidEmail: not('hasValidEmail'),
    isDisabled: or('hasNotValidEmail', 'isLoading')
});
