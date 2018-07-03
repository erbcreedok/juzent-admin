import { fl, fs } from '../static/firebase-data';

export const getArtists = (id, lang) => dispatch => {
    dispatch({ type: 'FETCH_ARTISTS_GROUP', payload: 'LOADING' });
    dispatch({ type: 'FETCH_ARTISTS_ARTISTS', payload: 'LOADING' });
    fl.content.get('groupSchema', id, {
        fields:[
            'group_description_' + lang,
            'group_name_' + lang,
            'group_artists',
            'id',
        ],
        populate: [
            {
                field: 'group_artists',
                fields: [ 'id', 'artist_name_' + lang, 'artist_short_description_' + lang, 'artist_gray_avatar', 'artist_avatar_gray_bckp' ],
                populate: [ 'artist_gray_avatar' ]
            }
        ]
    }).then(groupSnap => {
        if (!groupSnap.id) {
            dispatch({ type: 'FETCH_ARTISTS_GROUP', payload: undefined });
            dispatch({ type: 'FETCH_ARTISTS_ARTISTS', payload: undefined });
            return;
        }
        let group = groupSnap;
        let artists = [];
        group.group_id = groupSnap.id;
        group.group_name = group['group_name_' + lang] ? group['group_name_' + lang] : '';
        group.group_description = group['group_description_' + lang] ? group['group_description_' + lang] : '';

        delete group['group_name_' + lang];
        delete group['group_description_' + lang];

        group.artists = [];
        if (group.group_artists) {
            group.group_artists.map((artist) => {
                group.artists.push(artist.id);
                artist.artist_id = '' + artist.id;
                artist.artist_name = artist['artist_name_' + lang];
                artist.artist_short_description = artist['artist_short_description_' + lang];

                delete artist['artist_name_' + lang];
                delete artist['artist_short_description_' + lang];

                if (artist.artist_gray_avatar && artist.artist_gray_avatar.length > 0 && artist.artist_gray_avatar[0].url) {
                    artist.artist_gray_avatar = artist.artist_gray_avatar[0].url.replace('(','%28').replace(')','%29');
                } else if (artist.artist_avatar_gray_bckp) {
                    artist.artist_gray_avatar = artist.artist_avatar_gray_bckp.replace('(','%28').replace(')','%29');
                }
                artists.push(artist);
            });
        } else {
            artists = undefined;
        }
        delete group.group_artists;
        dispatch({ type: 'FETCH_ARTISTS_GROUP', payload: group });
        dispatch({ type: 'FETCH_ARTISTS_ARTISTS', payload: artists});
    });
};

export const getArtist = (id, lang) => dispatch => {
    if (!id) return;
    dispatch({ type: 'FETCH_ARTISTS_ARTIST', payload: 'LOADING' });
    fl.content.get('artistSchema', id, {
        fields:[
            'id',
            'artist_name_'+lang,
            'artist_images',
            'artist_avatar',
            'artist_socials',
            'artist_short_description_'+lang,
            'artist_biography_'+lang,
            'artist_avatar_bckp',
            'artist_images_bckp',
        ],
        populate: ['artist_images', 'artist_avatar']
    }).then(artistSnap => {
        if (!artistSnap.id) {
            dispatch({ type: 'FETCH_ARTISTS_ARTIST', payload: undefined });
            return;
        }
        let artist = artistSnap;
        artist.artist_id = '' + artist.id;
        if (artist.artist_avatar && artist.artist_avatar[0] && artist.artist_avatar[0].url) {
            artist.artist_avatar = artist.artist_avatar[0].url.replace('(','%28').replace(')','%29');
        }
        artist.artist_name = artist['artist_name_' + lang];
        artist.artist_short_description = artist['artist_short_description_' + lang];
        artist.artist_biography = artist['artist_biography_' + lang];

        delete artist['artist_name_' + lang];
        delete artist['artist_short_description_' + lang];
        delete artist['artist_biography_' + lang];

        if (artist.artist_images && artist.artist_images.length > 0 && artist.artist_images[0].url) {
            artist.artist_images.map((image, index) => {artist.artist_images[index] = image.url.replace('(','%28').replace(')','%29')})
        } else if (artist.artist_images_bckp && artist.artist_images_bckp.length > 0 && artist.artist_images_bckp[0].image){
            artist.artist_images_bckp.map((image, index) => {
                artist.artist_images_bckp[index] = image.image.replace('(','%28').replace(')','%29');
            });
            artist.artist_images = artist.artist_images_bckp.replace('(','%28').replace(')','%29');
        }
        dispatch({ type: 'FETCH_ARTISTS_ARTIST', payload: artist });
    });
};

export const fetchAllGroupArtists = (lang) => {
    fl.content.get('groupSchema', {
        fields:[
            'group_description_' + lang,
            'group_name_' + lang,
            'group_artists',
            'id',
        ],
        populate: [
            {
                field: 'group_artists',
                fields: [ 'id', 'artist_name_' + lang, 'artist_short_description_' + lang, 'artist_gray_avatar', 'artist_avatar_gray_bckp' ],
                populate: [ 'artist_gray_avatar' ]
            }
        ]
    }).then(snapshot => {
        if (!snapshot) {
            return;
        }
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let group = snapshot[key];
            let artists = [];
            group.group_id = group.id;
            group.group_name = group['group_name_' + lang] ? group['group_name_' + lang] : '';
            group.group_description = group['group_description_' + lang] ? group['group_description_' + lang] : '';

            delete group['group_name_' + lang ];
            delete group['group_description_' + lang ];

            group.artists = [];
            if (group.group_artists) {
                group.group_artists.map((artist) => {
                    group.artists.push(artist.id);
                    artist.artist_id = '' + artist.id;
                    artist.artist_name = artist['artist_name_' + lang];
                    artist.artist_short_description = artist['artist_short_description_' + lang];

                    delete artist['artist_name_' + lang];
                    delete artist['artist_short_description_' + lang];

                    if (artist.artist_gray_avatar && artist.artist_gray_avatar.length > 0 && artist.artist_gray_avatar[0].url) {
                        artist.artist_gray_avatar = artist.artist_gray_avatar[0].url.replace('(','%28').replace(')','%29');
                    } else if (artist.artist_avatar_gray_bckp) {
                        artist.artist_gray_avatar = artist.artist_avatar_gray_bckp.replace('(','%28').replace(')','%29');
                    }
                    artists.push(artist);
                });
            } else {
                artists = [];
            }
            delete group.group_artists;
            fs.collection('group_artists').doc('' + group.id).collection('locale').doc(lang).set({group: group, artists: artists}).then(() => {console.log('Group ' + group.group_name + ' page have been fetched in ' + lang)});
        });
    });
};

export const fetchAllArtists = (lang) => {
    fl.content.get('artistSchema', {
        fields:[
            'id',
            'artist_name_'+lang,
            'artist_images',
            'artist_avatar',
            'artist_socials',
            'artist_short_description_'+lang,
            'artist_biography_'+lang,
            'artist_avatar_bckp',
            'artist_images_bckp',
        ],
        populate: ['artist_images', 'artist_avatar']
    }).then(snapshot => {
        if (!snapshot) {
            return;
        }
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let artist = snapshot[key];
            artist.artist_id = '' + artist.id;
            if (artist.artist_avatar && artist.artist_avatar[0] && artist.artist_avatar[0].url) {
                artist.artist_avatar = artist.artist_avatar[0].url.replace('(','%28').replace(')','%29');
            }
            artist.artist_name = artist['artist_name_' + lang];
            artist.artist_short_description = artist['artist_short_description_' + lang];
            artist.artist_biography = artist['artist_biography_' + lang];

            delete artist['artist_name_' + lang];
            delete artist['artist_short_description_' + lang];
            delete artist['artist_biography_' + lang];

            if (artist.artist_images && artist.artist_images.length > 0 && artist.artist_images[0].url) {
                artist.artist_images.map((image, index) => {artist.artist_images[index] = image.url.replace('(','%28').replace(')','%29')})
            } else if (artist.artist_images_bckp && artist.artist_images_bckp.length > 0 && artist.artist_images_bckp[0].image){
                artist.artist_images_bckp.map((image, index) => {
                    artist.artist_images_bckp[index] = image.image.replace('(','%28').replace(')','%29');
                });
                artist.artist_images = artist.artist_images_bckp.replace('(','%28').replace(')','%29');
            }
            fs.collection('artists').doc('' + artist.id).collection('locale').doc(lang).set(artist).then(() => {console.log('Artist ' + artist.artist_name + ' have been fetched in ' + lang)});
        });
    });
};