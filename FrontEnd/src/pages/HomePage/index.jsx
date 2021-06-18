import React from 'react';
import { Route } from "react-router-dom";
import NavBar from '../../components/HomePage/components/Home/NavBar'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { gsap } from "gsap";
function HomeLayout({ component: Component, ...props }) {
    const onEnter = node => {
        gsap.from(
            [node.children[0].firstElementChild, node.children[0].lastElementChild],
            0.6,
            {
                y: 30,
                delay: 0.6,
                ease: "power3.InOut",
                opacity: 0,
                stagger: {
                    amount: 0.6
                }
            }
        );
    };

    const onExit = node => {
        gsap.to(
            [node.children[0].firstElementChild, node.children[0].lastElementChild],
            0.6,
            {
                y: -30,
                ease: "power3.InOut",
                stagger: {
                    amount: 0.2
                }
            }
        );
    };
    return (
        <Route
            {...props}
            render={(routerProps) => (
                <TransitionGroup>
                    <CSSTransition
                        timeout={1200}
                        onExit={onExit}
                        onEntering={onEnter}
                        unmountOnExit>
                        <div className="homePage ">
                            <NavBar />
                            <Component {...routerProps} />
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    );
}

export default HomeLayout;