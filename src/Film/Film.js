import React, {useState, useEffect} from "react";
import styles from './File.module.css';
import '../App.css';
import Modal from "../Modal/Modal";

const Film = (props) => {

    const date = props.film.release_date.split('-').reverse().join('.');
    const text = props.film.overview.substr(0, 300) + '...';

    const [info, setInfo] = useState();
    const [modalActive, setModalActive] = useState(false)

    let infoall = {};

    if (info !== undefined) {
        infoall = info;
    }
    useEffect(() => {
        getResult();
    }, [])

    const getInfo = fetch(`https://api.themoviedb.org/3/movie/${props.film.id}?api_key=b5a84e1c00edd992be2834f3fbe99ff2`, {})
        .then((response) => response.json())
        .then((data) => {
            return data;
        })

    const getResult = async () => {
        const information = await getInfo;
        setInfo(information)
    }

    return (
        <div className={styles.item}>
            <a name={props.film.id}>
                <div className={styles.name_wrapper}>
                    <h1 className={styles.name}>{props.film.title}</h1>
                    <h3 className={styles.orig_name}>{props.film.original_title}</h3>
                </div>
            </a>
            <img className={styles.img} src={`https://image.tmdb.org/t/p/w400${props.film.poster_path}`} alt=""/>
            <div className={styles.about}>
                <p className={styles.date}><span>Дата выпуска: </span>{date}</p>
                <p className={styles.desc}><span>Описание: </span>{text}</p>
                <p className={styles.vote}><span>Рейтинг: </span>{props.film.vote_average}</p>
                <p className={styles.count}><span>Число голосов: </span>{props.film.vote_count}</p>
            </div>
            <a href={"https://www.imdb.com/title/" + infoall.imdb_id + "/"} className={styles.imdb}>Open in imdb</a>
            <a href={'#' + props.film.id}>
                <button className={styles.modal_btn} onClick={() => setModalActive(true)}>About</button>
            </a>
            <Modal
                key = {props.film.id}
                active={modalActive}
                setActive={setModalActive}
                info_en={infoall}
                info_ru={props.film}
                date={date}
            />
        </div>
    )
}

export default Film;