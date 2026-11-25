

export default function SizeGuideRow({ size }) {
  return <><strong>{size}</strong><span>{(13.5 + Number(size) * 0.16).toFixed(1)} mm</span></>
}
