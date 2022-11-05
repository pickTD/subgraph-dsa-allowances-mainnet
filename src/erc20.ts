import { Approval } from "../generated/ERC20/ERC20"
import { ApprovalEvent, Spender } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let spender = Spender.load(event.params.spender)

  if (!spender) {
    spender = new Spender(event.params.spender)
    spender.address = event.params.spender
    spender.isDSA = false
    spender.owners = []
    spender.approvals = []
  }

  const approvalEvent = new ApprovalEvent(event.transaction.hash.toHex() + "-" + event.logIndex.toString())

  approvalEvent.token = event.address
  approvalEvent.owner = event.params.owner
  approvalEvent.spender = event.params.spender
  approvalEvent.value = event.params.value

  approvalEvent.save()

  spender.approvals = spender.approvals.concat([approvalEvent.id])
  if (!spender.owners.includes(event.params.owner)) {
    spender.owners = spender.owners.concat([event.params.owner])
  }

  spender.save()
}
