
import FeaturedPlaylistDispatcher from '../dispatchers/FeaturedPlaylistDispatcher.js';
import PlaylistsConstants from '../constants/PlaylistsConstants.js';
import EventEmitter from 'events';

let store = {}

const PlaylistsStore = Object.assign({}, EventEmitter.prototype, {
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

function _setPlaylists(data) {
	store = data;
}

FeaturedPlaylistDispatcher.register(action => {
	if (action.type === PlaylistsConstants.UPDATE) {
		_setPlaylists(action.data);
		PlaylistsStore.emitEvent();
	}
})

export default PlaylistsStore;