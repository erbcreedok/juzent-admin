import { fl, fs } from '../static/firebase-data';


export const getMainNews = (lang) => dispatch => {
    dispatch({ type: 'FETCH_NEWS', payload: 'LOADING' });
    fl.content.get('mainNews', {
        populate: [
            {
                field: 'first_article',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'second_article',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'third_article',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
        ]
    }).then((snapshot) => {
        if(!snapshot) {
            dispatch({type: 'FETCH_NEWS', payload: snapshot});
            return;
        }
        let articles = [];
        if (snapshot['first_article'] && snapshot['first_article'][0]) {
            articles.push(snapshot['first_article'][0]);
        }
        if (snapshot['second_article'] && snapshot['second_article'][0]) {
            articles.push(snapshot['second_article'][0]);
        }
        if (snapshot['third_article'] && snapshot['third_article'][0]) {
            articles.push(snapshot['third_article'][0]);
        }
        articles.map((article) => {
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            } else {
                article.article_image = '';
            }
        });
        dispatch({type: 'FETCH_NEWS', payload: articles});
    });
};

export const getAllNews = (lang) => dispatch => {
    dispatch({ type: 'FETCH_NEWS', payload: 'LOADING' });
    fl.content.get('news', {
        orderByChild: 'order',
        fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
        populate: ['article_image'],
    }).then((snapshot) => {
        if(!snapshot) {
            dispatch({type: 'FETCH_NEWS', payload: snapshot});
            return;
        }
        let articles = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let article = snapshot[key];
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            }else {
                article.article_image = '';
            }
            articles.push(article)
        });
        dispatch({type: 'FETCH_NEWS', payload: articles});
    })
};

export const getNewsArticle = (id, lang) => dispatch => {
    dispatch({type: 'FETCH_ARTICLE', payload: 'LOADING'});
    fl.content.get('news', id, {
        fields: [
            'id',
            'article_heading_' + lang,
            'article_subheading_' + lang,
            'article_body_' + lang,
            'article_created',
            'published',
            'article_image',
            'article_header_image',
            'article_image_bckp',
            'article_header_image_bckp'],
        populate: ['article_image', 'article_header_image']
    }).then((snapshot) => {
        if (!snapshot) {
            dispatch({type: 'FETCH_ARTICLE', payload: snapshot});
            return;
        }
        let article = snapshot;
        article.article_heading = article['article_heading_' + lang ];
        article.article_subheading = article['article_subheading_' + lang ];
        article.article_body = article['article_body_' + lang ];

        delete article['article_heading_' + lang ];
        delete article['article_subheading_' + lang ];
        delete article['article_body_' + lang ];

        if (article.article_image && article.article_image[0].url) {
            article.article_image = article.article_image[0].url.replace('(','%28').replace(')','%29');
        } else {
            article.article_image = '';
        }
        if (article.article_header_image && article.article_header_image[0].url) {
            article.article_header_image = article.article_header_image[0].url.replace('(','%28').replace(')','%29');
        } else {
            article.article_header_image = '';
        }
        article.article_created = new Date(article.article_created);
        dispatch({type: 'FETCH_ARTICLE', payload: article});
    });
};

export const getMainProjects = (lang) => dispatch => {
    dispatch({ type: 'FETCH_PROJECTS', payload: 'LOADING' });
    fl.content.get('main_projects', {
        populate: [
            {
                field: 'first_project',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'second_project',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'third_project',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
        ]
    }).then((snapshot) => {
        if(!snapshot) {
            dispatch({type: 'FETCH_PROJECTS', payload: snapshot});
            return;
        }
        let articles = [];
        if (snapshot['first_project'] && snapshot['first_project'][0]) {
            articles.push(snapshot['first_project'][0]);
        }
        if (snapshot['second_project'] && snapshot['second_project'][0]) {
            articles.push(snapshot['second_project'][0]);
        }
        if (snapshot['third_project'] && snapshot['third_project'][0]) {
            articles.push(snapshot['third_project'][0]);
        }
        articles.map((article) => {
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            }else {
                article.article_image = '';
            }
        });
        dispatch({type: 'FETCH_PROJECTS', payload: articles});
    });
};

export const getAllProjects = (lang) => dispatch => {
    dispatch({ type: 'FETCH_PROJECTS', payload: 'LOADING' });
    fl.content.get('projects', {
        orderByChild: 'order',
        fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
        populate: ['article_image'],
    }).then((snapshot) => {
        if(!snapshot) {
            dispatch({type: 'FETCH_PROJECTS', payload: snapshot});
            return;
        }
        let articles = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let article = snapshot[key];
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            }else {
                article.article_image = '';
            }
            articles.push(article)
        });
        dispatch({type: 'FETCH_PROJECTS', payload: articles});
    })
};

export const getProjectArticle = (id, lang) => dispatch => {
    dispatch({type: 'FETCH_ARTICLE', payload: 'LOADING'});
    fl.content.get('projects', id, {
        fields: [
            'id',
            'article_heading_' + lang,
            'article_subheading_' + lang,
            'article_body_' + lang,
            'article_created',
            'published',
            'article_image',
            'article_header_image',
            'article_image_bckp',
            'article_header_image_bckp'],
        populate: ['article_image', 'article_header_image']
    }).then((snapshot) => {
        if (!snapshot) {
            dispatch({type: 'FETCH_ARTICLE', payload: snapshot});
            return;
        }
        let article = snapshot;
        article.article_heading = article['article_heading_' + lang ];
        article.article_subheading = article['article_subheading_' + lang ];
        article.article_body = article['article_body_' + lang ];

        delete article['article_heading_' + lang ];
        delete article['article_subheading_' + lang ];
        delete article['article_body_' + lang ];

        if (article.article_image && article.article_image[0].url) {
            article.article_image = article.article_image[0].url.replace('(','%28').replace(')','%29');
        } else {
            article.article_image = '';
        }
        if (article.article_header_image && article.article_header_image[0].url) {
            article.article_header_image = article.article_header_image[0].url.replace('(','%28').replace(')','%29');
        } else {
            article.article_header_image = '';
        }
        article.article_created = new Date(article.article_created);
        dispatch({type: 'FETCH_ARTICLE', payload: article});
    });
};

export const getNewRelease = () => dispatch => {
    dispatch({ type: 'FETCH_RELEASE', payload: 'LOADING' });
    fl.content.get('new_releases', {
        fields: ['release_image', 'release_cover', 'release_title', 'release_artist', 'release_date', 'label', 'genre', 'album_link'],
        populate: ['release_image', 'release_cover']
    }).then((snapshot) => {
        if(!snapshot) {
            dispatch({type: 'FETCH_RELEASE', payload: snapshot});
            return;
        }
        let release = snapshot;
        if (release.release_image && release.release_image[0].url) {
            release.release_image = release.release_image[0].url.replace('(','%28').replace(')','%29');
        } else {
            release.release_image = '';
        }
        if (release.release_cover && release.release_cover[0].url) {
            release.release_cover = release.release_cover[0].url.replace('(','%28').replace(')','%29');
        } else {
            release.release_cover = '';
        }
        release.release_date = new Date(release.release_date);
        dispatch({type: 'FETCH_RELEASE', payload: release});
    });
};

export const fetchMainNews = (lang) => {
    fl.content.get('mainNews', {
        populate: [
            {
                field: 'first_article',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'second_article',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'third_article',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
        ]
    }).then((snapshot) => {
        if(!snapshot) {
            return;
        }
        let articles = [];
        if (snapshot['first_article'] && snapshot['first_article'][0]) {
            articles.push(snapshot['first_article'][0]);
        }
        if (snapshot['second_article'] && snapshot['second_article'][0]) {
            articles.push(snapshot['second_article'][0]);
        }
        if (snapshot['third_article'] && snapshot['third_article'][0]) {
            articles.push(snapshot['third_article'][0]);
        }
        articles.map((article) => {
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            }else {
                article.article_image = '';
            }
        });
        fs.collection('mainNews').doc(lang).set({articles:articles}).then(() => {console.log('Main news have been fetched in ' + lang)});
    });
};

export const fetchNews = (lang) => {
    fl.content.get('news', {
        orderByChild: 'order',
        fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
        populate: ['article_image'],
    }).then((snapshot) => {
        if(!snapshot) {
            return;
        }
        let articles = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let article = snapshot[key];
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            }else {
                article.article_image = '';
            }
            articles.push(article)
        });
        fs.collection('news').doc(lang).set({articles:articles}).then(() => {console.log('All news have been fetched in ' + lang)});
    })
};

export const fetchAllNews = (lang) => {
    fl.content.get('news', {
        fields: [
            'id',
            'order',
            'article_heading_' + lang,
            'article_subheading_' + lang,
            'article_body_' + lang,
            'article_created',
            'published',
            'article_image',
            'article_header_image',
            'article_image_bckp',
            'article_header_image_bckp'],
        populate: ['article_image', 'article_header_image']
    }).then((snapshot) => {
        if (!snapshot) {
            return;
        }
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let article = snapshot[key];
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];
            article.article_body = article['article_body_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];
            delete article['article_body_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url.replace('(','%28').replace(')','%29');
            } else {
                article.article_image = '';
            }
            if (article.article_header_image && article.article_header_image[0].url) {
                article.article_header_image = article.article_header_image[0].url.replace('(','%28').replace(')','%29');
            } else {
                article.article_header_image = '';
            }
            article.article_created = new Date(article.article_created).toUTCString();
            fs.collection('articles').doc('' + article.id).collection('locale').doc(lang).set(article).then(() => {console.log('News articles "' + article.article_heading + '"have been fetched in ' + lang)});
        });
    });
};

export const fetchMainProjects = (lang) => {
    fl.content.get('main_projects', {
        populate: [
            {
                field: 'first_project',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'second_project',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
            {
                field: 'third_project',
                fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
                populate: ['article_image'],
            },
        ]
    }).then((snapshot) => {
        if(!snapshot) {
            return;
        }
        let articles = [];
        if (snapshot['first_project'] && snapshot['first_project'][0]) {
            articles.push(snapshot['first_project'][0]);
        }
        if (snapshot['second_project'] && snapshot['second_project'][0]) {
            articles.push(snapshot['second_project'][0]);
        }
        if (snapshot['third_project'] && snapshot['third_project'][0]) {
            articles.push(snapshot['third_project'][0]);
        }
        articles.map((article) => {
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            } else {
                article.article_image = ''
            }
        });
        fs.collection('mainProjects').doc(lang).set({articles:articles}).then(() => {console.log('Main projects have been fetched in ' + lang)});
    });
};

export const fetchProjects = (lang) => {
    fl.content.get('projects', {
        orderByChild: 'order',
        fields: ['id', 'article_image', 'article_heading_' + lang, 'article_subheading_' + lang, 'article_created', 'published', 'order', 'article_image_bckp'],
        populate: ['article_image'],
    }).then((snapshot) => {
        if(!snapshot) {
            return;
        }
        let articles = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let article = snapshot[key];
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url;
            } else {
                article.article_image = ''
            }
            articles.push(article)
        });
        fs.collection('projects').doc(lang).set({articles:articles}).then(() => {console.log('All projects have been fetched in ' + lang)});
    })
};

export const fetchAllProjects = (lang) => {
    fl.content.get('projects', {
        fields: [
            'id',
            'order',
            'article_heading_' + lang,
            'article_subheading_' + lang,
            'article_body_' + lang,
            'article_created',
            'published',
            'article_image',
            'article_header_image',
            'article_image_bckp',
            'article_header_image_bckp'],
        populate: ['article_image', 'article_header_image']
    }).then((snapshot) => {
        if (!snapshot) {
            return;
        }
        let articles = [];
        Object.keys(snapshot).sort((a,b) => snapshot[a].order - snapshot[b].order).map((key) => {
            let article = snapshot[key];
            article.article_heading = article['article_heading_' + lang ];
            article.article_subheading = article['article_subheading_' + lang ];
            article.article_body = article['article_body_' + lang ];

            delete article['article_heading_' + lang ];
            delete article['article_subheading_' + lang ];
            delete article['article_body_' + lang ];

            if (article.article_image && article.article_image[0].url) {
                article.article_image = article.article_image[0].url.replace('(','%28').replace(')','%29');;
            } else {
                article.article_image = ''
            }
            if (article.article_header_image && article.article_header_image[0].url) {
                article.article_header_image = article.article_header_image[0].url.replace('(','%28').replace(')','%29');
            } else {
                article.article_header_image = '';
            }
            article.article_created = new Date(article.article_created).toUTCString();
            fs.collection('articles').doc('' + article.id).collection('locale').doc(lang).set(article).then(() => {console.log('All project articles have been fetched in ' + lang)});
            article.article_created = new Date(article.article_created);
            articles.push(article)
        });
    });
};

export const fetchNewRelease = () => {
    fl.content.get('new_releases', {
        fields: ['release_image', 'release_cover', 'release_title', 'release_artist', 'release_date', 'label', 'genre', 'album', 'album_link'],
        populate: ['release_image', 'release_cover']
    }).then((snapshot) => {
        if(!snapshot) {
            return;
        }
        let release = snapshot;
        if (release.release_image && release.release_image[0].url) {
            release.release_image = release.release_image[0].url.replace('(','%28').replace(')','%29');
        } else {
            release.release_image = '';
        }
        if (release.release_cover && release.release_cover[0].url) {
            release.release_cover = release.release_cover[0].url.replace('(','%28').replace(')','%29');
        } else {
            release.release_cover = '';
        }
        fs.collection('release').doc('release').set(release).then(() => {console.log('New release been fetched')});
    });
};