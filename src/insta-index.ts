import { LogAccountCreated } from "../generated/InstaIndex/InstaIndex"
import { Spender } from "../generated/schema"

export function handleLogAccountCreated(event: LogAccountCreated): void {
  let dsa = Spender.load(event.params.account)

  if (!dsa) {
    dsa = new Spender(event.params.account)
    dsa.address = event.params.account
    dsa.owners = []
    dsa.approvals = []
  }

  dsa.creator = event.params.owner
  dsa.isDSA = true
  dsa.save()
}
