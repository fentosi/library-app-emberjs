import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.store.createRecord('invitation');
    },
    actions: {
        willTransition(transition) {
            let model = this.controller.get('model');

            if (Object.keys(model.changedAttributes()).length > 0) {
                if (confirm("Are you sure you want to leave the page?")) {
                    model.rollbackAttributes();
                } else {
                    transition.abort();
                }
            }
        },
        saveInvitation (invitationModel) {
            this.controller.set('feedbackMessage', '');
            this.controller.set('errorMessage', '');

            if (!this.controller.isLoading) {
                this.controller.set('isLoading', true);
                this.get('store').query('invitation', {
                    orderBy: 'email',
                    equalTo: invitationModel.email
                }).then((invitations) => {
                    if (invitations.length == 0) {
                        invitationModel.save().then((savedInvitation) => {
                            this.controller.set('feedbackMessage', `Your email address has been saved with id: ${savedInvitation.id}`);
                            
                            const newInvitation = this.store.createRecord('invitation');
            
                            this.controller.set('model', newInvitation);
                            this.controller.set('isLoading', false);
                        });        
                    } else {
                        this.controller.set('errorMessage', `You already subscribed with email: ${invitationModel.email}`);
                        this.controller.set('isLoading', false);
                    }
                    
                });
            }
        }
    }
});
