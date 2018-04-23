import Controller from '@ember/controller';
import {match, gte, and, not} from '@ember/object/computed';

export default Controller.extend({
    emailAddress: "",
    text: "",
    messageSent: false,
    hasValidEmail: match('model.email', /^.+@.+\..+$/),
    hasText: gte('model.text.length', 5),
    isValid: and('hasValidEmail', 'hasText'),
    isDisabled: not('isValid'),
    actions: {
        saveContact(contactModel) {
            contactModel.save().then(() => {
                const newContact = this.store.createRecord('contact');
                
                this.set('messageSent', true);
                this.set('feedbackMessage', `Thank you for your messge. We will be in touch with you shortly.`);

                this.set('model', newContact);
            });
        }
    }
});
