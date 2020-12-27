import { setUncaughtExceptionCaptureCallback } from 'process'
import { useState } from 'react'
import { makeTree, MagicNode, WorldObject, Element, executeSpell } from '../util/tree'

export default function Home() {
  const [startingAddress, setStartingAddress] = useState<number[]| null>(null)
  const [tree, setTree] = useState<MagicNode>(makeTree())

	const wo: WorldObject = {
		element: Element.Water,
		mass: 10,
    temperature: 100,
    velocity: [0, 0, 0]
  }

  const renderNode = (node: MagicNode, address: number[]) => {
    const doIt = () => {
      if (!startingAddress) {
        console.log('setting starting address')
        console.log({ address })
        setStartingAddress(address)
      } else {
        console.log(startingAddress)
        if (startingAddress.length > address.length) {
          console.log({ original: wo })
          console.log({ spellLength: startingAddress.length - address.length})
          console.log({ result: executeSpell(node, startingAddress.length - address.length, wo) })
        }
        setStartingAddress(null)
      }
    }

    const backgroundColor = startingAddress === address
      ? 'blue'
      : 'none'

    return(
      <div
        key={address.join('')}
        style={{
          borderTop: '1px solid black',
          display: 'inline-block',
          margin: 1,
          overflowX: 'scroll',
          whiteSpace: 'nowrap',
        }}
      >
        <div onClick={doIt} style={{ backgroundColor, cursor: 'pointer', textAlign: 'center', fontSize: 10 }}>
          <p>{node.element}</p>
          <p style={{fontSize: 8}}>| {address.slice(Math.max(address.length - 5, 0)).join('-')} |</p>
        </div>
        {node.children.map((n, i) => renderNode(n, [...address, i]))}
      </div>
    )
  }

  console.log({ startingAddress })

  return (
    <div>
      <div>
        {renderNode(tree, [0])}
      </div>
    </div>
  )
}
