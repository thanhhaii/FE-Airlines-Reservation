import { ReactNode } from "react"

export interface ButtonLoaderProps{
  loading: boolean
  children: ReactNode
  className: string
}

export default function ButtonLoader(props: ButtonLoaderProps) {
  const { loading, className, children } = props

  return (
    <button className={className} type="submit">
      {loading ? (
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
