import React, { useState, useEffect } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { ImQuotesRight } from "react-icons/im"
import { FaFacebookSquare } from "react-icons/fa"
import { connect } from 'react-redux';
import {
    getCompanyListHomeAction,

} from '../../../../redux/actions';
import Moment from 'react-moment';
import moment from 'moment'

function Slider (props ){
    const {
        getCompanyListHome,
        pagination,
        companyList,
    }= props
    const [current, setCurrent] = useState(0);

    useEffect( async() => {
        getCompanyListHome(pagination);
    }, [])

    
    const length = companyList.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    return (
        <div className="slider">

            <BsArrowLeft className='left-arrow' onClick={prevSlide} />
            <BsArrowRight className='right-arrow' onClick={nextSlide} />
            {companyList.map((slide, index) => {
                return (

                    <div
                        className={index === current ? 'slide active' : 'slide'}
                        key={slide.key}
                    >
                        {index === current && (

                            <div className="list">
                                <div className="infor">
                                    <div className="infor__text">
                                        <div className="infor__text--name">
                                            <h4>{slide.name}</h4>
                                        </div>
                                        <div className="quocte">
                                            <ImQuotesRight className="quocteIcon" />
                                        </div>
                                    </div>
                                    <div className="content">
                                    <p>Đia chỉ: {slide.address}</p>
                                    <p>Email: {slide.email}</p>
                                    <p>Phone: {slide.phone}</p>
                                    </div>
                                    <div className="bottom">
                                        <FaFacebookSquare />
                                        <div className="datime">
                                        <Moment date={moment(slide.startDay)}  format="DD/MM/YYYY"/>
                                        </div>
                                    </div>
                                </div>
                                <img src={slide.logo} alt="img" className="images" />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    const { companyList, pagination } = state.homeReducer;
    return {
        companyList: companyList,
        pagination: pagination,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCompanyListHome: (params) => dispatch(getCompanyListHomeAction(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
