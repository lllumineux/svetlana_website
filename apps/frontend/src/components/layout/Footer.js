import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getContactInfo} from "../../actions/general_info";

export class Footer extends Component {
    static propTypes = {
        contact_info: PropTypes.shape({
            whatsapp_number: PropTypes.string,
            whatsapp_link: PropTypes.string,
            instagram_alias: PropTypes.string,
            instagram_link: PropTypes.string
        }),
        getContactInfo: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getContactInfo();
    }

    render() {
        return (
            <Fragment>
                {this.props.isFooterShown ? (
                    <footer className="footer">
                        <div className="contacts">
                            <div className="whatsapp">
                                <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05Ljk3OTQ3IDIuMDA0MDRDOC45MjY5NyAwLjk1MDMxNyA3LjUyNzI1IDAuMzY5NzU5IDYuMDM2MDYgMC4zNjkxNDFDMi45NjMzMSAwLjM2OTE0MSAwLjQ2MjU0NyAyLjg2OTgzIDAuNDYxMzExIDUuOTQzNEMwLjQ2MDg5OSA2LjkyNTkyIDAuNzE3NTY4IDcuODg1MDIgMS4yMDU0MyA4LjczMDQyTDAuNDE0NTUxIDExLjYxOTFMMy4zNjk4MSAxMC44NDM5QzQuMTg0MSAxMS4yODgxIDUuMTAwODQgMTEuNTIyMiA2LjAzMzc5IDExLjUyMjVINi4wMzYxMkM5LjEwODUyIDExLjUyMjUgMTEuNjA5NiA5LjAyMTU2IDExLjYxMDcgNS45NDc4NkMxMS42MTE0IDQuNDU4MjUgMTEuMDMyIDMuMDU3NyA5Ljk3OTQ3IDIuMDA0MDRaTTYuMDM2MDYgMTAuNTgxSDYuMDM0MTNDNS4yMDI3NCAxMC41ODA3IDQuMzg3MzUgMTAuMzU3MiAzLjY3NTg1IDkuOTM1MTRMMy41MDY3MyA5LjgzNDY4TDEuNzUzMDMgMTAuMjk0N0wyLjIyMTEyIDguNTg0OTJMMi4xMTA5MSA4LjQwOTYyQzEuNjQ3MDggNy42NzE4OSAxLjQwMjE1IDYuODE5MjEgMS40MDI1NyA1Ljk0Mzc0QzEuNDAzNTMgMy4zODkwOCAzLjQ4MjE0IDEuMzEwNjcgNi4wMzc5MSAxLjMxMDY3QzcuMjc1NTIgMS4zMTEwOCA4LjQzODkxIDEuNzkzNjYgOS4zMTM2OSAyLjY2OTQ3QzEwLjE4ODUgMy41NDUyOSAxMC42NyA0LjcwOTQzIDEwLjY2OTUgNS45NDc1MkMxMC42Njg0IDguNTAyMzkgOC41ODk5NyAxMC41ODEgNi4wMzYwNiAxMC41ODFaTTguNTc3NjEgNy4xMTA3NkM4LjQzODM2IDcuMDQxIDcuNzUzNSA2LjcwNDEzIDcuNjI1NzggNi42NTc1OEM3LjQ5ODIgNi42MTEwOSA3LjQwNTIzIDYuNTg3OTUgNy4zMTI0NiA2LjcyNzM0QzcuMjE5NTYgNi44NjY3MyA2Ljk1MjY2IDcuMTgwNTMgNi44NzEzNiA3LjI3MzQzQzYuNzkwMDYgNy4zNjY0IDYuNzA4OSA3LjM3ODA3IDYuNTY5NTggNy4zMDgzMUM2LjQzMDI2IDcuMjM4NjIgNS45ODE0NyA3LjA5MTQ3IDUuNDQ5MzkgNi42MTY5M0M1LjAzNTM0IDYuMjQ3NTggNC43NTU4IDUuNzkxNDQgNC42NzQ1IDUuNjUyMDVDNC41OTMzNCA1LjUxMjUzIDQuNjczODIgNS40NDQ0MSA0LjczNTYyIDUuMzY3NzhDNC44ODY0IDUuMTgwNTMgNS4wMzc0IDQuOTg0MjIgNS4wODM4MSA0Ljg5MTMyQzUuMTMwMyA0Ljc5ODM1IDUuMTA3MDIgNC43MTY5OCA1LjA3MjE0IDQuNjQ3MjhDNS4wMzc0IDQuNTc3NTkgNC43NTg4MyAzLjg5MTk3IDQuNjQyNzggMy42MTI5OUM0LjUyOTYyIDMuMzQxNDkgNC40MTQ4OCAzLjM3ODE2IDQuMzI5MzMgMy4zNzM5QzQuMjQ4MTcgMy4zNjk4NSA0LjE1NTI2IDMuMzY5MDMgNC4wNjIzNiAzLjM2OTAzQzMuOTY5NTMgMy4zNjkwMyAzLjgxODYgMy40MDM4NCAzLjY5MDg4IDMuNTQzMzZDMy41NjMyNCAzLjY4MjgyIDMuMjAzNDMgNC4wMTk3NiAzLjIwMzQzIDQuNzA1MzdDMy4yMDM0MyA1LjM5MDk5IDMuNzAyNTYgNi4wNTMzMyAzLjc3MjE4IDYuMTQ2M0MzLjg0MTgxIDYuMjM5MjcgNC43NTQ0MyA3LjY0NjIxIDYuMTUxNjkgOC4yNDk0OUM2LjQ4NDAyIDguMzkzMTQgNi43NDM0NCA4LjQ3ODc3IDYuOTQ1NzkgOC41NDI5N0M3LjI3OTUgOC42NDg5OCA3LjU4MzA3IDguNjM0MDIgNy44MjMxMiA4LjU5ODE3QzguMDkwNzggOC41NTgxNCA4LjY0NzE3IDguMjYxMTcgOC43NjMzNSA3LjkzNTg0QzguODc5MzkgNy42MTA0MyA4Ljg3OTM5IDcuMzMxNTkgOC44NDQ1MSA3LjI3MzQzQzguODA5NzYgNy4yMTUzNCA4LjcxNjg2IDcuMTgwNTMgOC41Nzc2MSA3LjExMDc2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" alt="Instagram logo"/>
                                <a href={this.props.contact_info.whatsapp_link} target="_blank">{this.props.contact_info.whatsapp_number}</a>
                            </div>
                            <div className="instagram">
                                <img src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0xMS45ODgyIDMuNTI4MDNDMTEuOTYgMi44OTA0MyAxMS44NTY5IDIuNDUyMDggMTEuNzA5MiAyLjA3MjI0QzExLjU1NjkgMS42NjkwNiAxMS4zMjI0IDEuMzA4MDkgMTEuMDE1MyAxLjAwODAxQzEwLjcxNTIgMC43MDMyNjIgMTAuMzUxOSAwLjQ2NjQ2MSA5Ljk1MzM3IDAuMzE2NDY4QzkuNTcxMzQgMC4xNjg3NjUgOS4xMzUyOCAwLjA2NTY1NjEgOC40OTc2OCAwLjAzNzU0MzlDNy44NTUzMSAwLjAwNzA1MDkzIDcuNjUxMzggMCA2LjAyMjE2IDBDNC4zOTI5NCAwIDQuMTg5MDEgMC4wMDcwNTA5MyAzLjU0OTAyIDAuMDM1MTYzMUMyLjkxMTQyIDAuMDYzMjc1MyAyLjQ3MzA3IDAuMTY2NDc1IDIuMDkzMzMgMC4zMTQwODdDMS42OTAwNSAwLjQ2NjQ2MSAxLjMyOTA4IDAuNzAwODgyIDEuMDI5IDEuMDA4MDFDMC43MjQyNTcgMS4zMDgwOSAwLjQ4NzU0OCAxLjY3MTQ0IDAuMzM3NDY0IDIuMDY5OTVDMC4xODk3NjEgMi40NTIwOCAwLjA4NjY1MjEgMi44ODgwNSAwLjA1ODU0IDMuNTI1NjVDMC4wMjgwNDcgNC4xNjgwMiAwLjAyMDk5NjEgNC4zNzE5NSAwLjAyMDk5NjEgNi4wMDExN0MwLjAyMDk5NjEgNy42MzA0IDAuMDI4MDQ3IDcuODM0MzIgMC4wNTYxNTkyIDguNDc0MzFDMC4wODQyNzEzIDkuMTExOTIgMC4xODc0NzEgOS41NTAyNyAwLjMzNTE3NCA5LjkzMDFDMC40ODc1NDggMTAuMzMzMyAwLjcyNDI1NyAxMC42OTQzIDEuMDI5IDEwLjk5NDNDMS4zMjkwOCAxMS4yOTkxIDEuNjkyNDMgMTEuNTM1OSAyLjA5MDk1IDExLjY4NTlDMi40NzMwNyAxMS44MzM2IDIuOTA5MDQgMTEuOTM2NyAzLjU0NjczIDExLjk2NDhDNC4xODY2MyAxMS45OTMgNC4zOTA2NSAxMiA2LjAxOTg3IDEyQzcuNjQ5MDkgMTIgNy44NTMwMiAxMS45OTMgOC40OTMwMSAxMS45NjQ4QzkuMTMwNjEgMTEuOTM2NyA5LjU2ODk2IDExLjgzMzYgOS45NDg3IDExLjY4NTlDMTAuNzU1MiAxMS4zNzQxIDExLjM5MjggMTAuNzM2NSAxMS43MDQ2IDkuOTMwMUMxMS44NTIyIDkuNTQ3OTggMTEuOTU1NCA5LjExMTkyIDExLjk4MzUgOC40NzQzMUMxMi4wMTE2IDcuODM0MzIgMTIuMDE4NyA3LjYzMDQgMTIuMDE4NyA2LjAwMTE3QzEyLjAxODcgNC4zNzE5NSAxMi4wMTYzIDQuMTY4MDIgMTEuOTg4MiAzLjUyODAzWk0xMC45MDc1IDguNDI3NDNDMTAuODgxNyA5LjAxMzQ4IDEwLjc4MzMgOS4zMjk5NSAxMC43MDEyIDkuNTQwOTNDMTAuNDk5NiAxMC4wNjM3IDEwLjA4NDcgMTAuNDc4NiA5LjU2MTkxIDEwLjY4MDJDOS4zNTA5MyAxMC43NjIzIDkuMDMyMTcgMTAuODYwNyA4LjQ0ODQxIDEwLjg4NjVDNy44MTU0OCAxMC45MTQ3IDcuNjI1NjUgMTAuOTIxNiA2LjAyNDU0IDEwLjkyMTZDNC40MjM0MyAxMC45MjE2IDQuMjMxMjIgMTAuOTE0NyAzLjYwMDU4IDEwLjg4NjVDMy4wMTQ1MyAxMC44NjA3IDIuNjk4MDYgMTAuNzYyMyAyLjQ4NzA4IDEwLjY4MDJDMi4yMjY5MyAxMC41ODQxIDEuOTkwMTMgMTAuNDMxNyAxLjc5NzkyIDEwLjIzMjVDMS41OTg2NiAxMC4wMzc5IDEuNDQ2MjkgOS44MDM0NiAxLjM1MDE0IDkuNTQzMzFDMS4yNjgwOSA5LjMzMjMzIDEuMTY5NjYgOS4wMTM0OCAxLjE0MzkyIDguNDI5ODFDMS4xMTU3MiA3Ljc5Njg3IDEuMTA4NzYgNy42MDY5NSAxLjEwODc2IDYuMDA1ODRDMS4xMDg3NiA0LjQwNDczIDEuMTE1NzIgNC4yMTI1MiAxLjE0MzkyIDMuNTgxOTdDMS4xNjk2NiAyLjk5NTkyIDEuMjY4MDkgMi42Nzk0NSAxLjM1MDE0IDIuNDY4NDdDMS40NDYyOSAyLjIwODIzIDEuNTk4NjYgMS45NzE1MiAxLjgwMDMgMS43NzkyMkMxLjk5NDggMS41Nzk5NiAyLjIyOTIyIDEuNDI3NTkgMi40ODk0NiAxLjMzMTUzQzIuNzAwNDQgMS4yNDk0OCAzLjAxOTI5IDEuMTUxMDQgMy42MDI5NiAxLjEyNTIyQzQuMjM1ODkgMS4wOTcxMSA0LjQyNTgxIDEuMDkwMDYgNi4wMjY4MyAxLjA5MDA2QzcuNjMwMzIgMS4wOTAwNiA3LjgyMDE1IDEuMDk3MTEgOC40NTA3OSAxLjEyNTIyQzkuMDM2ODQgMS4xNTEwNCA5LjM1MzMxIDEuMjQ5NDggOS41NjQyOSAxLjMzMTUzQzkuODI0NDQgMS40Mjc1OSAxMC4wNjEyIDEuNTc5OTYgMTAuMjUzNCAxLjc3OTIyQzEwLjQ1MjcgMS45NzM4IDEwLjYwNTEgMi4yMDgyMyAxMC43MDEyIDIuNDY4NDdDMTAuNzgzMyAyLjY3OTQ1IDEwLjg4MTcgMi45OTgyMSAxMC45MDc1IDMuNTgxOTdDMTAuOTM1NiA0LjIxNDkgMTAuOTQyNyA0LjQwNDczIDEwLjk0MjcgNi4wMDU4NEMxMC45NDI3IDcuNjA2OTUgMTAuOTM1NiA3Ljc5NDQ5IDEwLjkwNzUgOC40Mjc0M1oiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik02LjAyMjA5IDIuOTE4NDZDNC4zMjAyNSAyLjkxODQ2IDIuOTM5NDUgNC4yOTkxNiAyLjkzOTQ1IDYuMDAxMDlDMi45Mzk0NSA3LjcwMzAyIDQuMzIwMjUgOS4wODM3MiA2LjAyMjA5IDkuMDgzNzJDNy43MjQwMiA5LjA4MzcyIDkuMTA0NzIgNy43MDMwMiA5LjEwNDcyIDYuMDAxMDlDOS4xMDQ3MiA0LjI5OTE2IDcuNzI0MDIgMi45MTg0NiA2LjAyMjA5IDIuOTE4NDZaTTYuMDIyMDkgOC4wMDA3MkM0LjkxODAyIDguMDAwNzIgNC4wMjI0NiA3LjEwNTI1IDQuMDIyNDYgNi4wMDEwOUM0LjAyMjQ2IDQuODk2OTMgNC45MTgwMiA0LjAwMTQ2IDYuMDIyMDkgNC4wMDE0NkM3LjEyNjI0IDQuMDAxNDYgOC4wMjE3MSA0Ljg5NjkzIDguMDIxNzEgNi4wMDEwOUM4LjAyMTcxIDcuMTA1MjUgNy4xMjYyNCA4LjAwMDcyIDYuMDIyMDkgOC4wMDA3MloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik05Ljk0NjczIDIuNzk2NjhDOS45NDY3MyAzLjE5NDEgOS42MjQ0OSAzLjUxNjM0IDkuMjI2OTggMy41MTYzNEM4LjgyOTU2IDMuNTE2MzQgOC41MDczMiAzLjE5NDEgOC41MDczMiAyLjc5NjY4QzguNTA3MzIgMi4zOTkxNyA4LjgyOTU2IDIuMDc3MDMgOS4yMjY5OCAyLjA3NzAzQzkuNjI0NDkgMi4wNzcwMyA5Ljk0NjczIDIuMzk5MTcgOS45NDY3MyAyLjc5NjY4WiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Whatsapp logo"/>
                                <a href={this.props.contact_info.instagram_link} target="_blank">{this.props.contact_info.instagram_alias}</a>
                            </div>
                        </div>
                        <div className="copyright">&copy; Светлана Ганиева {new Date().getFullYear()}</div>
                        <div className="extra-info">
                            <div className="copyright-tablet">&copy; Светлана Ганиева {new Date().getFullYear()}</div>
                            <a href="https://suleimanoff.me/" target="_blank" className="website_developer">разработано lllumineux</a>
                        </div>

                    </footer>
                ) : ""}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    contact_info: state.general_info.contact_info,
    isFooterShown: state.page_management.isFooterShown
});

export default connect(mapStateToProps, { getContactInfo })(Footer);
