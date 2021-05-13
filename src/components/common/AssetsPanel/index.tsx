import React, { FC } from "react";
import clsx from "clsx";
import styles from "./index.module.scss";

interface IAssetsPanel {
  owner?: boolean;
  connection?: string;
}

const AssetsPanel: FC<IAssetsPanel> = ({ owner = false, connection }) => {
  return (
    <div className={clsx(styles.wrapper, { [styles.owner]: owner })}>
      <div className={styles.panel}>
        <div className={styles.item}>1</div>
      </div>
    </div>
  );
};

export default AssetsPanel;
