/** React 19 hoists <title> and <meta> into <head>. */
export function Seo({ title, description }: { title: string; description: string }) {
  return (
    <>
      <title>{`${title} | Simplex Metals`}</title>
      <meta name="description" content={description} />
    </>
  )
}
