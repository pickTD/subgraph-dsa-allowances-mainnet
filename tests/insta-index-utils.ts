import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  LogAccountCreated,
  LogNewAccount,
  LogNewCheck,
  LogNewMaster,
  LogUpdateMaster
} from "../generated/InstaIndex/InstaIndex"

export function createLogAccountCreatedEvent(
  sender: Address,
  owner: Address,
  account: Address,
  origin: Address
): LogAccountCreated {
  let logAccountCreatedEvent = changetype<LogAccountCreated>(newMockEvent())

  logAccountCreatedEvent.parameters = new Array()

  logAccountCreatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  logAccountCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  logAccountCreatedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  logAccountCreatedEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )

  return logAccountCreatedEvent
}

export function createLogNewAccountEvent(
  _newAccount: Address,
  _connectors: Address,
  _check: Address
): LogNewAccount {
  let logNewAccountEvent = changetype<LogNewAccount>(newMockEvent())

  logNewAccountEvent.parameters = new Array()

  logNewAccountEvent.parameters.push(
    new ethereum.EventParam(
      "_newAccount",
      ethereum.Value.fromAddress(_newAccount)
    )
  )
  logNewAccountEvent.parameters.push(
    new ethereum.EventParam(
      "_connectors",
      ethereum.Value.fromAddress(_connectors)
    )
  )
  logNewAccountEvent.parameters.push(
    new ethereum.EventParam("_check", ethereum.Value.fromAddress(_check))
  )

  return logNewAccountEvent
}

export function createLogNewCheckEvent(
  accountVersion: BigInt,
  check: Address
): LogNewCheck {
  let logNewCheckEvent = changetype<LogNewCheck>(newMockEvent())

  logNewCheckEvent.parameters = new Array()

  logNewCheckEvent.parameters.push(
    new ethereum.EventParam(
      "accountVersion",
      ethereum.Value.fromUnsignedBigInt(accountVersion)
    )
  )
  logNewCheckEvent.parameters.push(
    new ethereum.EventParam("check", ethereum.Value.fromAddress(check))
  )

  return logNewCheckEvent
}

export function createLogNewMasterEvent(master: Address): LogNewMaster {
  let logNewMasterEvent = changetype<LogNewMaster>(newMockEvent())

  logNewMasterEvent.parameters = new Array()

  logNewMasterEvent.parameters.push(
    new ethereum.EventParam("master", ethereum.Value.fromAddress(master))
  )

  return logNewMasterEvent
}

export function createLogUpdateMasterEvent(master: Address): LogUpdateMaster {
  let logUpdateMasterEvent = changetype<LogUpdateMaster>(newMockEvent())

  logUpdateMasterEvent.parameters = new Array()

  logUpdateMasterEvent.parameters.push(
    new ethereum.EventParam("master", ethereum.Value.fromAddress(master))
  )

  return logUpdateMasterEvent
}
