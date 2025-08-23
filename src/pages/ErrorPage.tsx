import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="-mt-40 flex min-h-screen items-center justify-center bg-bgColor-secondary">
      <div className="text-center">
        <img src="/logo.png" alt="logo" className="mx-auto mb-10 flex w-[100px] justify-center" />
        <h1 className="mb-4 text-6xl font-bold text-textColor-label">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-textColor-title">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mb-8 text-textColor-label">
          죄송합니다. 요청하신 페이지가 존재하지 않습니다.
        </p>
        <Link
          to="/"
          className="inline-block rounded-lg bg-focus px-6 py-3 text-textColor-white transition-colors hover:bg-opacity-90"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
