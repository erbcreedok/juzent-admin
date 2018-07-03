import { fl, fs } from '../static/firebase-data';

export const getMainVideos = () => dispatch => {
    dispatch({ type: 'FETCH_VIDEOS', payload: 'LOADING' });
    fl.content.get('videoclips', {
        orderByChild: 'order',
        limitToFirst: 3,
        fields: ['id', 'order', 'video_title', 'video_link', 'video_date'],
    }).then((snapshot) => {
        if(!snapshot) {
            dispatch({type: 'FETCH_VIDEOS', payload: snapshot});
            return;
        }
        let videos = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let video = snapshot[key];
            videos.push(video)
        });
        dispatch({type: 'FETCH_VIDEOS', payload: videos});
    })
};

export const getAllVideos = () => dispatch => {
    dispatch({ type: 'FETCH_VIDEOS', payload: 'LOADING' });
    fl.content.get('videoclips', {
        orderByChild: 'order',
        fields: ['id', 'order', 'video_title', 'video_link', 'video_date'],
    }).then((snapshot) => {
        if(!snapshot) {
            dispatch({type: 'FETCH_VIDEOS', payload: snapshot});
            return;
        }
        let videos = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let video = snapshot[key];
            videos.push(video)
        });
        dispatch({type: 'FETCH_VIDEOS', payload: videos});
    })
};

export const fetchMainVideos = () => {
    fl.content.get('videoclips', {
        orderByChild: 'order',
        limitToFirst: 3,
        fields: ['id', 'order', 'video_title', 'video_link', 'video_date'],
    }).then((snapshot) => {
        if(!snapshot) {
            return;
        }
        let videos = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let video = snapshot[key];
            videos.push(video)
        });
        fs.collection('videos').doc('top').set({videos:videos}).then(() => {console.log('Main videos have been fetched')});
    })
};

export const fetchAllVideos = () => {
    fl.content.get('videoclips', {
        orderByChild: 'order',
        fields: ['id', 'order', 'video_title', 'video_link', 'video_date'],
    }).then((snapshot) => {
        if(!snapshot) {
            return;
        }
        let videos = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let video = snapshot[key];
            videos.push(video)
        });
        fs.collection('videos').doc('videos').set({videos:videos}).then(() => {console.log('All videos have been fetched')});
    })
};
