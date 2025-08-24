import type { Problem } from '../../api/apiType'
import { convertLevelToDifficulty } from '../../util/convertLevelToDifficulty'
import QuestionCard from '../common/QuestionCard'

const QuestionList = ({ problems }: { problems: Problem[] }) => {
  const getDifficultyCounts = () => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    problems.forEach((problem) => {
      counts[problem.level as keyof typeof counts]++
    })
    return counts
  }

  const difficultyLabels = ['하', '중하', '중', '상', '최상']
  const difficultyCounts = getDifficultyCounts()
  const hasProblems = problems.length > 0

  const renderEmptyList = () => (
    <div className="flex h-full items-center justify-center">
      <div className="mt-[-54px] text-center text-[14px] font-[400] leading-[21px] tracking-[-0.2%] text-textColor-white">
        <p>
          학습지 문제 수가 없습니다.
          <br />
          다음 단계로 넘어가기 위해 문제를 추가해주세요.
        </p>
      </div>
    </div>
  )

  const renderProblemList = () => (
    <div className="space-y-[16px]">
      {problems.map((problem, index) => (
        <QuestionCard
          key={problem.id}
          number={index + 1}
          title={problem.title}
          questionCode={problem.id}
          imageUrl={problem.problemImageUrl}
          difficulty={convertLevelToDifficulty(problem.level)}
          percentage={problem.answerRate}
          type={problem.type === 1 ? '객관식' : '주관식'}
        />
      ))}
    </div>
  )

  const renderFooterContent = () => {
    if (!hasProblems) {
      return (
        <p className="text-[16px] font-[700] leading-[24px] tracking-[-1%] text-delete">
          문제 수 {problems.length} 개
        </p>
      )
    }

    return (
      <>
        <div className="mr-[10px] flex text-[14px] font-[400]">
          {difficultyLabels.map((label, index) => (
            <span key={label} className="text-[16px] font-[400]">
              {label}
              {difficultyCounts[(index + 1) as keyof typeof difficultyCounts]}개
              {index === difficultyLabels.length - 1 ? ' | ' : ' · '}
            </span>
          ))}
        </div>
        <p className="text-[16px] font-[700] leading-[24px] tracking-[-1%] text-textColor-white">
          문제 수 {problems.length} 개
        </p>
      </>
    )
  }

  return (
    <div className="relative w-[480px] rounded-[16px] bg-bgColor-primary desktop:w-[712px]">
      <div className="h-full max-h-[calc(100vh-64px)] overflow-y-auto px-[16px] py-[16px] pb-[60px] scrollbar-hide">
        <h1 className="mb-4 text-[16px] font-[700] text-textColor-white">학습지 상세 편집</h1>
        {hasProblems ? renderProblemList() : renderEmptyList()}
      </div>

      <div
        data-area="footer"
        className="absolute bottom-0 flex h-[64px] w-full items-center justify-center rounded-b-[12px] bg-bgColor-primary px-[24px]"
      >
        <div className="flex w-full items-center justify-end text-textColor-label">
          {renderFooterContent()}
        </div>
      </div>
    </div>
  )
}

export default QuestionList
