import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";

import styles from "./CopyUserAddress.module.scss";

type CopyUserAddressProps = {
    address: string;
    color: "blue" | "gray";
};

const CopyUserAddress = ({
    address,
    color,
}: CopyUserAddressProps): JSX.Element => {
    const [copied, setCopied] = useState<boolean>(false);

    const shortenUserAddress = (): string => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    useEffect(() => {
        let timeout = setTimeout(() => null, 5000);
        if (copied) {
            timeout = setTimeout(() => {
                setCopied(false);
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
            <div
                className={`${styles.copyUserAddress} ${
                    color === "blue"
                        ? styles.copyUserAddress__blue
                        : styles.copyUserAddress__gray
                }`}
            >
                <img
                    src={`/images/copy-${
                        color === "blue" ? "blue" : "gray"
                    }.svg`}
                    alt="Copy"
                />

                <p>{copied ? "Copied" : shortenUserAddress()}</p>
            </div>
        </CopyToClipboard>
    );
};

export default CopyUserAddress;
