import React, { Component } from 'react';
import {Button} from "reactstrap";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import LocalizedStrings from 'react-localization';
import './languageButton.css';
import {fetchAlbums, fetchAllAlbums} from "../../actions/albums";
import {fetchAllArtists, fetchAllGroupArtists} from "../../actions/artists";
import {fetchTopConcerts} from "../../actions/concerts";
import {fetchGroups} from "../../actions/groups";
import {
    fetchAllNews, fetchAllProjects, fetchMainNews, fetchMainProjects, fetchNewRelease, fetchNews,
    fetchProjects
} from "../../actions/news";
import {fetchAllVideos, fetchMainVideos} from "../../actions/videos";

class LanguageButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            languages: [{code:'ru', short:'РУС'}, {code:'kz', short:'ҚАЗ'}, {code:'en', short:'ENG'}]
        };

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleOpen = this.toggleOpen.bind(this);
        this.closeButton = this.closeButton.bind(this);
    }


    toggleOpen() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    closeButton() {
        this.setState({
           isOpen: false
        });
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeButton();
        }
    }

    render() {
        const strings = new LocalizedStrings({
            ru: {
                refresh:'Обновить данные',
            },
            kz: {
                refresh:'Деректерді жаңарту',
            },
            en:{
                refresh:'Update data',
            }
        });
        strings.setLanguage(this.props.lang);
        const getButtons = () => {
            const mainLang = this.state.languages.find(lang => lang.code === this.props.lang);
            let i = 0;
            let r = [<Button key={i} className="round-button round-button-red" onClick={() => {this.props.setLanguage(mainLang.code)}}>{mainLang.short}</Button>];
            this.state.languages.map((lang) => {
                if (lang === mainLang) return;
                i++;
                r.push(
                    <Button key={i} className="round-button round-button-red unselected" onClick={() => {this.props.setLanguage(lang.code)}}>{lang.short}</Button>
                )
            });
            return r;
        };

        return (

            <div className={'language-button ml-auto mr-4 my-3 ' + (this.state.isOpen ? 'opened' : '')} ref={(node) => {this.wrapperRef = node}}>
                {getButtons()}
                <button className="btn btn-light position-absolute"
                        onClick={this.props.uploadData}
                        style={{right: '100%', marginRight: '20px'}}>{strings.refresh}</button>
            </div>
        )
    }
}

export default withRouter(connect(
    state => ({
        lang: state.languages
    }),
    dispatch => ({
        setLanguage: (lang) => {
            dispatch({type: 'SET_LANGUAGE', payload: lang});
        },
        uploadData: () => {
            fetchAlbums();
            fetchAllAlbums();
            fetchMainVideos();
            fetchAllVideos();
            fetchNewRelease();
            ['ru', 'en', 'kz'].map(lang => {
                fetchAllGroupArtists(lang);
                fetchAllArtists(lang);
                fetchTopConcerts(lang);
                fetchGroups(lang);
                fetchMainNews(lang);
                fetchNews(lang);
                fetchAllNews(lang);
                fetchMainProjects(lang);
                fetchProjects(lang);
                fetchAllProjects(lang);
            });
        },
    })
)(LanguageButton))