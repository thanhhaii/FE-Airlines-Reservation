/* eslint-disable jsx-a11y/anchor-is-valid */
export interface PaginationProps {
  totalPage: number[]
  currentPage: number
  goToPage: (vlue: number) => void
}

export default function Pagination(props: PaginationProps) {
  const { totalPage, currentPage, goToPage } = props

  if (totalPage.length === 0) {
    return <></>
  }

  return (
    <div>
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              aria-disabled="true"
              onClick={() => goToPage(currentPage - 1)}>
              Prev
            </a>
          </li>
          {totalPage.map((page, i) => {
            return (
              <li
                className={`page-item ${page === currentPage ? "active" : " "}`}
                key={i}>
                <a
                  className="page-link"
                  href="#"
                  onClick={() => goToPage(page)}>
                  {page}
                </a>
              </li>
            )
          })}
          <li className="page-item">
            <a
              className={`page-link ${
                currentPage === totalPage[totalPage.length - 1]
                  ? "disabled"
                  : ""
              }`}
              href="#"
              onClick={() => goToPage(currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
