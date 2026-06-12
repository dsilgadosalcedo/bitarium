export function JsonLd({
  schemas
}: {
  schemas: Array<Record<string, unknown>>
}) {
  return (
    <>
      {schemas.map((schema) => {
        const key =
          typeof schema["@type"] === "string"
            ? `${schema["@type"]}-${String(schema.name ?? schema.url ?? "")}`
            : JSON.stringify(schema)

        return (
          <script
            key={key}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        )
      })}
    </>
  )
}
