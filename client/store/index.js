import Vue from "vue";
import Vuex from "vuex";
import * as mockData from "./mockdata.json";
import * as appConfig from "./app-config.json";
import vueJsonp from "../external/vue-jsonp.js";

Vue.use(Vuex);
Vue.use(vueJsonp);

/**
 * State initialization to store all the app
 * data. Updated based on the mutation event.
 */
const state = {
  bookData: {
    results: {
      lists: []
    }
  },
  selectedList: {},
  selectedBook: {},
  selectedListObj: {
    list_name: ""
  }
};

/**
 * Mutations to update 'store' data
 */

const mutations = {
  /**
   * Update the selectedList in the store based
   * on the mutation event
   *
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - Input to the state object
   *                          to be updated
   * @return {}
   */
  SET_SELECT_LIST(state, payload) {
    state.selectedList = payload;
  },

  /**
   * Update the selectedBook in the store based
   * on the mutation event
   *
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - Input to the state object
   *                          to be updated
   * @return {}
   */
  SET_SELECT_BOOK(state, payload) {
    state.selectedBook = payload;
  },

  /**
   * Update the selectedListObj in the store based
   * on the mutation event
   *
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - Input to the state object
   *                          to be updated
   * @return {}
   */
  SET_SELECT_LIST_ITEM(state, payload) {
    state.selectedListObj = payload;
  },

  /**
   * Update the bookData in the store based
   * on the mutation event
   *
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - Input to the state object
   *                          to be updated
   * @return {}
   */
  SET_BOOK_DATA(state, payload) {
    state.bookData = payload;
  }
};

/**
 * 'actions' basically handles all the signals
 * that is being dispatched by the store from
 * across the app.
 */
const actions = {
  /**
   * Send commit signal to the store to update
   * state's selectedList and listItem object.
   * This holds the selected lists (collection) &
   * list of books in the collection.
   *
   * @param {function} commit - function to send data
   *                            to the store via action
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - payload data that comes
   *                        from app components
   * @return {}
   */
  setSelectedList({ commit, state }, payload) {
    commit("SET_SELECT_LIST_ITEM", payload.listItem);
    commit("SET_SELECT_LIST", payload.list);
  },

  /**
   * Send commit signal to the store to update
   * state's selectedBook object.
   *
   * @param {function} commit - function to send data
   *                            to the store via action
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - payload data that comes
   *                        from app components
   * @return {}
   */
  setSelectedBook({ commit, state }, payload) {
    commit("SET_SELECT_BOOK", payload.book);
  },

  /**
   * Send commit signal to the store to update
   * state's bookData object.
   *
   * @param {function} commit - function to send data
   *                            to the store via action
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - payload data that comes
   *                        from app components
   * @return {}
   */
  setBookData({ commit, state }, payload) {
    if (Object.keys(payload.data).length) {
      commit("SET_BOOK_DATA", payload.data);
    } else {
      commit("SET_BOOK_DATA", mockData);
    }
  },

  /**
   * Loads the main source data from external source.
   * In this case via API from NY Times server.
   * Fallback updates the data from mockdata, which is
   * the clone of the response copied.
   *
   * @param {function} commit - function to send data
   *                            to the store via action
   * @param {object} state - state object from the store
   *                          contains all the app data
   * @param {object} payload - payload data that comes
   *                        from app components
   * @return {}
   */
  getBookData({ commit, state }) {
    let callbackFnName = "callback";
    let callbackHandler = "updateStoreData";
    Vue.jsonp(appConfig.app.BOOK_API, {
      "api-key": appConfig.app.API_KEY,
      callbackQuery: callbackFnName,
      callbackName: callbackHandler
    })
      .then(json => {
        commit("SET_BOOK_DATA", json);
      })
      .catch(err => {
        commit("SET_BOOK_DATA", mockData);
      });
  }
};

/**
 * State initialization to store all the app
 * data. Updated based on the mutation event.
 */
const getters = {
  listData: state => state.bookData.results.lists,
  collectionName: state => state.selectedListObj.display_name
};

const store = new Vuex.Store({
  state,
  getters: getters,
  mutations,
  actions
});

export default store;
