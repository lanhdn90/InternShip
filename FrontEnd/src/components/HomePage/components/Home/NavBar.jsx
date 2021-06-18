import React, { useEffect } from "react";
import { gsap, TweenMax } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function NavBar() {
    useEffect(() => {
        TweenMax.from(".navbars", 1.6, {
            opacity: 0,
            y: -50,
            ease: "Expo.easeInOut",
            delay: 0.6,
        })
    })
    const toggleHamberger = () => {
        let btnmenu = document.querySelector(".hamberger");
        let nav = document.querySelector(".nav");
        btnmenu.classList.toggle('active');
        nav.classList.toggle('active');
    }

    return (
        <>
            <header className="navbars">
                <div className="site-info" onClick={() => toggleHamberger()}>
                    <div className="hamberger ">
                        <span></span>
                    </div>
                    <div className="text-hamberger">Menu</div>
                </div>
                <div className="site-menu">
                    <div className="menu-item"><a href="/login">Đăng Nhập</a></div>
                </div>

            </header>
            <nav className="nav">
                <ul>
                    <li className="active"><a href="/#">Trang Chủ</a></li>
                    <li><a href="/#company">Công ty</a></li>
                    <li><a href="/#course">Tuyển dụng</a></li>
                </ul>
            </nav>
        </>
    );
}

export default NavBar;
