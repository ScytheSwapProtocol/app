import React, { FC, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./index.module.scss";
import _ from "lodash";
import { AssetInfo } from "constant/types";
import { useEthers } from "@usedapp/core";
interface IAssetsPanel {
  owner?: boolean;
  address?: string;
  assets: AssetInfo[];
}

interface IAssetList {
  [id: string]: AssetInfo;
}

const AssetsPanel: FC<IAssetsPanel> = ({ owner = false, address, assets }) => {
  const { account } = useEthers();
  const length =
    account === address ? Math.max(assets.length, 8) : assets.length;
  const [selAssets, setSelAssets] = useState<IAssetList>({});

  const toggleAsset = (asset: AssetInfo) => {
    if (selAssets[asset.contract]) {
      const temp = { ...selAssets };
      delete temp[asset.contract];
      setSelAssets(temp);
    } else {
      setSelAssets({ ...selAssets, [asset.contract]: asset });
    }
  };

  useEffect(() => {
    if (!account) {
      setSelAssets({});
    }
  }, [account]);

  return (
    <div className={clsx(styles.wrapper, { [styles.owner]: owner })}>
      <div className={styles.panel}>
        {!!Object.keys(selAssets).length && (
          <div className={styles.info}>{`(${
            Object.keys(selAssets).length
          })`}</div>
        )}
        {account &&
          _.times(length, Number).map((idx: number) => (
            <div
              className={clsx(styles.item, {
                [styles.active]: assets[idx],
                [styles.selected]:
                  assets[idx] && selAssets[assets[idx].contract],
              })}
              key={idx}
              onDoubleClick={() => {
                if (!assets[idx]) return;
                toggleAsset(assets[idx]);
              }}
            >
              {assets[idx]
                ? `${assets[idx].name} (${assets[idx].type})`
                : idx + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AssetsPanel;
