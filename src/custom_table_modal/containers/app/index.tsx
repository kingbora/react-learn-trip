import * as React from "react";
import CustomModal from "../custom_modal";
import { Button } from "antd";
import { connect } from "react-redux";
import { showModal } from "../custom_modal/actions";

interface AppProps {}

interface AppDispatchProps {
    showModal?: Function;
}

interface AppState {}

@(connect(
    (state: any) => ({

    }),
    (dispatch: any) => ({
        showModal: () => {
            dispatch(showModal());
        }
    })
) as any)
export default class  App extends React.Component<AppProps & AppDispatchProps, AppState> {
    constructor(props: AppProps & AppDispatchProps) {
        super(props);
    }

    showModal = () => {
        this.props.showModal();
    };

    render() {
        return (
            <div>
                <Button onClick={this.showModal}>查看</Button>
                <CustomModal />
            </div>
        )
    }
}