const createStateMachine = config => {
  let currentState = config.initial;

  const enterState = state => {
    const onEnter = config.states[state]?.onEnter;
    if (onEnter) {
      onEnter();
    }
  };

  // Enter initial state
  enterState(currentState);

  return {
    get state() {
      return currentState;
    },

    send: event => {
      const stateConfig = config.states[currentState];
      const nextState = stateConfig?.on?.[event];

      if (!nextState) return;

      currentState = nextState;
      enterState(currentState);
    }
  };
};

/* ========== TEST 1: Traffic Light ========== */

const trafficLight = createStateMachine({
  initial: "red",
  states: {
    red: { on: { TIMER: "green" } },
    green: { on: { TIMER: "yellow" } },
    yellow: { on: { TIMER: "red" } }
  }
});

["TIMER", "TIMER", "TIMER"].forEach(event => {
  console.log(`Current state: ${trafficLight.state}`);
  trafficLight.send(event);
});

/* ========== TEST 2: Door with Actions ========== */

const door = createStateMachine({
  initial: "closed",
  states: {
    closed: {
      on: { OPEN: "open" },
      onEnter: () => console.log(`Door closed`)
    },
    open: {
      on: { CLOSE: "closed" },
      onEnter: () => console.log(`Door opened`)
    }
  }
});

["OPEN", "CLOSE", "OPEN"].forEach(action => door.send(action));
