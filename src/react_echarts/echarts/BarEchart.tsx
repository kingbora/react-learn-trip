import * as React from "react";
import { Card } from "antd";
import ReactEcharts from "echarts-for-react";
import style from "./style.scss";

interface BarEchartProps {
    data: any;
}

interface BarEchartState {
    downloadUrl: string;
}

export default class BarEchart extends React.Component<BarEchartProps, BarEchartState> {
    private echartsNode: any;
    constructor(props: BarEchartProps) {
        super(props);

        this.state = {
            downloadUrl: ''
        };
    }

    componentDidMount() {
        setTimeout(() => {
            const echartsInstance = this.echartsNode.getEchartsInstance();
            const base64 = echartsInstance.getDataURL();
            this.setState({
                downloadUrl: base64
            });
        }, 2500);
    }

    generateOption = () => {
        const { data } = this.props;
        let isVertical = true;
        const options = {
            backgroundColor: "#fff",
            legend: {
                data: []
            },
            calculable: false,
            xAxis: [],
            yAxis: [],
            series: [],
            animation: {
                animationDuration: 2000
            }
        };

        if (data.title) {
            options['title'] = {
                text: data.title,
                subtitle: data.subtitle,
                x: 'center'
            };  
        }

        data.data.map((item: any) => {
            if (item.name) {
                options.legend.data.push(item.name);
            }

            if (data.xAxis.data) {
                options.xAxis.push({
                    type: "category",
                    data: data.xAxis.data
                });

                options.yAxis.push({
                    type: "value",
                    max: data.yAxis.max,
                    splitNumber: ~~((data.yAxis.max - data.yAxis.min) / data.yAxis.split)
                });
            } else if (data.yAxis.data) {
                isVertical = false;
                options.yAxis.push({
                    type: "category",
                    data: data.yAxis.data
                });

                options.xAxis.push({
                    type: "value",
                    max: data.xAxis.max,
                    splitNumber: ~~((data.xAxis.max - data.xAxis.min) / data.xAxis.split)
                });
            }
            options.series.push({
                name: item.name ? item.name : null,
                type: 'bar',
                data: item.data,
                itemStyle: {
                    normal: {
                        color: item.color,
                        label: {
                            show: true,
                            position: isVertical ? "top": "right"
                        }
                    }
                }
            });
        });

        return options;
    }

    getList = (opt: any) => {
        const tempArr = [];
        for (let i = opt.min; i <= opt.max; i += opt.split) {
            tempArr.push(i);
        }

        return tempArr;
    }

    render() {

        const { data } = this.props;
        const { downloadUrl } = this.state;

        return (
            <Card title={data.name} className={style.card} extra={<a href={downloadUrl} download={data.name + ".png"}>下载</a>}>
                <ReactEcharts
                    ref={(e: any) => this.echartsNode = e}
                    option={this.generateOption()}
                />
            </Card>
        );
    }
}