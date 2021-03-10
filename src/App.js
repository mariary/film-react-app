import React, {useEffect, useState} from "react";
import './App.css';
import Film from "./Film/Film";


function App() {

    const key = 'b5a84e1c00edd992be2834f3fbe99ff2';

    const [films, setFilms] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('LOl');

    const link = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${query}&language=ru`;

    useEffect(() => {
        getFilm();
    }, [query])

    const getFilm = async () => {
        const response = await fetch(link);
        const data = await response.json();
        setFilms(data.results)
    }

    const updateSearch = e => {
        setSearch(e.target.value)
    }

    const getSearch = e => {
        e.preventDefault();
        if (search !== ''){
            setQuery(search)
            setSearch('')
        }
    }

    return (
        <div className="App">
            <form onSubmit={getSearch} className='form'>
                <input type="text" className='search' value={search} onChange={updateSearch}/>
                <button type='submit' className='search_btn'>
                </button>
            </form>
            <div className="list">
                {films.map((film) => {
                    if (film.poster_path != null && film.overview.length > 0) {
                        return (
                            <Film
                                key={film.id}
                                film={film}
                            />
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default App;
