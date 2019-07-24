/**
 * 商品列表
 */
import * as React from "react";
import { connect } from "react-redux";
import { List, Layout, Row, Col, Icon, Avatar, Button } from "antd";
import style from "./style.scss";
const { Sider, Content } = Layout;

interface ShoppingOwnProps { }
interface ShoppingStateProps {
    dataList?: any;
    shoppingCart?: any;
}
interface ShoppingDispatchProps { }
interface ShoppingState { }

@(connect(
    (state: any) => ({
        dataList: state.shoppingReducer.dataList,
        shoppingCart: state.shoppingReducer.shoppingCart
    }),
    (dispatch: any) => ({

    })
) as any)
export default class Shopping extends React.Component<ShoppingOwnProps & ShoppingStateProps & ShoppingDispatchProps, ShoppingState> {
    constructor(props: ShoppingOwnProps & ShoppingStateProps & ShoppingDispatchProps) {
        super(props);
    }

    addToCart = (item: any, index: any) => {

    };

    removeFromCart = (item: any, index: any) => {

    };

    renderItem = (item: any, index: number) => {
        return (
            <List.Item actions={[<a onClick={() => this.addToCart(item, index)}>
                <Icon type="plus-circle" />
            </a>,
            <span>0</span>,
            <a onClick={() => this.removeFromCart(item, index)}>
                <Icon type="minus-circle" />
            </a>]}>
                <List.Item.Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.foodName}
                    description={item.description}
                />
                <div>¥{item.price}</div>
            </List.Item>
        );
    };

    onClearAll = () => {

    };

    render() {
        const { dataList, shoppingCart } = this.props;
        return (
            <Layout className={style.shoppingCart}>
                <Content>
                    <List
                        dataSource={dataList}
                        renderItem={this.renderItem}
                    />
                </Content>
                <Sider className={style.cartList}>
                    <p>
                        <div className={style.rowStyle}>
                            <div>已选商品</div>
                            <div>
                                <Button onClick={this.onClearAll}>
                                    <Icon type="delete" />清空
                                </Button>
                            </div>
                        </div>
                        <List
                            dataSource={shoppingCart}
                        />
                    </p>
                    <p>
                        <div className={style.rowStyle}>
                            <div>共0件</div>
                            <div>总金额：¥0</div>
                        </div>
                    </p>
                </Sider>
            </Layout>
        );
    }
}