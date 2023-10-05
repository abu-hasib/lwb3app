import Head from "next/head";
import styles from "../styles/Home.module.css";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl"

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function fetchNFT() {
      if(!router.isReady) return;
      const { nftId } = router?.query;
      const res = await fetch(`http://localhost:8000/files/${nftId}`);
      if (res.ok) setData(await res.json());
      console.log({data})
    }
    fetchNFT();
  }, [router.isReady]);

  const { loggedIn } = useCurrentUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>FCL Next Scaffold</title>
        <meta
          name="description"
          content="FCL Next Scaffold for the Flow Blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data?.files?.map((nft) => (
          <div className={styles.card}>
            <div className={styles.imgContainer}>
              <img className={styles.imgCard} src={nft.url} alt={nft.ownerId} />
            </div>
            <div>
              <h4>NFT Cheerios</h4>
              <p>{nft.username}</p>
              <img src={nft.avatar} alt="" />
              {loggedIn && <button className={styles.button} onClick={fcl.authenticate}>Buy</button>}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
