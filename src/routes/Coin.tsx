import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom"
import styled from "styled-components";
import { Container, Header, Loader } from "./Coins";

const Title = styled.h1`
  font-size: 48px;
  align-items: center;
`;

type RouteParams = {
    coinId: string
}

interface LocationState {
    state: {
        name: string;
        rank: number;
    }
};


interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}


interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string
            ath_price: number
            market_cap: number
            market_cap_change_24h: number
            percent_change_1h: number
            percent_change_1y: number
            percent_change_6h: number
            percent_change_7d: number
            percent_change_12h: number
            percent_change_15m: number
            percent_change_24h: number
            percent_change_30d: number
            percent_change_30m: number
            percent_from_price_ath: number
            price: number
            volume_24h: number
            volume_24h_change_24h: number
        }
    };

}
function Coin() {
    const [info, setInfo] = useState<InfoData>()
    const [priceInfo, setPriceInfo] = useState<PriceData>()
    const [loading, setLoading] = useState<boolean>(true)
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation() as LocationState;

    useEffect(() => {
        const getCoins = async () => {
            const res1 = await axios(`https://api.coinpaprika.com/v1/coins/${coinId}`);
            const res2 = await axios(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
            // console.log(res1.data)
            // console.log(res2.data)
            setInfo(res1.data)
            setPriceInfo(res2.data)
            setLoading(false);
        };
        getCoins();
        // console.log(info)
        // console.log(priceInfo)
    }, [coinId]);
    const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
  `;
    const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
      font-size: 10px;
      font-weight: 400;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
  `;
    const Description = styled.p`
    margin: 20px 0px;
  `;
    return (
        <Container>
            <Header>
                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : info?.name}
                </Title>
            </Header>

            {loading ? <Loader>Loading...</Loader> : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply:</span>
                            <span>{priceInfo?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Outlet />
                </>
            )}
        </Container>
    )

}

export default Coin