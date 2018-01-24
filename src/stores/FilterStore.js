
import FeaturedPlaylistDispatcher from '../dispatchers/FeaturedPlaylistDispatcher.js';
import FilterConstants from '../constants/FilterConstants.js';
import EventEmitter from 'events';

let store = {
    current: {},
    data: {}
}

const FilterStore = Object.assign({}, EventEmitter.prototype, {
	getState: function() {
		return store;
	},

	addListener: function(callback) {
		this.on('change', callback)
	},

	removeListener: function(callback) {
		this.removeListener('change', callback)
	},

	emitEvent: function() {
		this.emit('change');
	}
})

function _setFilter(data) {
	store = Object.assign({}, data);
}

FeaturedPlaylistDispatcher.register(action => {
	if (action.type === FilterConstants.UPDATE) {
		_setFilter(action.data);
		FilterStore.emitEvent();
	}
})

export default FilterStore;