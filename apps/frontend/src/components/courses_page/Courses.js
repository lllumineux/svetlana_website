import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourses, deleteCourse, invertCourseVisibility } from "../../actions/courses";
import {Link} from "react-router-dom";
import {PopupWindow} from "../common/PopupWindow";
import {getContactInfo} from "../../actions/general_info";
import {
    hideLoader,
    showFooter,
    showHeader
} from "../../actions/page_management";

export class Courses extends Component {
    state = {
        ExternalInfoPopupShown: true,
        isBuyPopupShown: false,
        isDescriptionPopupShown: false,
        descriptionPopupCourse: {},
        buyPopupParagraphsInfo: []
    }

    static propTypes = {
        courses: PropTypes.array.isRequired,
        getCourses: PropTypes.func.isRequired,
        deleteCourse: PropTypes.func.isRequired,
        invertCourseVisibility: PropTypes.func.isRequired,
        getContactInfo: PropTypes.func.isRequired
    };

    componentDidMount() {
        (document.readyState === "complete") ? this.props.hideLoader() : window.addEventListener('load', this.props.hideLoader);
        this.props.showHeader();
        this.props.showFooter();
        this.props.getCourses();
        this.props.getContactInfo();
    }

    showBuyPopup = (course) => {
        const paragraphs = [
            {name: `курс «${course.name}» с консультациями`, price: course.price1, comment: `${course.name} + консультации`},
            {name: `курс «${course.name}» без консультаций`, price: course.price2, comment: `${course.name}`},
        ]
        this.setState({isBuyPopupShown: true, isDescriptionPopupShown: false, buyPopupParagraphsInfo: paragraphs});
    }
    hideBuyPopup = () => {this.setState({isBuyPopupShown: false})}

    hideExternalInfoPopup = () => {this.props.history.push("/courses/")}

    showDescriptionPopup = (course) => {this.setState({isDescriptionPopupShown: true, isBuyPopupShown: false, descriptionPopupCourse: course})}
    hideDescriptionPopup = () => {this.setState({isDescriptionPopupShown: false})}

    render() {
        return (
            <Fragment>
                {((this.state.isBuyPopupShown) || (this.props.location.state && this.props.location.state.isPopupShown && this.state.ExternalInfoPopupShown)) ?
                    <PopupWindow
                        title="Покупка курса"
                        content={
                            <div className="authorized-buy-course-popup-window-content">
                                <Fragment>
                                    {((this.state.isBuyPopupShown) ? this.state.buyPopupParagraphsInfo : this.props.location.state.popupParagraphsInfo).map((paragraphInfo, index) => (
                                        <span key={`paragraph_${index}`}>
                                            Для того, чтобы приобрести <strong><span className="accent-color">{paragraphInfo.name}</span></strong>, переведите <strong>{new Intl.NumberFormat('en-US').format(paragraphInfo.price)} руб.</strong> на карту по номеру телефона <strong>{this.props.contact_info.whatsapp_number}</strong> с комментарием: <strong>«{this.props.auth.user.username}: {paragraphInfo.comment}»</strong>.
                                            <br/><br/>
                                        </span>
                                    ))}
                                    После того, как платёж будет совершён, в течение 24 часов у вашего аккаунта появится доступ к оплаченному курсу.
                                    <br/><br/>
                                    По всем вопросам, обращайтесь в <strong>WhatsApp</strong> по номеру <strong><u><a href={this.props.contact_info.whatsapp_link} target="_blank">{this.props.contact_info.whatsapp_number}</a></u></strong>, либо в <strong>Instagram</strong> по нику <strong><u><a href={this.props.contact_info.instagram_link} target="_blank">{this.props.contact_info.instagram_alias}</a></u></strong>.
                                </Fragment>
                            </div>
                        }
                        hidePopup={(this.state.isBuyPopupShown) ? this.hideBuyPopup : this.hideExternalInfoPopup}
                    /> : ""}
                {(this.state.isDescriptionPopupShown) ?
                    <PopupWindow
                        title="Описание курса"
                        content={<div className="authorized-course-description-popup-window-content editor-rendered-content" dangerouslySetInnerHTML={{__html: this.state.descriptionPopupCourse.full_description }}/>}
                        hidePopup={this.hideDescriptionPopup}
                    /> : ""}
                <div className="content-header"><h2 className="title">Курсы</h2></div>
                <div className="courses">
                    {this.props.auth.isAuthenticated && this.props.auth.user.is_staff ? (
                        <Link to="/courses/add/" className="course add-course-button" style={(this.props.auth.isAuthenticated && this.props.auth.user.is_staff) ? {} : {"height" : "302.2px"}}>
                            <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNTEiIHZpZXdCb3g9IjAgMCA1MSA1MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMjQiIHk9IjE0IiB3aWR0aD0iMyIgaGVpZ2h0PSIyMyIgcng9IjEuNSIgZmlsbD0iIzg4ODg4OCIvPgo8cmVjdCB4PSIzNyIgeT0iMjQiIHdpZHRoPSIzIiBoZWlnaHQ9IjIzIiByeD0iMS41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCAzNyAyNCkiIGZpbGw9IiM4ODg4ODgiLz4KPGNpcmNsZSBjeD0iMjUuNSIgY3k9IjI1LjUiIHI9IjI0IiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMyIvPgo8L3N2Zz4K" alt="Add course icon"/>
                            <div>Добавить курс</div>
                        </Link>
                    ) : ""}
                    { this.props.courses.map(course => (
                        <div className="course" data-locked={course.is_locked.toString()} key={course.name + course.id}>
                            {course.is_locked ? (
                                <Fragment>
                                    <div className="course-locked-warning">
                                        <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2LjU3NzEgOC4yMzM0OUgxNS42Mjk0VjUuMzQ3OTFDMTUuNjI5NCAyLjM5OTM1IDEzLjIzMDYgMCAxMC4yODIyIDBDNy4zMzI3NCAwIDQuOTM0MzYgMi4zOTkwMyA0LjkzNDM2IDUuMzQ3OTFWOC4yMzM0OUgzLjk4N0MzLjQ0MTc2IDguMjMzNDkgMyA4LjY3NTQ3IDMgOS4yMjA1VjE5LjAxMzFDMyAxOS41NTgxIDMuNDQxNzYgMjAgMy45ODcgMjBIMTYuNTc3MkMxNy4xMjEzIDIwIDE3LjU2NDIgMTkuNTU4MSAxNy41NjQyIDE5LjAxMzFWOS4yMjA1QzE3LjU2NDIgOC42NzU0NyAxNy4xMjEyIDguMjMzNDkgMTYuNTc3MSA4LjIzMzQ5Wk02LjkwODE1IDUuMzQ3OTFDNi45MDgxNSAzLjQ4NzE1IDguNDIxNDYgMS45NzM4NCAxMC4yODIyIDEuOTczODRDMTIuMTQyNCAxLjk3Mzg0IDEzLjY1NTggMy40ODcxNSAxMy42NTU4IDUuMzQ3OTFWOC4yMzM0OUg2LjkwODE1VjUuMzQ3OTFaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K" alt="Locked Icon"/>
                                        <p>Для того, чтобы получить к курсу - приобретите его!</p>
                                        <div className="locked-warning-controls">
                                            <button
                                                onClick={() => this.showBuyPopup(course)}
                                                className="locked-warning-controls-buy hover-animation">Купить</button>
                                            <button onClick={() => this.showDescriptionPopup(course)} className="locked-warning-controls-description hover-animation">Описание курса</button>
                                        </div>
                                    </div>
                                    <a>
                                        <h3>{course.name}</h3>
                                        <div className="description">{course.short_description}</div>
                                    </a>
                                </Fragment>
                            ) : (
                                <Link to={`/courses/${course.id}/`}>
                                    <h3>{course.name}</h3>
                                    <div className="description">{course.short_description}</div>
                                </Link>
                            )}
                            {this.props.auth.isAuthenticated && this.props.auth.user.is_staff ? (
                                <Fragment>
                                    <hr/>
                                    <div className="action-buttons">
                                        <button onClick={this.props.deleteCourse.bind(this, course.id)}
                                                className="hover-animation">Удалить
                                        </button>
                                        <Link to={`/courses/edit/${course.id}/`}
                                              className="hover-animation">Редактировать</Link>
                                        <button onClick={this.props.invertCourseVisibility.bind(this, course.id)}
                                                className="hover-animation">
                                            {course.is_hidden ? ("Показать") : ("Скрыть")}
                                        </button>
                                    </div>
                                </Fragment>
                            ) : ""}
                        </div>
                    )) }
                </div>
                {this.state.isPopupShown || this.props.location.state && this.props.location.state.isPopupShown && this.state.ExternalInfoPopupShown ? <style>{"html {overflow: hidden;}"}</style> : ""}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    courses: state.courses.courses,
    contact_info: state.general_info.contact_info,
    auth: state.auth
});

export default connect(mapStateToProps, { hideLoader, showHeader, showFooter, getCourses, deleteCourse, invertCourseVisibility, getContactInfo })(Courses);