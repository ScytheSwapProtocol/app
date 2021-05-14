import { useEthers } from "@usedapp/core";
import { AssetInfo } from "constant/types";
import { SocketContext } from "context/socket";
import { useContext, useEffect, useState } from "react";

const useAllowance = () => {
  const { account } = useEthers();
  const socket = useContext(SocketContext);
  const [allowance, setAllowance] = useState<{ [key: string]: boolean }>({});

  const toggleAllowance = (roomId?: string, assets?: AssetInfo[]) => {
    if (!account || !roomId) return;
    socket.emit("change_allowance", {
      user_wallet: account,
      room_id: roomId,
      is_approved: !allowance[account],
      assets: assets || [],
    });
  };

  useEffect(() => {
    socket.on(
      "allowance_changed",
      (_: string, wallet: string, is_approved: string) => {
        setAllowance((_allowance: any) => ({
          ..._allowance,
          [wallet]: is_approved,
        }));
      }
    );

    return () => {
      socket.off("allowance_changed");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    allowance,
    toggleAllowance,
  };
};

export default useAllowance;
