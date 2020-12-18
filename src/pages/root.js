import styled from "styled-components"
import {Suspense} from "react"
import {atomFamily, selectorFamily, useRecoilState} from "recoil"

const fetchChain = chain => {
  // prettier-ignore
  return fetch(`https://util.${chain}.flow-view-source.com/history`)
        .then(d => d.json())
}

var $chain = atomFamily({
  key: "history",
  default: selectorFamily({
    key: "history::default",
    // get: _ => async () => Array.from({length: 30}, d => ({success: true})),
    get: chain => async => fetchChain(chain),
  }),
})

const Box = styled.div`
  display: block;
  width: 13px;
  height: 13px;
  background: ${p => (p.success ? "green" : "tomato")};
  margin-right: 1px;
  border-radius: 3px;
`

const Boxes = styled.div`
  display: flex;
  align-items: center;
  font-family: MonoLisa, "JetBrains Mono", "Fira Code", monospace;
  width: 488px;
`

const Label = styled.div`
  font-size: 13px;
  line-height: 21px;
  margin-right: 8px;
  width: 60px;
  font-weight: bold;
  text-align: right;
`

const T = styled.div`
  font-size: 8px;
`
const L = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
  margin: 3px;
`

const Chain = ({chain}) => {
  var [history, setHistory] = useRecoilState($chain(chain))
  console.log(chain, history)
  return (
    <Boxes>
      <Label>{chain}:</Label>
      {history.map((d, i) => (
        <Box id={i} success={d.success} />
      ))}
    </Boxes>
  )
}

const Page = () => {
  return (
    <div>
      <Boxes>
        <Label>Flow</Label>
        <T>Now</T>
        <L />
        <T>[ Last 30 Minutes ]</T>
        <L />
        <T>Past</T>
      </Boxes>
      <Chain chain="mainnet" />
      <Chain chain="testnet" />
    </div>
  )
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  )
}
