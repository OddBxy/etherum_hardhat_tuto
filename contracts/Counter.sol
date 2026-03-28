// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Counter {
  uint public x;

    //event sert à faire des logs sur la blockchain
    //des qu'un tx appel une fonction qui trigger event, le client peut récupérer l'event
  event Increment(uint by);

  function inc() public {
    x += 1;
    emit Increment(1);
  }

  function incBy(uint by) public {
    require(by > 0, "incBy: increment should be positive");
    x += by;
    emit Increment(by);
  }

  function getCount() public view returns (uint) {
    return x;
  }
}
