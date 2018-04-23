import Controller from '@ember/controller';
import {match, not} from '@ember/object/computed';

export default Controller.extend({
    emailAddress: "",
    hasValidEmail: match('model.email', /^.+@.+\..+$/),
    isDisabled: not('hasValidEmail'),
    actions: {
        saveInvitation (invitationModel) {
            this.get('store').query('invitation', {
                filter: {
                    email: invitationModel.email
                }
            }).then((invitations) => {
                if (invitations.length == 1) {
                    invitationModel.save().then((savedInvitation) => {
                        this.set('feedbackMessage', `Your email address has been saved with id: ${savedInvitation.id}`);
                        
                        const newInvitation = this.store.createRecord('invitation');
        
                        this.set('model', newInvitation);
                    });        
                } else {
                    this.set('errorMessage', `You already subscribed with email: ${invitationModel.email}`);
                }
            })

        }
    }
});
