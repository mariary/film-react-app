import React from "react";
import styles from './Modal.module.css';
import './modal.css'

const Modal = (props) => {
    let genres = [];
    let production_companies = [];
    let tagline;
    let production_countries = [];
    console.log(props.info_en);
    if (props.info_en.genres !== undefined) {
        genres = props.info_en.genres;
        production_companies = props.info_en.production_companies;
        production_countries = props.info_en.production_countries;
        tagline = props.info_en.tagline;
    }

    return (
        <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div className='modal_content' onClick={e => e.stopPropagation()}>
                <div className={styles.info_wrapper}>
                    <img src={"https://image.tmdb.org/t/p/w400/" + props.info_en.poster_path} className={styles.img}
                         alt=""/>
                    <div className={styles.info}>
                        <h1 className={styles.title}>{props.info_ru.title}</h1>
                        <h1 className={styles.orig_title}>{props.info_en.original_title}</h1>
                        <div className={styles.tagline}>
                            {tagline}
                        </div>
                        <p className={styles.date}><span>Дата выпуска:</span>{props.date}</p>
                        <p className={styles.production_countries}>
                            <span>Страна:  </span>
                            {production_countries.map((country) => {
                                return (
                                    <div key={country.name}  className={styles.item}>
                                        {country.name}
                                    </div>
                                )
                            })}
                        </p>
                        <p className={styles.genres}>
                            <span>Жанр: </span>
                            {genres.map((genre) => {
                                return (
                                    <div key={genre.id} className={styles.item}>
                                        {genre.name}
                                    </div>
                                )
                            })}
                        </p>
                        <p>
                            <span>Продолжительность:</span>
                            {props.info_en.runtime + 'min'}
                        </p>
                        <p className={styles.vote}><span>Рейтинг:</span>{props.info_ru.vote_average}</p>
                        <p className={styles.count}><span>Число голосов:</span>{props.info_ru.vote_count}</p>
                        <span>Компании: </span>
                        <p className={styles.production_companies}>
                            {production_companies.map((company) => {
                                return (
                                    <div key={company.id} className={[styles.item, styles.company].join(' ')}>
                                        {company.name}
                                    </div>
                                )
                            })}
                        </p>
                    </div>
                </div>
                <span>Описание: </span>
                <p className={styles.overview}>{props.info_ru.overview}</p>
                <a href={"https://www.imdb.com/title/" + props.info_en.imdb_id + "/"} className={styles.imdb}>Open in imdb</a>
            </div>
        </div>
    )
}
//
export default Modal