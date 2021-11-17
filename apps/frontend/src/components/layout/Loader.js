import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";

export class SpinningLoader extends Component {
    render() {
        return (
            <Fragment>
                {this.props.isLoading ? (
                    <div className="loader-wrapper">
                        <Loader
                            type="Circles"
                            color="#cf8979"
                            height={50}
                            width={50}
                        />
                    </div>
                ): ""}
                {this.props.isLoading ? <style>{"html {overflow: hidden;}"}</style> : ""}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.page_management.isLoading
});

export default connect(mapStateToProps, {})(SpinningLoader)
