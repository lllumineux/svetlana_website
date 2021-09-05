import React, { Component, Fragment } from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getCourse} from "../../actions/courses";
import {getContactInfo, getGeneralInfo} from "../../actions/general_info";
import {PopupWindow} from "../common/PopupWindow";
import {Link} from "react-router-dom";
import {
    hideLoader,
    showFooter,
    showHeader
} from "../../actions/page_management";

export class CourseDescription extends Component {
    state = {
        isPopupShown: false,
        popupParagraphsInfo: []
    }

    static propTypes = {
        course: PropTypes.object.isRequired,
        general_info: PropTypes.object.isRequired,
        getCourse: PropTypes.func.isRequired,
        getGeneralInfo: PropTypes.func.isRequired,
        getContactInfo: PropTypes.func.isRequired
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getCourse(this.props.location.pathname.split("/").filter(obj => obj !== "").pop());
        this.props.getGeneralInfo();
    }

    showPopup = () => {this.setState({isPopupShown: true})}
    hidePopup = () => {this.setState({isPopupShown: false})}

    render() {
        return (
            <Fragment>
                {(this.state.isPopupShown) ?
                    <PopupWindow
                        title="Покупка курса"
                        content={
                            <div className="unauthorized-buy-course-popup-window-content">
                                <p>Для того, чтобы приобрести курс, вам сначала нужно авторизоваться!</p>
                                <div className="authorize-btn-wrapper">
                                    <Link to={{
                                        pathname: "/signup/",
                                        state: {isPopupShown: true, popupParagraphsInfo: this.state.popupParagraphsInfo}
                                    }}>Авторизоваться</Link>
                                </div>
                            </div>
                        }
                        hidePopup={this.hidePopup}
                    /> : ""}
                <div className="content-header"><h2 className="title">Курс «{this.props.course.name}»</h2></div>
                <div className="editor-rendered-content course-full-description" dangerouslySetInnerHTML={{__html: this.props.course.full_description}}/>
                {(this.props.course.name.toLowerCase() === "осознание себя") ? (
                    <div className="course-description-promotion-banner">
                        <div className="promotion-info">
                            <h3>Акция!</h3>
                            <p>Купите оба курса «Осознание себя» и «Принятие себя» вместе, чтобы получить <strong>{this.props.general_info.two_course_sale_value}% скидку</strong> на общую сумму покупки!</p>
                        </div>
                        <div className="promotion-offers">
                            <div className="promotion-offer">
                                <div className="promotion-offer-name">Материалы курсов «Осознание себя» и «Принятие себя»</div>
                                <div className="promotion-offer-price"><strike>{new Intl.NumberFormat('en-US').format(this.props.course.price1 * 2)}</strike> {new Intl.NumberFormat('en-US').format(Math.round(this.props.course.price1 * 2 * (1 - this.props.general_info.two_course_sale_value / 100)))} руб.</div>
                                <button onClick={() => {
                                    this.setState({
                                        popupParagraphsInfo: [{
                                            name: `курсы «Осознание себя» и «Принятие себя» без консультаций`,
                                            price: Math.round(this.props.course.price1 * 2 * (1 - this.props.general_info.two_course_sale_value / 100)),
                                            comment: `Осознание себя, Принятие себя`,
                                        }]
                                    });
                                    this.showPopup();
                                }} className="promotion-offer-buy-btn hover-animation">Купить</button>
                            </div>
                            <hr/>
                            <div className="promotion-offer">
                                <div className="promotion-offer-name">Материалы курсов + личные консультации раз в неделю</div>
                                <div className="promotion-offer-price"><strike>{new Intl.NumberFormat('en-US').format(this.props.course.price2 * 2)}</strike> {new Intl.NumberFormat('en-US').format(Math.round(this.props.course.price2 * 2 * (1 - this.props.general_info.two_course_sale_value / 100)))} руб.</div>
                                <button onClick={() => {
                                    this.setState({
                                        popupParagraphsInfo: [{
                                            name: `курсы «Осознание себя» и «Принятие себя» с консультациями`,
                                            price: Math.round(this.props.course.price2 * 2 * (1 - this.props.general_info.two_course_sale_value / 100)),
                                            comment: `Осознание себя, Принятие себя + консультации`,
                                        }]
                                    });
                                    this.showPopup();
                                }} className="promotion-offer-buy-btn hover-animation">Купить</button>
                            </div>
                        </div>
                    </div>
                ) : ""}
                <table className="course-description-price-table">
                    <tbody>
                        <tr>
                            <th>Материалы курса</th>
                            <td><img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM3RkYxNzUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik0xMi4xODI1IDE0Ljk1NTJDMTEuOTcyNSAxNS4yNDAzIDExLjY0NTQgMTUuNDE1NSAxMS4yOTE3IDE1LjQzMjlDMTAuOTM4IDE1LjQ1MDUgMTAuNTk1NSAxNS4zMDggMTAuMzU4NSAxNS4wNDQ4TDguMjM0NzggMTIuNjg4QzcuODk3MjYgMTIuMzEzNyA3LjkyNzI0IDExLjczNjcgOC4zMDE1NyAxMS4zOTkyQzguNjc2MjUgMTEuMDYxNiA5LjI1MjkyIDExLjA5MTggOS41OTA0NCAxMS40NjYzTDExLjA5MyAxMy4xMzM4QzExLjExNTIgMTMuMTU4NiAxMS4xNDc1IDEzLjE3MTkgMTEuMTgwNyAxMy4xNzAzQzExLjIxNDEgMTMuMTY4NiAxMS4yNDQ3IDEzLjE1MTkgMTEuMjY0NiAxMy4xMjU0TDE0LjM1MjkgOC45MzY2OEMxNC42NTE4IDguNTMwOTQgMTUuMjIzMSA4LjQ0NDU4IDE1LjYyOSA4Ljc0MzY5QzE2LjAzNDYgOS4wNDI3OSAxNi4xMjA4IDkuNjE0MDYgMTUuODIxNyAxMC4wMTk2TDEyLjE4MjUgMTQuOTU1MloiIGZpbGw9IiM3RkYxNzUiLz4KPC9zdmc+Cg==" alt="Green Tick"/></td>
                            <td><img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM3RkYxNzUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik0xMi4xODI1IDE0Ljk1NTJDMTEuOTcyNSAxNS4yNDAzIDExLjY0NTQgMTUuNDE1NSAxMS4yOTE3IDE1LjQzMjlDMTAuOTM4IDE1LjQ1MDUgMTAuNTk1NSAxNS4zMDggMTAuMzU4NSAxNS4wNDQ4TDguMjM0NzggMTIuNjg4QzcuODk3MjYgMTIuMzEzNyA3LjkyNzI0IDExLjczNjcgOC4zMDE1NyAxMS4zOTkyQzguNjc2MjUgMTEuMDYxNiA5LjI1MjkyIDExLjA5MTggOS41OTA0NCAxMS40NjYzTDExLjA5MyAxMy4xMzM4QzExLjExNTIgMTMuMTU4NiAxMS4xNDc1IDEzLjE3MTkgMTEuMTgwNyAxMy4xNzAzQzExLjIxNDEgMTMuMTY4NiAxMS4yNDQ3IDEzLjE1MTkgMTEuMjY0NiAxMy4xMjU0TDE0LjM1MjkgOC45MzY2OEMxNC42NTE4IDguNTMwOTQgMTUuMjIzMSA4LjQ0NDU4IDE1LjYyOSA4Ljc0MzY5QzE2LjAzNDYgOS4wNDI3OSAxNi4xMjA4IDkuNjE0MDYgMTUuODIxNyAxMC4wMTk2TDEyLjE4MjUgMTQuOTU1MloiIGZpbGw9IiM3RkYxNzUiLz4KPC9zdmc+Cg==" alt="Green Tick"/></td>
                        </tr>
                        <tr>
                            <th>Личные консультации раз в неделю с ведущим курса</th>
                            <td><img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiNGRjdDN0MiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMCkiPgo8cGF0aCBkPSJNMTUuNzI5NiA5LjU3NTcyTDEzLjMwNTYgMTEuOTk5OUwxNS43Mjk2IDE0LjQyNEMxNi4wOTAxIDE0Ljc4NDcgMTYuMDkwMSAxNS4zNjkgMTUuNzI5NiAxNS43Mjk3QzE1LjU0OTQgMTUuOTA5OCAxNS4zMTMzIDE2IDE1LjA3NzIgMTZDMTQuODQwNyAxNiAxNC42MDQ1IDE1LjkxIDE0LjQyNDUgMTUuNzI5N0wxMiAxMy4zMDUzTDkuNTc1NzIgMTUuNzI5NkM5LjM5NTU5IDE1LjkwOTggOS4xNTkzOCAxNS45OTk5IDguOTIzMSAxNS45OTk5QzguNjg2ODkgMTUuOTk5OSA4LjQ1MDg0IDE1LjkwOTkgOC4yNzA1NSAxNS43Mjk2QzcuOTEgMTUuMzY5MSA3LjkxIDE0Ljc4NDggOC4yNzA1NSAxNC40MjRMMTAuNjk0NCAxMS45OTk5TDguMjcwNDEgOS41NzU3MkM3LjkwOTg2IDkuMjE1MTYgNy45MDk4NiA4LjYzMDc2IDguMjcwNDEgOC4yNzAyMUM4LjYzMDkgNy45MDk5MyA5LjIxNDk2IDcuOTA5OTMgOS41NzU1OCA4LjI3MDIxTDEyIDEwLjY5NDRMMTQuNDI0MiA4LjI3MDIxQzE0Ljc4NDkgNy45MDk5MyAxNS4zNjkgNy45MDk5MyAxNS43Mjk1IDguMjcwMjFDMTYuMDkwMSA4LjYzMDc2IDE2LjA5MDEgOS4yMTUxNiAxNS43Mjk2IDkuNTc1NzJaIiBmaWxsPSIjRkY3QzdDIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDAiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4LjAwMDAyIiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCA4KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" alt="Red Cross"/></td>
                            <td><img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM3RkYxNzUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik0xMi4xODI1IDE0Ljk1NTJDMTEuOTcyNSAxNS4yNDAzIDExLjY0NTQgMTUuNDE1NSAxMS4yOTE3IDE1LjQzMjlDMTAuOTM4IDE1LjQ1MDUgMTAuNTk1NSAxNS4zMDggMTAuMzU4NSAxNS4wNDQ4TDguMjM0NzggMTIuNjg4QzcuODk3MjYgMTIuMzEzNyA3LjkyNzI0IDExLjczNjcgOC4zMDE1NyAxMS4zOTkyQzguNjc2MjUgMTEuMDYxNiA5LjI1MjkyIDExLjA5MTggOS41OTA0NCAxMS40NjYzTDExLjA5MyAxMy4xMzM4QzExLjExNTIgMTMuMTU4NiAxMS4xNDc1IDEzLjE3MTkgMTEuMTgwNyAxMy4xNzAzQzExLjIxNDEgMTMuMTY4NiAxMS4yNDQ3IDEzLjE1MTkgMTEuMjY0NiAxMy4xMjU0TDE0LjM1MjkgOC45MzY2OEMxNC42NTE4IDguNTMwOTQgMTUuMjIzMSA4LjQ0NDU4IDE1LjYyOSA4Ljc0MzY5QzE2LjAzNDYgOS4wNDI3OSAxNi4xMjA4IDkuNjE0MDYgMTUuODIxNyAxMC4wMTk2TDEyLjE4MjUgMTQuOTU1MloiIGZpbGw9IiM3RkYxNzUiLz4KPC9zdmc+Cg==" alt="Green Tick"/></td>
                        </tr>
                        <tr>
                            <th>Стоимость</th>
                            <td className="price-td">{new Intl.NumberFormat('en-US').format(this.props.course.price1)} руб.</td>
                            <td className="price-td">{new Intl.NumberFormat('en-US').format(this.props.course.price2)} руб.</td>
                        </tr>
                        <tr>
                            <th/>
                            <td><button onClick={() => {
                                this.setState({
                                    popupParagraphsInfo: [{
                                        name: `курс «${this.props.course.name}» без консультаций`,
                                        price: this.props.course.price1,
                                        comment: `${this.props.course.name}`,
                                    }]
                                });
                                this.showPopup();
                            }} className="course-description-buy-btn hover-animation">Купить</button></td>
                            <td><button onClick={() => {
                                this.setState({
                                    popupParagraphsInfo: [{
                                        name: `курс «${this.props.course.name}» с консультациями`,
                                        price: this.props.course.price2,
                                        comment: `${this.props.course.name} + консультации`,
                                    }]
                                });
                                this.showPopup();
                            }} className="course-description-buy-btn hover-animation">Купить</button></td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    course: state.courses.course,
    general_info: state.general_info.general_info,
    contact_info: state.general_info.contact_info
});

export default connect(mapStateToProps, { hideLoader, showHeader, showFooter, getCourse, getGeneralInfo, getContactInfo })(CourseDescription);
