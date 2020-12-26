import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import { makeTree, MagicNode } from '../util/tree'

export default function Home() {
  const tree = makeTree()

  const renderNode = (node: MagicNode, address: number[]) => {
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
        <div style={{ textAlign: 'center', fontSize: 10 }}>
          <p>{node.element}</p>
          <p style={{fontSize: 8}}>| {address.slice(Math.max(address.length - 5, 0)).join('-')} |</p>
        </div>
        {node.children.map((n, i) => renderNode(n, [...address, i]))}
      </div>
    )
  }


  return (
    <div>
      <div>
        {renderNode(tree, [0])}
      </div>
    </div>
  )
}
