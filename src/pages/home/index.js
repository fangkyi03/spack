import React from 'react'
import { View, Input,Button, Image} from 'remax/wechat'
import styles from  './index.module.css'
function getSize(size) {
    return size / 7.5 + 'vw'
}
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
                <Input/>
                <Button>123123</Button>
                <Image 
                    src={'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1752460159,226752426&fm=26&gp=0.jpg'}
                    style={{width:getSize(200),height:getSize(200)}}
                />
            </View>
        );
    }
}
export default Home;