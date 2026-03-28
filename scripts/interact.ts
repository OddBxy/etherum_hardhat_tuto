import { createPublicClient, createWalletClient, http, parseEventLogs } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { parseAbiItem } from 'viem'

// Importe l'ABI (definition du contrat générée après la compilation par Hardhat qui sera exposé par les blockchain explorer)
import abi from '../artifacts/contracts/Counter.sol/Counter.json'; 



//script pour interagir avec le contrat sur la chaine


async function main() {

    //adresse de la chain où le contrat est deployé (locale dans ce cas)
    const transport = http("http://127.0.0.1:8545");

    //adresse du contrat récuperer après npx hardhat ignition deploy
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    //adresse du compte wallet (fausse adresse donne par npx hardhat node )
    const account = privateKeyToAccount("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

    //handle du compte wallet
    const walletClient = createWalletClient({
        account,
        chain: hardhat,
        transport,
    });


    //client publique (ne peux pas faire de tx, mais peut lire ce qui est exposé par le contrat, c'est du readOnly)
    const publicClient = createPublicClient({
        chain: hardhat,
        transport,
    });


    try {
        // compte wallet fait une tx à l'aide du contrat
        const hash = await walletClient.writeContract({
            address: contractAddress,
            abi: abi.abi,
            functionName: 'incBy',
            args: [5n], // n = BigInt pour les uint256 en Solidity
        });

        // Attente de la confirmation de la tx
        const receipt = await publicClient.waitForTransactionReceipt({ hash });

        // On recupere les logs du reçu en utilisant l'ABI pour la tx faites
        const logs = parseEventLogs({
            abi: abi.abi,
            eventName: 'Increment',
            logs: receipt.logs,
        });

        console.log(logs)

        
        // Lecture de la nouvelle valeur
        const count = await publicClient.readContract({
            address: contractAddress,
            abi: abi.abi,
            functionName: 'getCount',
        });

        console.log(`Nouvelle valeur du compteur : ${count}`);

        const x = await publicClient.readContract({
            address: contractAddress,
            abi: abi.abi,
            functionName: 'x',
        });

         console.log(`normalement : ${count} == ${x}`);

    } catch (error) {
        console.error("Erreur lors de l'interaction :", error);
    }
}

main();