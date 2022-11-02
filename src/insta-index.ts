import { LogAccountCreated } from "../generated/InstaIndex/InstaIndex"
import { DSA, Owner, DSAOwner } from "../generated/schema"

export function handleLogAccountCreated(event: LogAccountCreated): void {
  let dsa = DSA.load(event.params.account)
  if (!dsa) {
    dsa = new DSA(event.params.account)
    dsa.address = event.params.account
    dsa.approvals = []
    dsa.save()
  }

  let owner = Owner.load(event.params.owner)
  if (!owner) {
    owner = new Owner(event.params.owner)
    owner.address = event.params.owner
    owner.save()
  }

  let dsaOwner = DSAOwner.load(owner.id.concat(dsa.id))
  if (!dsaOwner) {
    dsaOwner = new DSAOwner(owner.id.concat(dsa.id))
    dsaOwner.DSA = dsa.id
    dsaOwner.owner = owner.id
    dsaOwner.save()
  }
}
