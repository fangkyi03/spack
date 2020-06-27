import React from 'react'
import {Button,View, Image} from 'remax/wechat'
export default function Index() {
    function onJump() {
        window.location.href = '/home'
    }
    return (
        <View style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Button onTap={onJump}>点击跳转页面</Button>
            <Image src={require('../../image/a.png')} style={{width:100,height:100}}/>
        </View>
    )
}
