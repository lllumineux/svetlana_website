import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export class PopupWindow extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
        hidePopup: PropTypes.func.isRequired
    };

    onClick = e => {
        (e.target.classList.contains("overlay") || e.target.classList.contains("popup-window-close-btn")) ? this.props.hidePopup() : null
    }

    render() {
        return (
            <Fragment>
                <div className="overlay" onClick={this.onClick}>
                    <div className="popup-window">
                        <img className="popup-window-close-btn hover-animation" onClick={this.onClick} src="data:image/svg+xml;base64, PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+CjxwYXRoIGQ9Ik0xMS44MzIzIDEwLjAxNjRMMTkuNjIgMi4yMjg1NkMyMC4xMjY4IDEuNzIxOTkgMjAuMTI2OCAwLjkwMjk0MSAxOS42MiAwLjM5NjM3NEMxOS4xMTM0IC0wLjExMDE5MyAxOC4yOTQzIC0wLjExMDE5MyAxNy43ODc4IDAuMzk2Mzc0TDkuOTk5OTEgOC4xODQyMUwyLjIxMjI5IDAuMzk2Mzc0QzEuNzA1NDkgLTAuMTEwMTkzIDAuODg2NjcyIC0wLjExMDE5MyAwLjM4MDEwNCAwLjM5NjM3NEMtMC4xMjY3MDEgMC45MDI5NDEgLTAuMTI2NzAxIDEuNzIxOTkgMC4zODAxMDQgMi4yMjg1Nkw4LjE2NzczIDEwLjAxNjRMMC4zODAxMDQgMTcuODA0MkMtMC4xMjY3MDEgMTguMzEwOCAtMC4xMjY3MDEgMTkuMTI5OSAwLjM4MDEwNCAxOS42MzY0QzAuNjMyNTU4IDE5Ljg4OTEgMC45NjQ0OTYgMjAuMDE2IDEuMjk2MiAyMC4wMTZDMS42Mjc5IDIwLjAxNiAxLjk1OTYgMTkuODg5MSAyLjIxMjI5IDE5LjYzNjRMOS45OTk5MSAxMS44NDg2TDE3Ljc4NzggMTkuNjM2NEMxOC4wNDA1IDE5Ljg4OTEgMTguMzcyMiAyMC4wMTYgMTguNzAzOSAyMC4wMTZDMTkuMDM1NiAyMC4wMTYgMTkuMzY3MyAxOS44ODkxIDE5LjYyIDE5LjYzNjRDMjAuMTI2OCAxOS4xMjk5IDIwLjEyNjggMTguMzEwOCAxOS42MiAxNy44MDQyTDExLjgzMjMgMTAuMDE2NFoiIGZpbGw9IiM4ODg4ODgiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K" alt="Close Popup Button" />
                        <h2>{this.props.title}</h2>
                        <div className="popup-window-content">{this.props.content}</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
