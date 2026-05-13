'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type LinkRow = {
  link?: { label?: string | null }
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<LinkRow>()
  const label = data?.data?.link?.label
  return <div>{label ? `${label}` : `Row ${(data.rowNumber ?? 0) + 1}`}</div>
}
