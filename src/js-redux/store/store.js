const { createStore } = require("redux");
const { default: rootReducer } = require("../reducer/reducer");

const store = createStore(rootReducer);

export default store;