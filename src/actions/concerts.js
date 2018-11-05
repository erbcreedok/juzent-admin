import { fl, fs } from '../static/firebase-data';

export const getTopConcerts = (lang) => dispatch => {
    dispatch({ type: 'FETCH_CONCERTS', payload: 'LOADING' });
    fl.content.get('concerts', {
        orderByChild: 'order',
        fields:[
            'id',
            'concert_title_' + lang,
            'concert_time',
            'concert_artist',
            'concert_location_' + lang,
            'concert_image',
            'concert_min_cost',
            'concert_max_cost',
            'concert_sale_link',
            'order',
            'published',
            'concert_image_bckp'
        ],
        populate: [
            'concert_image',
            {field: 'concert_artist', fields: ['group_id', 'group_name']}]
    }).then(snapshot => {
        let concerts = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let concert = snapshot[key];
            if(!concert.published) return;
            concert.concert_title = concert['concert_title_' + lang];
            concert.concert_location = concert['concert_location_' + lang];
            if (concert.concert_image[0].url) {
                concert.concert_image = concert.concert_image[0].url;
            } else  {
                concert.concert_image = concert.concert_image_bckp;
            }
            concert.item = 'bilet';
            concerts.push(concert)
        });
        concerts.map((concert) => {
            const timeZoneOffset = new Date(0).getHours() - new Date(0).getUTCHours();
            concert.concert_time = new Date(new Date(concert.concert_time + 'Z') - (timeZoneOffset * 3600000));
        });
        dispatch({type: 'FETCH_CONCERTS', payload: concerts});
    });
};

export const fetchTopConcerts = (lang) => {
    fl.content.get('concerts', {
        orderByChild: 'order',
        fields:[
            'id',
            'concert_title_' + lang,
            'concert_time',
            'concert_artist',
            'concert_location_' + lang,
            'concert_image',
            'concert_min_cost',
            'concert_max_cost',
            'concert_sale_link',
            'order',
            'published',
            'concert_image_bckp'
        ],
        populate: [
            'concert_image',
            {field: 'concert_artist', fields: ['group_id', 'group_name']}]
    }).then(snapshot => {
        let concerts = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let concert = snapshot[key];
            if(!concert.published) return;
            concert.concert_title = concert['concert_title_' + lang];
            concert.concert_location = concert['concert_location_' + lang];
            if (concert.concert_image[0].url) {
                concert.concert_image = concert.concert_image[0].url;
            } else  {
                concert.concert_image = concert.concert_image_bckp;
            }
            concert.item = 'bilet';
            concerts.push(concert)
        });
        fs.collection('concerts').doc(lang).set({concerts: concerts}).then(() => {console.log('Concerts have been fetched in ' + lang)});;
    });
};