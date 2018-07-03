import { fs, fl } from '../static/firebase-data';

export const getGroups = (lang) => dispatch => {
    fl.content.get('groupSchema', {fields:[
        'group_avatar',
        'group_description_' + lang,
        'group_name_' + lang,
        'id'
    ], populate: [
        'group_avatar'
    ]})
        .then( groupsSnap => {
            let groups = [];
            Object.keys(groupsSnap).map((key) => {
                const group = groupsSnap[key];
                group.group_id = key;

                group.group_avatar = group.group_avatar[0].url;
                group.group_name = group['group_name_' + lang];
                group.group_description = group['group_description_' + lang];
                groups.push(group)
            });
            dispatch({ type: 'FETCH_GROUPS', payload: groups });
        });
};

export const fetchGroups = (lang) => {
    fl.content.get('groupSchema', {fields:[
        'group_avatar',
        'group_description_' + lang,
        'group_name_' + lang,
        'id'
    ], populate: [
        'group_avatar'
    ]})
        .then( groupsSnap => {
            let groups = [];
            Object.keys(groupsSnap).map((key) => {
                const group = groupsSnap[key];
                group.group_id = key;

                group.group_avatar = group.group_avatar[0].url;
                group.group_name = group['group_name_' + lang];
                group.group_description = group['group_description_' + lang];
                groups.push(group)
            });
            fs.collection('groups').doc(lang).set({groups: groups}).then(() => {console.log('Groups have been fetched in ' + lang)});
        });
};