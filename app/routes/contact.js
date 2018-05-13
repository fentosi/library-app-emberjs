import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.store.createRecord('contact');
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
        saveContact(contactModel) {
            this.controller.set('isLoading', true);
            contactModel.save().then(() => {
                const newContact = this.store.createRecord('contact');
                
                this.controller.set('messageSent', true);
                this.controller.set('feedbackMessage', `Thank you for your messge. We will be in touch with you shortly.`);

                this.controller.set('model', newContact);

                this.controller.set('isLoading', false);
            });
        }
    }
});
