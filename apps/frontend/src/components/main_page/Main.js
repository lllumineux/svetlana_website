import React, { Component, Fragment } from "react";
import {connect} from "react-redux";
import {addNumber} from "../../actions/numbers";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {getGeneralInfo} from "../../actions/general_info";
import ReactPlayer from 'react-player';
import {STATIC_FILES_PATH} from '../../config';
import {getCourses} from "../../actions/courses";
import {PopupWindow} from "../common/PopupWindow";
import {getScreenshots} from "../../actions/screenshots";

import Carousel, { arrowsPlugin, slidesToShowPlugin } from '@brainhubeu/react-carousel';

export class Main extends Component {
    state = {
        number: "",
        isPopupShown: false
    }

    static propTypes = {
        addNumber: PropTypes.func.isRequired,
        getGeneralInfo: PropTypes.func.isRequired,
        general_info: PropTypes.shape({
            id: PropTypes.number,
            about_me_list: PropTypes.string.isRequired,
            greeting_video: PropTypes.string.isRequired,
            psychological_consultation_description: PropTypes.string.isRequired,
            whatsapp_number: PropTypes.string.isRequired,
            instagram_alias: PropTypes.string.isRequired,
            main_page_numbers_form_text: PropTypes.string.isRequired,
        }).isRequired,
        getCourses: PropTypes.func.isRequired,
        getScreenshots: PropTypes.func.isRequired,
        screenshots: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.getGeneralInfo();
        this.props.getCourses();
        this.props.getScreenshots();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("text", this.state.number)
        this.props.addNumber(formData);
    }

    showPopup = () => {this.setState({isPopupShown: true})}
    hidePopup = () => {this.setState({isPopupShown: false})}

    render() {
        return (
            <Fragment>
                {(this.state.isPopupShown) ?
                    <PopupWindow
                        title="Отзывы"
                        content={
                            <div className="main-popup-window-content">
                                <p>Интересно, а какие процессы запустятся у тебя?</p>
                                <Carousel plugins={[
                                    'infinite',
                                    {
                                        resolve: arrowsPlugin,
                                        options: {
                                          arrowLeft: <button className="hover-animation"><img style={{width: "25px", height: "25px"}} src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik01Ljk4MjM3IDEzLjM5MjNMMTcuMjI0OCAyNC42MzFDMTcuNzE4MSAyNS4xMjMgMTguNTE3MyAyNS4xMjMgMTkuMDExOSAyNC42MzFDMTkuNTA1MiAyNC4xMzg5IDE5LjUwNTIgMjMuMzM5NyAxOS4wMTE5IDIyLjg0NzZMOC42NjEyIDEyLjUwMDdMMTkuMDEwNiAyLjE1Mzc2QzE5LjUwMzkgMS42NjE3IDE5LjUwMzkgMC44NjI0NTcgMTkuMDEwNiAwLjM2OTE0OEMxOC41MTczIC0wLjEyMjkxMyAxNy43MTY4IC0wLjEyMjkxNCAxNy4yMjM1IDAuMzY5MTQ4TDUuOTgxMTIgMTEuNjA3OEM1LjQ5NTI5IDEyLjA5NDggNS40OTUyOSAxMi45MDY2IDUuOTgyMzcgMTMuMzkyM1oiIGZpbGw9IiM4ODg4ODgiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIyNSIgaGVpZ2h0PSIyNSIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI1IDI1KSByb3RhdGUoLTE4MCkiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Left Carousel Arrow"/></button>,
                                          arrowRight: <button className="hover-animation"><img style={{width: "25px", height: "25px"}} src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjAxNzYgMTEuNjA3N0w3Ljc3NTI1IDAuMzY5MDQ3QzcuMjgxOTQgLTAuMTIzMDE2IDYuNDgyNyAtMC4xMjMwMTYgNS45ODgxNSAwLjM2OTA0N0M1LjQ5NDg0IDAuODYxMTEgNS40OTQ4NCAxLjY2MDM1IDUuOTg4MTUgMi4xNTI0MUwxNi4zMzg4IDEyLjQ5OTNMNS45ODkzOSAyMi44NDYyQzUuNDk2MDggMjMuMzM4MyA1LjQ5NjA4IDI0LjEzNzUgNS45ODkzOSAyNC42MzA5QzYuNDgyNyAyNS4xMjI5IDcuMjgzMTggMjUuMTIyOSA3Ljc3NjQ5IDI0LjYzMDlMMTkuMDE4OSAxMy4zOTIyQzE5LjUwNDcgMTIuOTA1MiAxOS41MDQ3IDEyLjA5MzQgMTkuMDE3NiAxMS42MDc3WiIgZmlsbD0iIzg4ODg4OCIvPgo8L3N2Zz4K" alt="Right Carousel Arrow"/></button>,
                                          addArrowClickHandler: true
                                        }
                                    },
                                    {
                                        resolve: slidesToShowPlugin,
                                        options: {
                                            numberOfSlides: 1
                                        }
                                    },
                                ]}>
                                    {this.props.screenshots.map((screenshot, index) => (
                                        <img className="main-popup-window-content-image" src={STATIC_FILES_PATH + screenshot.content.split("/").pop()} alt={`Course Image ${index}`} key={`course_image_${index}`} />
                                    ))}
                                </Carousel>
                            </div>
                        }
                        hidePopup={this.hidePopup}
                    /> : ""
                }
                <div className="main-content-header">
                    <div className="main-content-header-controls">
                        <Link className="main-login-btn hover-animation" to="/login/">Войти</Link>
                    </div>
                    <div className="main-content-header-info">
                        <h1>Светлана Ганиева</h1>
                        <p>Проводник в мир осознанности и принятия себя</p>
                        <ul>
                            {
                                (this.props.general_info.about_me_list !== "") ?
                                    this.props.general_info.about_me_list.split(";").map(
                                        (qualification, index) => <li key={`${qualification}_${index}`}>{qualification}</li>
                                    ) : ""
                            }
                        </ul>
                    </div>
                    <img className="scroll-down-icon" src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMzciIGhlaWdodD0iMzciIHZpZXdCb3g9IjAgMCAzNyAzNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0xOC41MDk4IDI4LjE1NzFDMTguNzIzMyAyOC4xNTc1IDE4LjkyODIgMjguMDczIDE5LjA3OTMgMjcuOTIyMkwzNi43NzQyIDEwLjIyNzNDMzcuMDgyOCA5LjkwNzgzIDM3LjA3MzkgOS4zOTg2MyAzNi43NTQ1IDkuMDlDMzYuNDQyNyA4Ljc4ODk4IDM1Ljk0ODYgOC43ODg5OCAzNS42MzcgOS4wOUwxOC41MDk5IDI2LjIxNTVMMS4zODQ0NyA5LjA4ODQxQzEuMDc1ODQgOC43Njg5MiAwLjU2NjcxMSA4Ljc2MDEgMC4yNDcxNDcgOS4wNjg2NkMtMC4wNzIzNDE5IDkuMzc3MjkgLTAuMDgxMTYxNSA5Ljg4NjQyIDAuMjI3MzkgMTAuMjA2QzAuMjMzODc1IDEwLjIxMjcgMC4yNDA0MzcgMTAuMjE5MyAwLjI0NzE0NyAxMC4yMjU3TDE3Ljk0MiAyNy45MjA2QzE4LjA5MjUgMjguMDcxNiAxOC4yOTY4IDI4LjE1NjYgMTguNTA5OCAyOC4xNTcxWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIzNyIgaGVpZ2h0PSIzNyIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0ibWF0cml4KC0xIDAgMCAxIDM3IDApIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" alt="Scroll down icon"/>
                </div>
                <div className="greeting-video-wrapper">
                    <ReactPlayer
                        url={STATIC_FILES_PATH + this.props.general_info.greeting_video.split("/").pop()}
                        controls={true}
                        width="80vw"
                        height="80vh"
                        light={STATIC_FILES_PATH + "greeting_video_preview.jpg"}
                        playing={true}
                        playIcon={<img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iNjIiIGhlaWdodD0iNjIiIHZpZXdCb3g9IjAgMCA2MiA2MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik00MC45NzA5IDI5Ljc3NjFMMjguNDE4IDIwLjY1MTFDMjcuOTU3MyAyMC4zMTcxIDI3LjM0NTggMjAuMjY2OCAyNi44NDA4IDIwLjUyNjNDMjYuMzMxOSAyMC43ODM4IDI2LjAxNCAyMS4zMDY5IDI2LjAxNCAyMS44NzIyVjQwLjExNjFDMjYuMDE0IDQwLjY4NzQgMjYuMzMxOSA0MS4yMDg1IDI2Ljg0MDggNDEuNDY2QzI3LjA1NjEgNDEuNTc0NiAyNy4yOTE1IDQxLjYyODkgMjcuNTI4OCA0MS42Mjg5QzI3LjgzODYgNDEuNjI4OSAyOC4xNTI1IDQxLjUzMDMgMjguNDE4IDQxLjMzNTJMNDAuOTcwOSAzMi4yMTgyQzQxLjM2NzIgMzEuOTI2NSA0MS41OTg2IDMxLjQ3NTkgNDEuNTk4NiAzMC45OTcxQzQxLjYwMDYgMzAuNTEwMyA0MS4zNjMyIDMwLjA2MTcgNDAuOTcwOSAyOS43NzYxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTU5LjcyNjUgMzAuOTU4QzU5LjcyNjUgNDYuODIzMiA0Ni44NjUyIDU5LjY4NDUgMzEgNTkuNjg0NUMxNS4xMzQ4IDU5LjY4NDUgMi4yNzM0NCA0Ni44MjMyIDIuMjczNDQgMzAuOTU4QzIuMjczNDQgMTUuMDkyOCAxNS4xMzQ4IDIuMjMxNDUgMzEgMi4yMzE0NUM0Ni44NjUyIDIuMjMxNDUgNTkuNzI2NSAxNS4wOTI4IDU5LjcyNjUgMzAuOTU4WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iNjAuNDUzMSIgaGVpZ2h0PSI2MC40NTMxIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC43NzM0MzggMC43MzE0NDUpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==" alt="Play icon"/>}
                    />
                </div>
                {this.props.courses.map(course => (
                    <div
                        className="main-menu-item"
                        key={`course_${course.id}`}
                        style={{
                            "background": `linear-gradient(to bottom, rgba(0, 0, 0, 0.54), rgba(0, 0, 0, 0.54)), url(${STATIC_FILES_PATH + course.background_img.split("/").pop()}) no-repeat center center`,
                            "background-size": "cover"
                        }}
                    >
                        <div/>
                        <div className="main-menu-item-info">
                            <h4>{course.name}</h4>
                        </div>
                        <Link to={`/course_description/${course.id}/`} className="hover-animation">Подробнее</Link>
                    </div>
                ))}
                <div className="main-menu-item psychological-consultation">
                    <div/>
                    <div className="main-menu-item-info">
                        <h4>Психологическая консультация</h4>
                        <p>Запись на индивидуальную онлайн встречу</p>
                    </div>
                    <Link to="/psychological_consultation_description/" className="hover-animation">Подробнее</Link>
                </div>
                <div className="main-menu-item reviews">
                    <div/>
                    <div className="main-menu-item-info">
                        <h4>Отзывы</h4>
                        <p>Что получают люди от консультаций</p>
                    </div>
                    <button onClick={this.showPopup} className="hover-animation">Смотреть</button>
                </div>
                <div className="main-menu-item interesting">
                    <div/>
                    <div className="main-menu-item-info">
                        <h4>Интересное</h4>
                        <p>Статьи, запускающие внутренние трансформации</p>
                    </div>
                    <Link to="/articles/" className="hover-animation">Читать</Link>
                </div>
                <form onSubmit={this.onSubmit} className="main-number-input-form">
                    <p className="number-input-form-description">{this.props.general_info.main_page_numbers_form_text}</p>
                    <div className="number-input-form-content">
                        <input
                            type="tel"
                            name="number"
                            pattern="((\+7)|8)\d{10}"
                            placeholder="Введите свой номер телефона"
                            onChange={this.onChange}
                            required
                        />
                        <button type="submit" className="hover-animation">Получить</button>
                    </div>
                </form>
                {this.state.isPopupShown ? <style>{"html {overflow: hidden;}"}</style> : ""}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    general_info: state.general_info.general_info,
    courses: state.courses.courses,
    screenshots: state.screenshots.screenshots
});

export default connect(mapStateToProps, { addNumber, getGeneralInfo, getCourses, getScreenshots })(Main);
