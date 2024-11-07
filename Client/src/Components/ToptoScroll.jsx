import React, { useState, useEffect } from 'react';
import { IoIosArrowDropup } from "react-icons/io";
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

   
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

  
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="text-black text-center text-[50px] drop-shadow-xl rounded-xl w-9 fixed right-10 bottom-10 z-10">
            {isVisible && (
                <button onClick={scrollToTop}>
                   <IoIosArrowDropup/>
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
