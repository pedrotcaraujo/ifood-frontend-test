
import FeaturedPlaylistDispatcher from '../dispatchers/FeaturedPlaylistDispatcher.js';
import PlaylistConstants from '../constants/PlaylistConstants.js';
import EventEmitter from 'events';

let playlist = null

const PlaylistStore = Object.assign({}, EventEmitter.prototype, {
	getState: function() {
		return playlist;
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

function _setPlaylist(data) {
	playerState = data;
}

FeaturedPlaylistDispatcher.register(action => {
	if (action.type === PlaylistConstants.UPDATE) {
		_setPlaylist(action.data);
		PlaylistStore.emitEvent();
	}
})

export default PlaylistStore;