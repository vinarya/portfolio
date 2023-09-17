import Link from '@/components/Link'

export default function Pagination({ totalPages, currentPage, onPrevious, onNext }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="grid grid-cols-3 items-center">
        <div>
          {!prevPage && (
            <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
              Previous
            </button>
          )}
          {prevPage && (
            <button onClick={onPrevious} rel="previous">
              Previous
            </button>
          )}
        </div>
        <div className="text-center">
          {currentPage} of {totalPages}
        </div>
        <div className="text-right">
          {!nextPage && (
            <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
              Next
            </button>
          )}
          {nextPage && (
            <button onClick={onNext} rel="next">
              Next
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}
