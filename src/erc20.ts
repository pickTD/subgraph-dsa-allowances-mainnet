import { Bytes } from "@graphprotocol/graph-ts"
import { Approval } from "../generated/ERC20/ERC20"
import { Token, ApprovalEvent, Owner, DSA, DSAOwner } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let token = Token.load(event.address)
  if (!token) {
    token = new Token(event.address)
    token.address = event.address
    token.save()
  }

  let owner = Owner.load(event.params.owner)
  if (!owner) {
    owner = new Owner(event.params.owner)
    owner.address = event.params.owner
    owner.save()
  }

  let dsa = DSA.load(event.params.spender)
  if (!dsa) {
    dsa = new DSA(event.params.spender)
    dsa.address = event.params.spender
    dsa.approvals = []
    dsa.save()
  }

  let dsaOwner = DSAOwner.load(owner.id.concat(dsa.id))
  if (!dsaOwner) {
    dsaOwner = new DSAOwner(owner.id.concat(dsa.id))
    dsaOwner.DSA = dsa.id
    dsaOwner.owner = owner.id
    dsaOwner.save()
  }

  let approvalEvent = ApprovalEvent.load(event.transaction.hash.concat(new Bytes(event.logIndex.toI32())))
  if (!approvalEvent) {
    approvalEvent = new ApprovalEvent(event.transaction.hash.concat(new Bytes(event.logIndex.toI32())))
    approvalEvent.token = token.id
    approvalEvent.owner = owner.id
    approvalEvent.spender = dsa.id
    approvalEvent.value = event.params.value
    approvalEvent.save()
  }

  dsa.approvals.push(approvalEvent.id)
  dsa.save()
}
