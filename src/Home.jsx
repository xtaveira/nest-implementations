import React from 'react'
import './style.css'

//importando imagens assets
import favicon from './assets/favicon.ico'
import briefcase from './assets/briefcase.svg'
import folder from './assets/folder.svg'
import gitbranch from './assets/git-branch.svg'
import github from './assets/github.svg'
import globe from './assets/globe.svg'
import instagram from './assets/instagram.svg'
import linkedin from './assets/linkedin.svg'
import mail from './assets/mail.svg'
import mappin from './assets/map-pin.svg'
import star from './assets/star.svg'
import twitter from './assets/twitter.svg'
import perfil from './assets/davi.jpeg'

export function Home () {
    return (
        <div>
            <header>
                <div className="box profile">
                    <img src={perfil} alt="perfil image" />
                    <h1>Davi Taveira</h1>
                    <p>Full Stack Developer</p>
                </div>
                <div className="box info">
                    <p><img src={mappin} alt="" /><a href='https://www.google.com/maps/place/Maringá+-+Floriano,+Maringá+-+PR/data=!4m2!3m1!1s0x94ecd6ee42618c1f:0xc356592828e03925?sa=X&ved=2ahUKEwj3mqbFqLH8AhU3qpUCHTM7Br0Q8gF6BAhcEAE'>Brasil, Maringá Paraná</a></p>
                    <p><img src={github} alt="" /><a href='https://github.com/xtaveira'>xtaveira</a></p>
                    <p><img src={linkedin} alt="" /><a href="https://www.linkedin.com/in/davi-taveira-167341227/">Davi Taveira</a></p>
                    <p><img src={instagram} alt="" /><a href="https://www.instagram.com/xtaveira">@xtaveira</a></p>
                    <p><img src={mail} alt="" /><span>taveirx@gmail.com</span></p>
                    <p><img src={globe} alt="" /><a href="https://www.davitaveira.com">davitaveira.com</a></p>
                    <p><img src={briefcase} alt="" /><a href='https://instagram.com/unimissional'>UniMissional</a></p>


                </div>
                <div className="box technologies">
                    <h1>Technologies</h1>
                    
                </div>
            </header>
            <main>
                <section>
                    <div className='box title'>
                        <h1>My Projects</h1>
                    </div>
                    <div className="myProject">
                        <div className="single-project box box-project"></div>
                        <div className="single-project box box-project"></div>
                    </div>
                </section>
                <section>
                    <div className='box title'>
                        <h1>Recent Posts</h1>
                    </div>
                    <div className='box project'>
                        
                    </div>
                </section>
            </main>

        </div>

    )
}