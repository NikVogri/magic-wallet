import { useState } from "react";
import useETHBalance from "../../hooks/useETHBalance";
import useERC20Balances from "../../hooks/useERC20Balances";
import { useUser } from "../../context/UserContext";
import { formatETH, formatERC20 } from "../../utils/format";

import Send from "../Send";
import Receive from "../Receive";
import CopyUserAddress from "../CopyUserAddress/CopyUserAddress";

import styles from "./Wallet.module.scss";

const Wallet = (): JSX.Element | null => {
    const [send, setSend] = useState(false);
    const [receive, setReceive] = useState(false);
    const user = useUser();

    const [ethBalance, reloadEth] = useETHBalance();
    const [balances, fetchUserErc20] = useERC20Balances();

    const reloader = () => {
        reloadEth();
        fetchUserErc20();
    };

    console.log(
        "balances",
        balances.filter((token) => token.balance.gt(0)),
    );

    if (!user) {
        return null;
    }

    if (send) {
        return <Send goBackToWallet={() => setSend(false)} />;
    }

    if (receive) {
        return <Receive goBackToWallet={() => setReceive(false)} />;
    }

    return (
        <section className={styles.wallet}>
            <div className={styles.wallet__balance}>
                <span>Your Balance</span>
                <p className={styles.wallet__totalBalance}>
                    {formatETH(ethBalance)} ETH
                </p>

                <span>Your Address</span>
                <CopyUserAddress address={user.address} color="blue" />
            </div>

            <div className={styles.main}>
                <button onClick={reloader} className={styles.main__reloadBtn}>
                    Reload Quantities
                </button>
                <div className={styles.main__quantity}>
                    {balances.map((token) => (
                        <div key={token.symbol}>
                            {token.balance.gt(0) && (
                                <div className={styles.quantity__item}>
                                    <img
                                        alt={`${token.name} Logo`}
                                        src={token.logoURI}
                                    />
                                    <div>
                                        <span>
                                            {formatERC20(
                                                token.balance,
                                                token.decimals,
                                            )}{" "}
                                            {token.symbol}
                                        </span>
                                        {/* <small>$150 USD</small> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.wallet__buttons}>
                <button onClick={() => setSend(true)}>Send</button>
                <button onClick={() => setReceive(true)}>Receive</button>
            </div>
        </section>
    );
};

export default Wallet;
