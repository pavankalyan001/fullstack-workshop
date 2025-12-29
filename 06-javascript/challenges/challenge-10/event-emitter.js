function createEventEmitter() {
  const events = {};

  return {
    // Subscribe to an event
    on(eventName, listener) {
      if (!events[eventName]) {
        events[eventName] = [];
      }

      events[eventName].push(listener);

      // Return unsubscribe function
      return () => {
        events[eventName] = events[eventName].filter(
          fn => fn !== listener
        );
      };
    },

    // Subscribe only once
    once(eventName, listener) {
      const wrapper = (data) => {
        listener(data);
        this.off(eventName, wrapper);
      };

      this.on(eventName, wrapper);
    },

    // Emit an event
    emit(eventName, data) {
      if (!events[eventName]) return;

      events[eventName].forEach(listener => {
        listener(data);
      });
    },

    // Remove listeners
    off(eventName, listener) {
      if (!events[eventName]) return;

      // Remove all listeners for the event
      if (!listener) {
        delete events[eventName];
      } else {
        events[eventName] = events[eventName].filter(
          fn => fn !== listener
        );
      }
    }
  };
}

/* ===============================
   Example Usage / Test
================================ */

const emitter = createEventEmitter();

// Subscribe
const unsubscribe = emitter.on('userLogin', (user) => {
  console.log(`${user.name} logged in`);
});

emitter.on('userLogin', (user) => {
  console.log(`Send welcome email to ${user.email}`);
});

// One-time listener
emitter.once('appStart', () => {
  console.log('App started - this only runs once');
});

// Emit events
emitter.emit('userLogin', { name: 'siva', email: 'siva@example.com' });
// siva logged in
// Send welcome email to siva@example.com

emitter.emit('appStart'); // Runs
emitter.emit('appStart'); // Nothing happens

// Unsubscribe first listener
unsubscribe();

emitter.emit('userLogin', { name: 'sai', email: 'sai@example.com' });
// Send welcome email to sai@example.com

// Remove all listeners for userLogin
emitter.off('userLogin');