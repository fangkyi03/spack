import React from 'react'
import Header from '../../component/header'
import { View, Text,Button,Input } from 'remax/one'
class Home extends React.Component {

    onTest = () => {
        console.log('object',)
    }

    onInputChange = (data) => {
        console.log('data',data)
    }

    render() {
        return (
            <div>
                <Input onInput={this.onInputChange}></Input>
                <Text onTap={this.onTest}>12313</Text>
            </div>
        );
    }
}
export default Home;