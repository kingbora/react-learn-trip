import * as React from "react";
import { Upload, Button, Icon, Col, Row, Layout } from "antd";
import BarEchart from "./echarts/BarEchart";
const { Header, Content } = Layout;

interface ContainerProps { }

interface ContainerState {
    fileData: any;
}

export default class Container extends React.Component<ContainerProps, ContainerState> {
    private uploadConfig: any;
    constructor(props: ContainerProps) {
        super(props);
        this.state = {
            fileData: []
        };
        this.uploadConfig = {
            name: 'file',
            beforeUpload: this.beforeUpload,
            accept: '.json'
        }
    }

    beforeUpload = (file: any, fileList: any) => {
        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');
        reader.onload = (evt: any) => {
            try {
                const json = JSON.parse(evt.target.result);
                this.setState({
                    fileData: [...json]
                });
            } catch (error) {
                alert("请上传正确格式的json结构");
            }
        }
        return false;
    };

    handleBatchDownload = () => {
        const listA = document.querySelectorAll("a[download]");
        if (listA) {
            listA.forEach((item: any) => {
                item.click();
            });
        }
    };

    render() {
        const { fileData } = this.state;
        return (
            <Layout>
                <Header>
                    <Row type="flex" gutter={24} justify="space-between">
                        <Col span={4}>
                            <Upload {...this.uploadConfig}>
                                <Button>
                                    <Icon type="upload" />请选择文件
                                </Button>
                            </Upload>
                        </Col>
                        <Col span={4}>
                            <Button onClick={this.handleBatchDownload}>
                                <Icon type="download" />
                                批量下载
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {
                        fileData.map((data: any, index: any) => {
                            console.log(data.name + index);
                            return (
                                <BarEchart key={data.name + index} data={data} />
                            );
                        })
                    }
                </Content>
            </Layout>
        )
    }
}