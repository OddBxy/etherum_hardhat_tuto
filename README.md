# tuto
https://hardhat.org/docs/tutorial/setup



# qu'est ce que c'est ?

/contracts/
*.sol ceux sont les contrats qu'on veut pousser sur la chaine
*.t.sol ceux sont les tests unitaire des contrats

/test/
*ts ceux sont des tests un peu plus complexe qui permettent de tester l'interaction avec le contrat sur une chaine locale
(la chaine locale est créée au runtime et détruite après, donc rien à gérer trkl)

/scripts/
ceux sont les scripts pour interargir avec les contrats sur la chaines
y'a tout qui est hardcoder dedans, mais faudra utiliser des variables d'environnement dans le projet

/ignition/
    /modules/
    *.ts ceux sont les scripts pour publier les contrats sur la chaine
    /deployments/
    on s'en fiche, peut être le mettre dans le .gitignore


# Comment qu'on fait ?

## compilation
1. npx hardhat clean
2. npx hardhat compile ou build 

pour compiler les smart contract, permet de génerer des artifacts (instruction à rendre publique pour que les gens savent comment ces contrats fonctionnent)

## test
- npx hardhat test : fait tout les tests
- npx hardhat test solidity : fait seulement les tests unitaire solidity (/contracts/*.t.sol)
- npx hardhat test nodejs : fait les autres tests



## utilisation

1. npx hardhat node : créer une chaine locale des faux compte avec faux eth
(faut regarder une adresse d'un compte renvoyé pour modifier le script d'interaction si besoin)
2.  npx hardhat ignition deploy ignition/modules/Counter.ts --network localhost : publie le contrat du script sur la chaine locale
(faut regarder l'adresse du contract renvoyée pour modifier le script d'interaction si besoin)
3. npx hardhat run scripts/interact.ts --network localhost : execute le script d'interaction avec le contrat sur la chaine locale