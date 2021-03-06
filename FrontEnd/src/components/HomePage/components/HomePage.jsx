import React, { useEffect } from "react";
import { gsap, TweenMax } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../../../IMG/Video/Logo.png";
import FE from "../../../IMG/fe.jpg";
import avatar from "../../../IMG/avavar.png";
import Slider from "./Home/Slider";
import Acording from "./Home/Acording";
import Slidergallery from "./Home/Slidergallery";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import {
    getCourseListHomeActin,

} from '../../../redux/actions';
import Moment from 'react-moment';
import moment from 'moment'

gsap.registerPlugin(ScrollTrigger);

function HomePage(props) {
  const {
    getCourseListHome,
    DataCourse,
  }= props

  useEffect( async() => {
      getCourseListHome();
  }, [])

  let laptop = window.matchMedia("(max-width: 1366px)");
  // let tablet = window.matchMedia("(max-width: 768px)").matches;
  // let Pixel = window.matchMedia("(max-width:  411px)").matches;
  // let iPhone = window.matchMedia("(max-width: 375px)").matches;
  // let Mobile = window.matchMedia("(max-width: 360px)").matches;

  useEffect(() => {
    TweenMax.to(".block-1", 4, {
      x: "-592",
      y: "-34",
      ease: "Expo.easeInOut",
    });

    TweenMax.to(".block-2", 4, {
      x: "-180",
      y: "200",
      scale: "1.2",
      ease: "Expo.easeInOut",
    });

    if (laptop.matches) {
      TweenMax.to(".block-3", 4, {
        x: "150%",
        y: "-140",
        scale: "1.6",
        ease: "Expo.easeInOut",
      });
      TweenMax.to(".block-4", 4, {
        x: "400%",
        y: "90%",
        scale: "0.8",
        ease: "Expo.easeInOut",
      });
    } else {
      TweenMax.to(".block-4", 4, {
        x: "629",
        y: "200",
        scale: "0.8",
        ease: "Expo.easeInOut",
      });
      TweenMax.to(".block-3", 4, {
        x: "233",
        y: "-140",
        scale: "1.6",
        ease: "Expo.easeInOut",
      });
    }

    TweenMax.to(".box", 2.4, {
      y: "-100%",
      ease: "Expo.easeInOut",
    });

    TweenMax.from(".circle-shape", 2.4, {
      scale: "0",
      ease: "Expo.easeInOut",
    });
    TweenMax.from(".circle-shape-2", 2.4, {
      scale: "0",
      ease: "Expo.easeInOut",
    });
    TweenMax.from(".circle-shape-3", 2.4, {
      scale: "0",
      ease: "Expo.easeInOut",
    });
    TweenMax.from(".showreel", 1.6, {
      opacity: 0,
      y: 40,
      ease: "Expo.easeInOut",
      delay: 0.6,
    });
    // TweenMax.staggerFrom(
    //   ".site-menu > div",
    //   1,
    //   {
    //     opacity: 0,
    //     y: 60,
    //     ease: "Expo.easeInOut",
    //   },
    //   0.2
    // );
  });



  const DataAcording = [
    {
      title: "LTE l?? g???",
      content:
        `LTE ???????c s??ng l???p b???i Hu???nh ?????c Lanh v?? Thanh T??n c??ng c??c th??nh vi??n
        c?? t??? 2-3 n??m kinh nghi???m trong l??nh v???c Web/App Dev v?? UX/UI Design.`
    },
    {
      title: "?????i t??c c???a LTE l?? ai?",
      content:
        `?????i t??c ch??nh c???a LTE l?? c??c tr?????ng ?????i h???c v?? doanh nhi??p tr??n ?????a b??n th??nh ph??? ???? N???ng `
    },
    {
      title: "M???c ti??u c???a LTE l?? g??? ",
      content:
        `Hi???n t???i, M???c ti??u ch??nh c???a LTE l?? c?? th??? k???t n???i t???t c??? c??c doanh nghi???p v?? c??c tr?????ng ?????i h???c tr??n ?????a b??n th??nh ph???.
         Nh???m t???o ??i???u ki???n thu???n l???i nh???t cho sinh vi??n trong giai ??o???n th???c t???p`
    },
  ];
  return (
    <>
      <div className="Home">
        <div className="wrapper-img">
          <div className="box"></div>
          <div>
            <img className="image" src={Logo} alt="imge" />
          </div>
        </div>
        <div className="circle-shape"></div>
        <div className="circle-shape-2"></div>
        <div className="circle-shape-3"></div>
        <div className="blocks">
          <div className="block-2 block">L</div>
          <div className="block-3 block">T</div>
          <div className="block-4 block">E</div>
        </div>
      </div>
      <section className="couse" >
        <div className="container">
          <h2 className="main--tille">Ch??o m???ng ?????n c???i LTE</h2>
          <p className="main--des">
            N??i k???t n???i ch??ng ta l???i v???i nhau
          </p>
          <div className="textBox" id="course">
            <h2 className="main--tille">Kh??a H???c</h2>
          </div>
          <div className="listcorse container" >
            {DataCourse.map((courseItem, courseIndex) => {
              return (
                <div className="cardcourse col-md-4" key={courseIndex}>
                  <div className="cardcourse__img">
                    <img src={courseItem.logo} alt="card_item" style={{objectFit: 'fill'}} />
                  </div>
                  <div className="cardcourse__content">
                    <p className="status ">{courseItem.status? "Ch??a Khai gi???ng":  "??ang Khai gi???ng" }</p>
                    <h3 className="cardcourse__content--title">
                      {courseItem.courseName}
                    </h3>
                    <p className="cardcourse__content--des">
                      {courseItem.description}
                    </p>
                    <div className="cardcourse__content--bottom">
                      <div className="author">
                        <div className="author__teacher">
                          <div className="author__teacher--avatar">
                            <img src={courseItem.avatar} alt="avartar" />
                          </div>
                          <p className="teacher">{courseItem.fullName}</p>
                        </div>
                        <div className="date">
                        <Moment date={moment(courseItem.startDay)}  format="DD/MM/YYYY"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="feelContainer" id="company">
        <div className="container">
          <div className="textBox">
            <h2 className="textBox__title">Doanh Nghi???p</h2>
          </div>
          <div className="sliders" >
            <Slider/>
          </div>
        </div>
      </section>
      <section className="acording">
        <div className="container">
          <h2 className="main-title">C??u H???i Th?????ng G???p</h2>
          <div className="row">
            <div className="col-lg-12">
              <h3 className="acording__title">Th??ng tin chung</h3>
              <Acording DataAcording={DataAcording} />
            </div>
          </div>
        </div>
      </section>
      <section className="gallery">
        <h2 className="main-title">we are the world</h2>
        <div className="gallery__list">
          <Slidergallery />
        </div>
      </section>
      <section className="section-action">
        <div className="container">
            <h3>B???n ???? s???n s??ng tr??? th??nh chi???n binh ti???p theo hay ch??a?</h3>
            <p href=""><div className="btn main round bg-white" data-id="register">????ng k?? nh???n tin</div></p>
        </div>
    </section>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-5 left">
              <p className="des">
                S??ng t???o, tinh t??? v?? ph?? h???p s??? khi???n s???n ph???m c???a b???n tr??? n??n
                kh??c bi???t.
              </p>
              <p className="address">H01/06 K130 ??ng ??ch ???????ng</p>
              <p className="phone">0766762958</p>
            </div>
            <div className="right">
              <nav>
                <ul>
                  <li>
                    <p target="_blank">C???ng ?????ng LTE</p>
                  </li>
                  <li>
                    <p target="_blank">Kh??a h???c</p>
                  </li>
                  <li>
                    <p target="_blank">LTE Team</p>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <p  class="back-to-top">
            <div class="line"></div>
            CU???N L??N
        </p>
        </div>
        <div className="copy-right">
          <div className="container">
            <p>?? 2021 B???n quy???n thu???c v??? LTE</p>
          </div>
        </div>
      </footer>
    </>
  );
}

const mapStateToProps = (state) => {
  const {  DataCourse } = state.homeReducer;
  return {
      DataCourse: DataCourse,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      getCourseListHome: (params) => dispatch(getCourseListHomeActin(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

