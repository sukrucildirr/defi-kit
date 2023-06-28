import { AVATAR, PresetAllowEntry, c } from "zodiac-roles-sdk"

import { Pool, Token } from "./types"
import { allowErc20Approve } from "../../erc20"
import { allow } from "zodiac-roles-sdk/kit"
import { contracts } from "../../../eth-sdk/config"

export const deposit = (pool: Pool) => {
  return [
    ...allowErc20Approve(pool.tokens, [contracts.mainnet.balancer.vault]),

    allow.mainnet.balancer.relayer.multicall(
      c.every(
        c.or(
          c.calldataMatches(
            allow.mainnet.balancer.relayerLibrary.joinPool(
              pool.id,
              undefined, // TODO kind??
              AVATAR,
              AVATAR,
              {
                assets: pool.tokens, // TODO
              }
            )
          ),


          c.calldataMatches(),


          ...
        )
      )
    ),
  ]
}

export const swap = (
  pool: Pool,
  sell: Token[] | undefined,
  buy: Token[] | undefined
) => {
  const result: PresetAllowEntry[] = []

  return result
}
