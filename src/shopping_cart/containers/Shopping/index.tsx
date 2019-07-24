/**
 * 商品列表
 */
import * as React from "react";
import { connect } from "react-redux";
import { List, Layout, Row, Col, Icon, Avatar, Button, Affix, Drawer } from "antd";
import style from "./style.scss";
const { Header, Content } = Layout;

interface ShoppingOwnProps { }
interface ShoppingStateProps {
    dataList?: any;
    shoppingCart?: any;
}
interface ShoppingDispatchProps { }
interface ShoppingState {
    isShowCart: boolean;
}

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
        this.state = {
            isShowCart: false
        };
    }

    // 添加进购物车
    addToCart = (item: any, index: any) => {

    };

    // 从购物车中移除
    removeFromCart = (item: any, index: any) => {

    };

    // 商品列表物品详情
    renderItem = (item: any, index: number) => {
        return (
            <List.Item actions={[
                <a onClick={() => this.removeFromCart(item, index)}>
                    <Icon type="minus-circle" />
                </a>,
                // 计算该物品添加的次数
                <span>0</span>,
                <a onClick={() => this.addToCart(item, index)}>
                    <Icon type="plus-circle" theme="filled" />
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

    // 购物车中物品详情
    renderShoppingCartItem = (item: any, index: number) => {
        return (
            <div></div>
        );
    }

    // 清除购物车中所有商品
    onClearAll = () => {

    };

    // 打开购物车抽屉
    openShoppingCartDrawer = () => {
        this.setState({
            isShowCart: true
        });
    };

    closeShoppingCardDrawer = () => {
        this.setState({
            isShowCart: false
        });
    };

    renderDrawerHeader = () => {
        return (
            <div className={style.rowStyle}>
                <span className={style.greyText}>已选商品</span>
                <div onClick={this.onClearAll} className={style.clearAll}>
                    <Icon type="delete" /><span style={{marginLeft: '4px', color: '#333'}}>清空</span>
                </div>
            </div>
        )
    };

    render() {
        const { dataList, shoppingCart } = this.props;
        const { isShowCart } = this.state;
        return (
            <Layout className={style.shoppingCart}>
                <Header className={style.whiteText}>商品列表</Header>
                <Content className={style.shoppingList}>
                    <List
                        dataSource={dataList}
                        renderItem={this.renderItem}
                    />
                </Content>
                <div className={style.shoppingCartFixed}>
                    <Button onClick={this.openShoppingCartDrawer} className={style.shoppingCartBtn}>
                        <Icon type="shopping-cart" />
                    </Button>
                    <div className={style.totalInfo}>
                        <div>共0件</div>
                        <div>总金额：¥0</div>
                    </div>
                </div>
                {/* 存放已选商品列表 */}
                <Drawer
                    title={this.renderDrawerHeader()}
                    placement="bottom"
                    closable={false}
                    maskClosable={true}
                    onClose={this.closeShoppingCardDrawer}
                    visible={isShowCart}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </Layout>
        );
    }
}