// import { http,useReadContract} from "wagmi";
// import { Mainnet, WagmiWeb3ConfigProvider, MetaMask } from '@ant-design/web3-wagmi';
// import { Address, NFTCard, ConnectButton, Connector,useAccount } from "@ant-design/web3";


// const CallTest = () => {
//     const { account } = useAccount();
//     const result = useReadContract({
//       abi: [
//         {
//           type: 'function',
//           name: 'balanceOf',
//           stateMutability: 'view',
//           inputs: [{ name: 'account', type: 'address' }],
//           outputs: [{ type: 'uint256' }],
//         },
//       ],
//       address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
//       functionName: 'balanceOf',
//       args: [account?.address as `0x${string}`],
//     });
    



// export default function Web3() {
//   return (
//     <WagmiWeb3ConfigProvider
//       chains={[Mainnet]}
//       transports={{
//         // [Mainnet.id]: http(),
//         [Mainnet.id]: http('https://api.zan.top/node/v1/eth/mainnet/2024ce83acb2454da658149988b1275d'),
//       }}
// 	  wallets={[MetaMask()]}
//     >
//       <Address format address="0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc" />
//       <NFTCard
//         address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9"
//         tokenId={641}
//       />
//       <Connector>
//         <ConnectButton />
//       </Connector>
//     </WagmiWeb3ConfigProvider>
//   );
// }
// // await window.ethereum.request({ method: "eth_chainId" }); // 0x1 代表以太坊主网




import { parseEther } from "viem";
import { Button, message } from "antd";
import { http, useReadContract, useWriteContract } from "wagmi";
import { Mainnet, WagmiWeb3ConfigProvider, MetaMask } from '@ant-design/web3-wagmi';
import { Address, NFTCard, ConnectButton, Connector, useAccount } from "@ant-design/web3";


const CallTest = () => {
  const { account } = useAccount();
  const result = useReadContract({
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }],
      },
    ],
    address: '0xEcd0D12E21805803f70de03B72B1C162dB0898d9',
    functionName: 'balanceOf',
    args: [account?.address as `0x${string}`],
  });


  const { writeContract } = useWriteContract();
  return (
    <div>
      {result.data?.toString()}
      <Button
        onClick={() => {
          writeContract(
            {
              abi: [
                {
                  type: "function",
                  name: "mint",
                  stateMutability: "payable",
                  inputs: [
                    {
                      internalType: "uint256",
                      name: "quantity",
                      type: "uint256",
                    },
                  ],
                  outputs: [],
                },
              ],
              address: "0xEcd0D12E21805803f70de03B72B1C162dB0898d9",
              functionName: "mint",
              args: [BigInt(1)],
              value: parseEther("0.01"),
            },
            {
              onSuccess: () => {
                message.success("Mint Success");
              },
              onError: (err) => {
                message.error(err.message);
              },
            }
          );
        }}
      >
        mint
      </Button>
    </div>
  );
};

export default function Web3() {
  return (
    <WagmiWeb3ConfigProvider
      chains={[Mainnet]}
      transports={{
        [Mainnet.id]: http(),
      }}
      wallets={[MetaMask()]}
    >
      <Address format address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9" />
      <NFTCard
        address="0xEcd0D12E21805803f70de03B72B1C162dB0898d9"
        tokenId={641}
      />
      <Connector>
        <ConnectButton />
      </Connector>
      <CallTest />
    </WagmiWeb3ConfigProvider>
  );
}