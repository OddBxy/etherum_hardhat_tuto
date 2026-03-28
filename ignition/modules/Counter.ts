import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

//Script pour deployer un contrat sur la chaine

export default buildModule("CounterModule", (m) => {
  const counter = m.contract("Counter");

  m.call(counter, "incBy", [5n]);

  return { counter };
});