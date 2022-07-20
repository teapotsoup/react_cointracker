import styled from 'styled-components'
import { useState } from 'react'

type ContainerProps = {
    bgColor: string,
    borderColor?: string
}

const Container = styled.div<ContainerProps>`
    width:200px;
    height:200px;
    background-color:${props => props.bgColor};
    border:1px solid ${props => props.borderColor};
    //border-color:${props => props.borderColor};
    border-radius:100px
`;

type CircleProps = {
    bgColor: string
    borderColor?: string
    text?: string;
}
type PlayerShape = {
    name: string;
    age: number;
}

const sayHello = (playerObj: PlayerShape) => `
    Hello Im ${playerObj.name}, ${playerObj.age} years old. 
`

const sh = sayHello({ name: "nico", age: 12 })


const Circle = ({ bgColor, borderColor, text = "default" }: CircleProps) => {
    const [] = useState()
    return (
        <>
            <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} >{text}</Container>
            {/*borderColor가 없다면 뒤에 있는 bgColor가 디폴트. 만약 옵셔널 프롭스 사용안한다면 기본컬러는 블랙이 된다.*/}
        </>
    )
}



export default Circle