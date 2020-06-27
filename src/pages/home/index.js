import React from 'react'
import { View,Text,Image } from 'remax/one'
import styles from  './index.module.css'
class Home extends React.Component {

    onLoad = () => {
        console.log('图片加载')
    }

    render() {
        return (
            <View className={styles.main}>
                <Text>测试页面</Text>
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