import React from 'react'
import { View,Text,Image,Button } from 'remax/wechat'
import styles from  './index.module.css'
class Home extends React.Component {

    onLoad = () => {
        console.log('图片加载')
    }

    onGetUserInfo = () => {
        console.log('object')
    }
    
    render() {
        return (
            <View className={styles.main}>
                <Button openType={'getUserInfo'} onGetUserInfo={this.onGetUserInfo}>12131</Button>
                <Text>123123123</Text>
                <Image 
                    onLoad={this.onLoad}
                    src={'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg'}
                    style={{width:100,height:100}}    
                />
            </View>
        );
    }
}
export default Home;