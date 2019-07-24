import * as React from "react";
import { Modal, Table, Popconfirm, Input, InputNumber } from "antd";
import { connect } from "react-redux";
import { hideModal, saveChangeData, deleteItemData } from "./actions";
import style from "./style.scss";

interface CustomModalOwnProps { }
interface CustomModalStateProps {
    visible?: boolean;
    dataSource?: any;
}
interface CustomModalDispatchProps {
    hideModal?: Function;
    saveChangeData?: Function;
    deleteItemData?: Function;
}
interface CustomModalState {
    currentRecord: any;
}

@(connect<CustomModalStateProps, CustomModalDispatchProps, CustomModalOwnProps, CustomModalState>(
    (state: any) => ({
        visible: state.customModalReducer.visible,
        dataSource: state.customModalReducer.dataSource,
    }),
    (dispatch: any) => ({
        hideModal: () => {
            dispatch(hideModal());
        },
        saveChangeData: (param: any) => {
            dispatch(saveChangeData(param));
        },
        deleteItemData:(param:any)=>{
            dispatch(deleteItemData(param));
        }
    })
) as any)
export default class CustomModal extends React.Component<CustomModalOwnProps & CustomModalStateProps & CustomModalDispatchProps, CustomModalState> {
    constructor(props: CustomModalOwnProps & CustomModalStateProps & CustomModalDispatchProps) {
        super(props);

        this.state = {
            currentRecord: null
        };
    }

    btnSure = () => {
        this.props.hideModal();
    };

    btnCancel = () => {
        this.props.hideModal();
    };

    onEdit = (record: any) => {
        this.setState({
            currentRecord: record
        });
    };

    onSave = (index: any) => {
        const param: any = {
            record: this.state.currentRecord,
            index
        };
        this.props.saveChangeData(param);
        this.setState({
            currentRecord: null
        });
    };

    onDelete = (record: any, index: any) => {
        const param: any = {
            record,
            index
        };
        this.props.deleteItemData(param);
    };

    onCancel = () => {
        this.setState({
            currentRecord: null
        });
    };

    inputChange = (e: any, rowIndex: string) => {
        const newRecord = {...this.state.currentRecord};
        newRecord[rowIndex] = e.target ? e.target.value : e;
        this.setState({
            currentRecord: newRecord
        });
    };

    renderColumns = (text: any, record: any, rowIndex: string) => {
        const { currentRecord } = this.state;
        if (currentRecord && currentRecord.id === record.id) {
            const Component: any = typeof text === "number" ? InputNumber : Input;
            return <Component value={currentRecord[rowIndex]} onChange={(e: any) => this.inputChange(e, rowIndex)} />;
        } else {
            return text;
        }
    };

    render() {
        const { visible, dataSource } = this.props;
        const columns: any = [{
            dataIndex: 'name',
            title: 'Name',
            render: (text: any, record: any) => this.renderColumns(text, record, 'name'),
        }, {
            dataIndex: 'age',
            title: 'Age',
            render: (text: any, record: any) => this.renderColumns(text, record, 'age'),
        }, {
            dataIndex: 'address',
            title: 'Address',
            render: (text: any, record: any) => this.renderColumns(text, record, 'address'),
        }, {
            dataIndex: 'operation',
            title: 'Operation',
            render: (text: any, record: any, index: any) => {
                const { currentRecord } = this.state;
                if (currentRecord) {
                    if (currentRecord.id === record.id) {
                        return (
                            <div className={style.operationStyle}>
                                <Popconfirm
                                    cancelText="取消"
                                    okText="确定"
                                    title="确定保存么？"
                                    onConfirm={() => this.onSave(index)}
                                    icon={null}
                                >
                                    <a>保存</a>
                                </Popconfirm>
                                <a onClick={this.onCancel}>取消</a>
                            </div>
                        );
                    } else {
                        return (
                            <div className={style.operationStyle}>
                                <a className={style.disabled}>编辑</a>
                                <a className={style.disabled}>删除</a>
                            </div>
                        );
                    }
                } else {
                    return (
                        <div className={style.operationStyle}>
                            <a onClick={() => this.onEdit(record)}>编辑</a>
                            <Popconfirm
                                onConfirm={() => this.onDelete(record, index)}
                                cancelText="取消"
                                okText="确定"
                                title="确定删除么？"
                                icon={null}
                            >
                                <a>删除</a>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        }];
        return (
            <Modal
                visible={visible}
                onOk={this.btnSure}
                onCancel={this.btnCancel}
                maskClosable={false}
                footer={null}
                wrapClassName={style.customModal}
            >
                <Table rowKey="id" dataSource={dataSource} columns={columns} />
            </Modal>
        );
    }
}