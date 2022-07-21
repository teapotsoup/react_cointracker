import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width:480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Loader = styled.h2`
    text-align:center;
`

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${props => props.theme.accentColor}
`


type Cointypes = {
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
                        <NavLink to={`/${coin.id}`}>{coin.name} &rarr;</NavLink>
                    </Coin>
                ))}
            </CoinsList>}


        </Container>
    );
}

export default Coins