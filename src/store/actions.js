export default {
  updateLocation (context, payload) {
    context.commit('UPDATE_LOCATION', payload)
  },

  updateLocationInfo (context, payload) {
    context.commit('UPDATE_LOCATION_INFO', payload)
  }
}