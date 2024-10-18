import { useEffect, useRef, useMemo } from "react";
import { NavLink } from 'react-router-dom';
import photoProphile from '../assets/Photo-profil.jfif'

function Header() {
    const urlActuelle = window.location.href;
    const addresseRacine = urlActuelle.split("/")[2];
    function AddClassActive() {
        const menu = document.querySelector('nav');
        menu.classList.toggle('active');
        document.addEventListener('click', (e) => {
            let isClickedInside = document.querySelector('.menu-hamburger').contains(e.target);
            if (!isClickedInside) {
                menu.classList.remove('active');
            }
        });
    }

    const containerRef = useRef(null);
    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: "0px",
            threshold: .1
        };
    }, [])
     
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0.1) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }
    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, options);
        let contain = containerRef.current
        if (containerRef.current) {
            observer.observe(contain)
        }
        return () => {
            observer.unobserve(contain)
        }
    }, [containerRef, options])

    return (
        <header ref={containerRef}>
            <div className='photo-et-nom'>
                <img src={photoProphile} alt="profil" />
                <p>MAHMOUDOU ABDOUL NGANIYYOU</p>
            </div>
            <nav>
                <NavLink onClick={AddClassActive} className='navigation' to="/">HOME</NavLink>
                <a onClick={AddClassActive}  className='navigation' href={`http://${addresseRacine}/#about`}>ABOUT</a>
                <a onClick={AddClassActive}  className='navigation' href={`http://${addresseRacine}/#skills`}>SKILLS</a>
                <a onClick={AddClassActive}  className='navigation' href={`http://${addresseRacine}/#projects`}>PROJECTS</a>
                <a onClick={AddClassActive}  className='navigation' href={`http://${addresseRacine}/#contact`}>CONTACT</a>
            </nav>
            <div onClick={AddClassActive} className='menu-hamburger'>
                    <i className="fa-solid fa-bars"></i>
            </div>
        </header>
    )
};

export default Header;