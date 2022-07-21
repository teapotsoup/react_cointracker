import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 20px;
  max-width:480px;
  margin: 0 auto;
`;

export const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

export const Loader = styled.h2`
    text-align:center;
    display:block
`
const Img = styled.img`
    width:50px;
    height:50px;
    margin-right: 10px;
`
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  padding:5px;
  display:flex;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor}
`


export type Cointypes = {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins() {

    const [coins, setCoins] = useState<Cointypes[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const getCoins = async () => {
        const res = await axios("https://api.coinpaprika.com/v1/coins");
        setCoins(res.data.slice(0, 100));
        setLoading(false);
    };
    useEffect(() => {
        getCoins();
    });
    return (
        <Container>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : <CoinsList>
                {coins.map((coin) => (
                    <Coin key={coin.id}>


                        <NavLink to={`/${coin.id}`} state={{ name: coin.name }}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;</NavLink>

                    </Coin>
                ))}
            </CoinsList>}


        </Container>
    );
}

export default Coins