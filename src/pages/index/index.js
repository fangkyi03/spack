import React from 'react'
import {Button,View} from 'remax/one'
export default function Index() {
    function onJump() {
        window.location.href = '/home'
    }
    return (
        <View style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
            <Button onTap={onJump}>点击跳转页面</Button>
        </View>
    )
}
