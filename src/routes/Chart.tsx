import { useQuery } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";


type HistoricalTypes = {
    time_open: number
    time_close: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    market_cap: number
}


export default function Chart() {
    function Unix_timestamp(t: number): string {
        var date = new Date(t * 1000);
        var year = date.getFullYear();
        var month = "0" + (date.getMonth() + 1);
        var day = "0" + date.getDate();
        return year + "-" + month.substr(-2) + "-" + day.substr(-2);
    }
    const coinId = useOutletContext<string>()
    const params = useParams()//이걸 써도 된다.
    const { isLoading, data } = useQuery<HistoricalTypes[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId), {
        refetchInterval: 10000,
    }
    );
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) => Number(price.close)) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                            //datetimeFormatter: { month: "mmm 'yy" },
                            type: "datetime",
                            categories: data?.map((price) => Unix_timestamp(price.time_close)),
                        },
                        fill: {
                            type: "gradient",
                            gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(0)}`,
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

