import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
// import { useEffect, useState } from "react";

import { fetchCoins } from "../api";
import { isDarkAtom } from "./../atoms";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.div`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;

  a {
    padding: 20px;
    transition: color 0.125s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {
    setDarkAtom((prev) => !prev);
  };
  const { isLoading, data } = useQuery<ICoins[]>({
    queryKey: ["allCoins"],
    queryFn: fetchCoins,
  });
  /*  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      const res = await fetch("https://api.coinpaprika.com/v1/coins");
      const data = await res.json();
      setCoins(data.slice(0, 7));
      setLoading(false);
    })();
  }, []); */

  return (
    <Container>
      <Helmet>
        <title>Coins | Nomad Coin</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={toggleDarkAtom}>Toggle Theme</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 20).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  // 이걸로 coin에서 데이터가 fetch 되기도 전에 타이틀을 달아 줄 수 있음
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt=""
                ></Img>
                {coin.name} →
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
