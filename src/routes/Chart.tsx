import { join } from "path";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";



export default function Chart() {
    const coinId = useOutletContext<string>()
    const params = useParams()//이걸 써도 된다.
    // console.log(fetchCoinHistory(coinId))
    return <h1>Chart</h1>;
}

