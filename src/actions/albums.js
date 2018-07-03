import { fl, fs } from '../static/firebase-data';

export const getAlbums = () => dispatch => {
    dispatch({ type: 'FETCH_ALBUMS', payload: 'LOADING' });
    fl.content.get('albums', {
        orderByChild: 'order',
        fields:[
            'order',
            'album_title',
            'album_cover',
            'album_alternate_cover',
            'album_artist',
            'album_year',
            'id',
            'album_cover_bckp', 'album_alternate_cover_bckp',
        ],
        populate: ['album_cover','album_alternate_cover']
    }).then( shot => {
        if (!shot) {
            dispatch({ type: 'FETCH_ALBUMS', payload: shot });
            return;
        }
        let albums= [];
        Object.keys(shot).sort((a,b) => shot[a].order - shot[b].order).map((key) => {
            let album = shot[key];
            if (album.album_cover && album.album_cover.length > 0 && album.album_cover[0].url) {
                album.album_cover = album.album_cover[0].url;
            } else if (!!album.album_cover_bckp) {
                album.album_cover = album.album_cover_bckp;
            }
            if (album.album_alternate_cover && album.album_alternate_cover.length > 0 && album.album_alternate_cover[0].url) {
                album.album_alternate_cover = album.album_alternate_cover[0].url;
            } else if (!!album.album_alternate_cover_bckp){
                album.album_alternate_cover = album.album_alternate_cover_bckp;
            }
            albums.push(album);
        });
        dispatch({ type: 'FETCH_ALBUMS', payload: albums});
    });
};

export const getAlbum = (id) => dispatch => {
    dispatch({ type: 'FETCH_TRACKS_TRACKS', payload: 'LOADING' });
    dispatch({ type: 'FETCH_TRACKS_ALBUM', payload: 'LOADING' });
    fl.content.get('albums', id,  {
        fields:[
            'order',
            'id',
            'album_title',
            'album_cover',
            'album_artist',
            'album_year',
            'album_songs',
            'id',
            'album_cover_bckp'
        ],
        populate: [
            'album_cover',
            {
            orderByChild: 'order',
            field: 'album_songs',
            fields: [
                'order',
                'id',
                'song_title',
                'song_artist',
                'song_file',
                'song_year',
                'song_duration',
                'song_file_bckp', 'song_cover_bckp',
                'song_link'
            ],
            populate: ['song_file']
        }]
    }).then( shot => {
        if (!shot) {
            dispatch({ type: 'FETCH_TRACKS_TRACKS', payload: shot });
            dispatch({ type: 'FETCH_TRACKS_ALBUM', payload: shot });
            return;
        }
        let album = shot;
        let songs = [];
        if (album.album_cover && album.album_cover.length > 0 && album.album_cover[0].url) {
            album.album_cover = album.album_cover[0].url.replace('(','%28').replace(')','%29');
        } else if(album.album_cover_bckp) {
            album.album_cover = album.album_cover_bckp.replace('(','%28').replace(')','%29');
        }
        if (album.album_songs) {
            Object.keys(album.album_songs).map((key) => {
                const song = album.album_songs[key];
                if (song.song_cover && song.song_cover.length > 0 && song.song_cover[0].url) {
                    song.song_cover = song.song_cover[0].url.replace('(','%28').replace(')','%29');
                } else {
                    song.song_cover = album.album_cover;
                }
                if (song.song_file && song.song_file.length > 0 && song.song_file[0].url) {
                    song.song_file = song.song_file[0].url.replace('(','%28').replace(')','%29');
                } else if (song.song_file_bckp) {
                    song.song_file = song.song_file_bckp.replace('(','%28').replace(')','%29');
                }
                songs.push(song);
            });
        }
        dispatch({ type: 'FETCH_TRACKS_TRACKS', payload: songs });
        dispatch({ type: 'FETCH_TRACKS_ALBUM', payload: album });
    });
};

export const fetchAlbums = () => {
    fl.content.get('albums', {
        orderByChild: 'order',
        fields:[
            'order',
            'album_title',
            'album_cover',
            'album_alternate_cover',
            'album_artist',
            'album_year',
            'id',
            'album_cover_bckp', 'album_alternate_cover_bckp',
        ],
        populate: ['album_cover','album_alternate_cover']
    }).then( shot => {
        if (!shot) {
            return;
        }
        let albums= [];
        Object.keys(shot).sort((a,b) => shot[a].order - shot[b].order).map((key) => {
            let album = shot[key];
            if (album.album_cover && album.album_cover.length > 0 && album.album_cover[0].url) {
                album.album_cover = album.album_cover[0].url;
            } else if (!!album.album_cover_bckp) {
                album.album_cover = album.album_cover_bckp;
            }
            if (album.album_alternate_cover && album.album_alternate_cover.length > 0 && album.album_alternate_cover[0].url) {
                album.album_alternate_cover = album.album_alternate_cover[0].url;
            } else if (!!album.album_alternate_cover_bckp){
                album.album_alternate_cover = album.album_alternate_cover_bckp;
            }
            albums.push(album);
        });
        fs.collection('albums').doc('albums').set({albums: albums}).then(() => {console.log('Albums have been fetched')});
    });
};

export const fetchAllAlbums = () => {
    fl.content.get('albums',  {
        fields:[
            'order',
            'id',
            'album_title',
            'album_cover',
            'album_artist',
            'album_year',
            'album_songs',
            'id',
            'album_cover_bckp'
        ],
        populate: [
            'album_cover',
            {
                orderByChild: 'order',
                field: 'album_songs',
                fields: [
                    'order',
                    'id',
                    'song_title',
                    'song_artist',
                    'song_file',
                    'song_year',
                    'song_duration',
                    'song_file_bckp', 'song_cover_bckp',
                    'song_link'
                ],
                populate: ['song_file']
            }]
    }).then( shot => {
        if (!shot) {
            return;
        }
        Object.keys(shot).sort((a,b) => shot[a].order - shot[b].order).map((key) => {
            let album = shot[key];
            let songs = [];
            if (album.album_cover && album.album_cover.length > 0 && album.album_cover[0].url) {
                album.album_cover = album.album_cover[0].url.replace('(','%28').replace(')','%29');
            } else if(album.album_cover_bckp) {
                album.album_cover = album.album_cover_bckp.replace('(','%28').replace(')','%29');
            }
            if (album.album_songs) {
                Object.keys(album.album_songs).map((key) => {
                    const song = album.album_songs[key];
                    if (song.song_cover && song.song_cover.length > 0 && song.song_cover[0].url) {
                        song.song_cover = song.song_cover[0].url.replace('(','%28').replace(')','%29');
                    } else {
                        song.song_cover = album.album_cover;
                    }
                    if (song.song_file && song.song_file.length > 0 && song.song_file[0].url) {
                        song.song_file = song.song_file[0].url.replace('(','%28').replace(')','%29');
                    } else if (song.song_file_bckp) {
                        song.song_file = song.song_file_bckp.replace('(','%28').replace(')','%29');
                    }
                    songs.push(song);
                });
            }
            fs.collection('songs').doc('' + album.id).set({songs: songs, album: album}).then(() => {console.log('Album "' + album.album_title + '" have been fetched')});;
        });
    });
};

